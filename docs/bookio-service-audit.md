# Bookio service audit — LINA ESTETIKA

- **Source:** https://services.bookio.com/linaestetika/widget?lang=sk (public reservation widget)
- **Date checked:** 2026-11-24
- **Method:** widget opened in a real (JS-rendering) browser; each of the 7 public categories was opened and its service list read from the rendered page. No login, no private endpoints, no reservation submitted, no customer data collected.
- **Currency:** EUR for all services.
- **Public booking URL:** the widget URL above for every service. Selecting a category or service does **not** change the URL, and Bookio exposes no documented service-specific links, so none were constructed.

## Verified services (23)

| # | Exact Bookio service name | Bookio category | Price | Qualifier | Duration | Status |
|---|---|---|---|---|---|---|
| 1 | Biorevitalizácia očného okolia (20min.) | Bioremodelácia tváre | 160 € | **od** | 20 min | verified |
| 2 | Hĺbková biorevitálizácia celej tváre 2,5ml (30min.) | Bioremodelácia tváre | 180 € | — | 30 min | verified |
| 3 | Botulotoxín 1 oblasť (10min.) | Botulotoxín | 90 € | — | 10 min | verified |
| 4 | Botulotoxín 2 oblasti (20min.) | Botulotoxín | 150 € | — | 20 min | verified |
| 5 | Botulotoxín 3 oblasti (20min.) | Botulotoxín | 200 € | — | 20 min | verified |
| 6 | Botulotoxín malé oblasti (10min.) | Botulotoxín | 45 € | — | 10 min | verified |
| 7 | Botulotoxín ošetrenie brady (10min.) | Botulotoxín | 160 € | — | 10 min | verified |
| 8 | Ošetrenie nadmerného potenia (30min.) | Botulotoxín | 280 € | — | 30 min | verified |
| 9 | Hydratácia pier a ústeho okolia bez zväčšenia objemu pier (20min.) | Modelácia tváre kyselinou hyalurónovou | 130 € | — | 20 min | verified |
| 10 | Modelácia brady kyselinou hyalurónovou (20min.) | Modelácia tváre kyselinou hyalurónovou | 140 € | — | 20 min | verified |
| 11 | Modelácia líc kyselinou hyalurónovou (30min.) | Modelácia tváre kyselinou hyalurónovou | 189 € | — | 30 min | verified |
| 12 | Modelácia očného okolia kyselinou hyalurónovou (20min.) | Modelácia tváre kyselinou hyalurónovou | 220 € | — | 20 min | verified |
| 13 | Rozpustenie kyseliny hyalurónovej (20min.) | Modelácia tváre kyselinou hyalurónovou | 65 € | — | 20 min | verified |
| 14 | Výplň nazolabiálnych vrások kyselinou hyalurónovou (20min.) | Modelácia tváre kyselinou hyalurónovou | 170 € | **od** | 20 min | verified — see D1 |
| 15 | Výplň nazolabiálnych vrások kyselinou hyalurónovou (20min.) | Modelácia tváre kyselinou hyalurónovou | 160 € | — | 20 min | verified — see D1 |
| 16 | Modelácia pier kyselinou hyalurónovou 0,5ml (30min.) | Pery | 89 € | — | 30 min | verified |
| 17 | Modelácia pier kyselinou hyalurónovou 1 ml (30min.) | Pery | 150 € | — | 30 min | verified |
| 18 | Polynukleotidy - celá tvár 2ml (30min.) | Polynukleotidy (lososie spermie) | 180 € | — | 30 min | verified |
| 19 | Polynukleotidy - očné okolie (20min.) | Polynukleotidy (lososie spermie) | 180 € | — | 20 min | verified |
| 20 | Profhilo - ošetrenie rúk (30min.) | Profhilo - Bioremodelácia | 190 € | — | 30 min | verified |
| 21 | Profhilo 2 ml (20min.) | Profhilo - Bioremodelácia | 220 € | — | 20 min | verified |
| 22 | Profhilo Structura 2ml (20min.) | Profhilo - Bioremodelácia | 280 € | — | 20 min | verified |
| 23 | Sculptra (1h) | Sculptra - nechirurgický lifting | 550 € | — | 60 min | verified |

Worker shown in Bookio: "LINA ESTETIKA" (single resource). The widget header also publishes the phone number **0952 782 425**.

## Discrepancies and open questions

| ID | Issue | How the website handles it |
|---|---|---|
| D1 | "Výplň nazolabiálnych vrások kyselinou hyalurónovou" appears **twice** with different prices (od 170 € and 160 €). | Both shown exactly as listed, with a note to confirm. **Client must confirm which is current.** |
| D2 | Spelling in Bookio: "ústeho" (→ ústneho), "biorevitálizácia" (→ biorevitalizácia), "lososie spermie". | Website uses corrected spelling for display; exact Bookio names are kept in `src/data/services.ts` (`bookioName`). Client may want to fix them in Bookio. |
| D3 | **Profhilo BODY** (paže, okolie pupka, nad kolenami) from the brief is **not in Bookio**. Only "Profhilo - ošetrenie rúk" exists. | Not published as a service. "Ošetrenie rúk" is shown under its Bookio name. Client should confirm whether "ruky" means hands or arms. |
| D4 | **Sculptra Glow Protocol / Sculptra Lifting Protocol** are not in Bookio — only "Sculptra (1h)". | One Sculptra page, no protocol names. |
| D5 | **Bruxizmus** is not a Bookio service. | Not published. Can be added once it exists in Bookio. |
| D6 | **Nadmerné potenie** — Bookio has one service without area. Areas (podpazušie, dlane, chodidlá) come from the client brief only. | Areas shown as "podľa konzultácie", labelled as areas the clinic treats per client info. Client to confirm. |
| D7 | **Krk a dekolt** — no Bookio service names this area. | No neck/décolletage price or service is published. Only the LINA Signature pathway (editorial, no price) remains, pointing to booking/consultation. |
| D8 | **Kyselina hyalurónová a aminokyseliny** (brief) is not a Bookio name. The closest category is "Bioremodelácia tváre" (biorevitalizácia). | Published under Bookio names only. Client to confirm what product is used for biorevitalizácia. |
| D9 | Bookio offers **HA fillers** (pery, líca, brada, očné okolie, nazolabiálne vrásky, rozpustenie HA), which the original brief did not mention. | Published, since Bookio is the source of truth. |
| D10 | Bookio lists **no consultation service**. | The website does not offer a separately bookable consultation. |
| D11 | Botulotoxín "1 / 2 / 3 oblasti" and "malé oblasti" do not name specific facial zones. | Specific zones are not assigned. Only "brada" is a named area. |

## Reviews

No public Bookio review profile was found (`https://services.bookio.com/linaestetika` returns 404; the widget shows no reviews). **No reviews are published on the website.** Needed from client: a link to a public Bookio/Google review page or an official review widget.

## Embedding

The widget loads inside an `<iframe>` (it isn't blocked by frame headers), but it brings its own scrollbar and cookie banner, and the full booking flow could not be tested without making a real reservation. **Decision:** every "Rezervovať termín" button opens the official widget in a new tab.

## Needed from the client

1. Confirmation of D1 (the duplicate nazolabial price).
2. Whether Profhilo BODY, Sculptra protocols, bruxism and neck/décolletage treatments should be added to Bookio (D3–D7).
3. Which areas count as "1 oblasť" / "malé oblasti" for botulinum toxin, if they want them explained on the site.
4. Public review source (Bookio or Google).
5. Confirmation that the phone 0952 782 425 may be published on the website.
