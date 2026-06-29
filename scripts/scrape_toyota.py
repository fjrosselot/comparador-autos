#!/usr/bin/env python3
"""
Toyota Chile price scraper.

Extracts per-version prices with bonus breakdown:
  precio_lista        = price without any bonuses
  precio_contado      = lista - bono_marca (cash, unconditional discount only)
  precio_financiamiento = listed site price (includes bono_marca + bono_MAF, requires MAF financing)

Output: SQL UPDATE statements for autos.modelos table, matched by precio_lista.
"""
import re
import json
import sys
from scrapling.fetchers import DynamicFetcher

# Model name → detail page URL (confirmed working)
MODEL_URLS = {
    "RAV4":         "https://www.toyota.cl/modelos/suv/all-new-rav4/",
    "Fortuner":     "https://www.toyota.cl/modelos/suv/fortuner/",
    "Yaris Cross":  "https://www.toyota.cl/modelos/suv/yaris-cross/",
    "Corolla Cross": "https://www.toyota.cl/modelos/suv/new-corolla-cross/",
    "BZ4X":         "https://www.toyota.cl/modelos/suv/auto-electrico-toyota-bz4x/",
}

# Fallback URLs to try if primary 404s
FALLBACK_URLS = {
    "Yaris Cross":  [
        "https://www.toyota.cl/modelos/suv/all-new-yaris-cross/",
        "https://www.toyota.cl/modelos/hibridos/yaris-cross/",
    ],
    "Corolla Cross": [
        "https://www.toyota.cl/modelos/hibridos/new-corolla-cross-hibrido/",
        "https://www.toyota.cl/modelos/suv/corolla-cross/",
    ],
}

# Current DB data (fetched 2026-06-26) — for matching and SQL generation
DB_ROWS = {
    "RAV4": [
        {"id": "335e09af-4e55-42aa-a32f-3ffc4893c962", "version": "2.0L XLE Aut",     "precio_lista": 30390000},
        {"id": "58dcc9dd-6a56-4b0c-ae0e-52cbf9e4967a", "version": "2.0 LE CVT",       "precio_lista": 28990000},
        {"id": "d870386c-cd79-445e-8d5f-828d1c920bf4", "version": "2.0 LE AWD CVT",   "precio_lista": 29990000},
        {"id": "e8c8a153-0182-489e-b534-95e8715edc82", "version": "2.0 XLE CVT",      "precio_lista": 32490000},
    ],
    "Fortuner": [
        {"id": "86518043-1504-4ce7-bf92-c507448595ed", "version": "2.8L SR5 TDi 4x4 Aut", "precio_lista": 44390000},
        {"id": "444b177b-63b7-4338-bce9-0b4a8c57d369", "version": "2.8L SR5 TDi 4x4",     "precio_lista": 42890000},
        {"id": "e14b864d-c6bc-4bd6-9c3c-767ea3736a48", "version": "2.8L SRX TDi 4x4 Aut", "precio_lista": 50890000},
    ],
    "Yaris Cross": [
        {"id": "37c02a4c-2056-482d-9a82-5357b5a2f2ce", "version": "XI 1.5L",     "precio_lista": 19790000},
        {"id": "2808c08c-a834-4258-9b66-b2787e108ca1", "version": "XI 1.5L CVT", "precio_lista": 20790000},
        {"id": "ba18f765-ff3a-4a97-b465-be7e9f658bc4", "version": "XG 1.5L CVT", "precio_lista": 22790000},
    ],
    "Corolla Cross": [
        {"id": "8c874ee8-5f00-44ea-b75e-858de148ce7d", "version": "GR-S", "precio_lista": 26490000},
    ],
    "BZ4X": [
        {"id": "e8c3f9ba-406b-4fe0-999c-3f81063a075e", "version": "Limited 4x2", "precio_lista": 44990000},
        {"id": "4b154040-5b32-4978-af18-f2b696516164", "version": "Limited AWD",  "precio_lista": 49990000},
    ],
}


def parse_clp(s):
    return int(re.sub(r"[^\d]", "", s))


def scrape_model_page(url):
    fetcher = DynamicFetcher(headless=True)
    page = fetcher.fetch(url)
    text = page.get_all_text(ignore_tags=("script", "style"))

    if not text or len(text) < 200:
        return None, text

    results = []

    pattern = re.compile(
        r"([A-Z][^\n]{5,80})\n\n\$([\d\.]+)\(\*\)[^\n]*\nNuestro precio incluye:(.*?)"
        r"(?=[A-Z][^\n]{5,80}\n\n\$|\* Precio aplica|\Z)",
        re.DOTALL,
    )

    for m in pattern.finditer(text):
        version_name = m.group(1).strip()
        precio_fin = parse_clp(m.group(2))
        bonos_text = m.group(3)

        bono_marca = 0
        bm = re.search(r"Bono\s+marca\s+de\s+\$([\d\.]+)", bonos_text)
        if bm:
            bono_marca = parse_clp(bm.group(1))

        bono_maf = 0
        bmaf = re.search(r"Bono\s+financiamiento\s+MAF\s+de\s+\$([\d\.]+)", bonos_text)
        if bmaf:
            bono_maf = parse_clp(bmaf.group(1))

        results.append(
            {
                "version_sitio": version_name,
                "precio_lista": precio_fin + bono_marca + bono_maf,
                "precio_contado": precio_fin + bono_maf,  # cash: only bono_marca applied
                "precio_financiamiento": precio_fin,       # MAF: all bonuses applied
                "bono_marca": bono_marca,
                "bono_maf": bono_maf,
            }
        )

    return results, text


def match_and_generate_sql(model_name, scraped_versions, db_rows):
    sql_lines = []
    unmatched_scrape = []
    unmatched_db = list(db_rows)

    for sv in scraped_versions:
        matched = None
        for row in unmatched_db:
            if row["precio_lista"] == sv["precio_lista"]:
                matched = row
                break

        if matched:
            unmatched_db.remove(matched)
            sql_lines.append(
                f"-- {model_name} | {matched['version']} → {sv['version_sitio']}\n"
                f"UPDATE autos.modelos SET\n"
                f"  precio_contado         = {sv['precio_contado']},\n"
                f"  precio_financiamiento  = {sv['precio_financiamiento']},\n"
                f"  url_fuente             = '{MODEL_URLS.get(model_name, '')}',\n"
                f"  scrapeado_at           = now()\n"
                f"WHERE id = '{matched['id']}';\n"
            )
        else:
            unmatched_scrape.append(sv)

    return sql_lines, unmatched_scrape, unmatched_db


def main():
    all_sql = []
    print("=" * 60)

    for model_name, primary_url in MODEL_URLS.items():
        print(f"\n>>> {model_name}")
        urls_to_try = [primary_url] + FALLBACK_URLS.get(model_name, [])
        scraped = None

        for url in urls_to_try:
            print(f"    Fetching {url} ...", end=" ", flush=True)
            try:
                scraped, raw_text = scrape_model_page(url)
                if scraped:
                    print(f"OK ({len(scraped)} versions)")
                    break
                else:
                    print("empty/no versions")
            except Exception as e:
                print(f"ERROR: {e}")

        if not scraped:
            print(f"    [SKIP] no data for {model_name}")
            continue

        for v in scraped:
            fmt = (
                f"    {v['version_sitio'][:50]:<50} "
                f"lista={v['precio_lista']:>11,}  "
                f"contado={v['precio_contado']:>11,}  "
                f"fin={v['precio_financiamiento']:>11,}  "
                f"(bono_marca={v['bono_marca']:,}  bono_maf={v['bono_maf']:,})"
            )
            print(fmt)

        db_rows = DB_ROWS.get(model_name, [])
        sql_lines, unmatched_scrape, unmatched_db = match_and_generate_sql(
            model_name, scraped, db_rows
        )

        all_sql.extend(sql_lines)

        if unmatched_scrape:
            print(f"    [NO DB MATCH] scraped versions:")
            for v in unmatched_scrape:
                print(f"      {v['version_sitio']} lista={v['precio_lista']:,}")

        if unmatched_db:
            print(f"    [NO SITE MATCH] DB rows:")
            for r in unmatched_db:
                print(f"      {r['version']} lista={r['precio_lista']:,}")

    print("\n\n" + "=" * 60)
    print("-- SQL UPDATE statements (run in Supabase SQL editor)")
    print("=" * 60 + "\n")
    for line in all_sql:
        print(line)

    # Also write to file
    sql_path = "/tmp/toyota_price_update.sql"
    with open(sql_path, "w") as f:
        f.write("-- Toyota price update — generated by scrape_toyota.py\n")
        f.write("-- Run in Supabase SQL editor (needs schema autos access)\n\n")
        for line in all_sql:
            f.write(line + "\n")
    print(f"SQL written to {sql_path}")


if __name__ == "__main__":
    main()
