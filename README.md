# Voltline — setup and tracking

*Voltline — as-built survey of the LV network, with an editable map of poles and lines.*

> **Build 2026-11-01-k · cache `voltline-v1`.** Teal + copper identity, Hanken Grotesk type,
> map-first capture (satellite by default), GPS-only coordinates with drag-to-correct,
> and the full customer roster embedded for offline use.

Two pages, one folder:

- **index.html** — the field app, installed on the 8 surveyor phones.
- **tracker.html** — the supervisor console, opened on your computer.

---

## 1. Put the folder online (once, about five minutes)

The app has to be served from a web address so it can install on the phones
and then run with no network.

**GitHub Pages**

1. Create a free account on `github.com`.
2. Top right, **+**, then **New repository**. Name it `voltline`,
   tick **Public**, then **Create repository**.
3. On the empty repository page click **uploading an existing file**.
   Drag in the unzipped files, all of them, including the hidden `.nojekyll`.
   Then **Commit changes**.
4. **Settings** tab, **Pages** in the left menu. Under Build and deployment set
   Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**, Save.
5. Wait a minute and refresh. The address appears at the top of that page:
   `https://YOURNAME.github.io/voltline/`

The field app is that address. The tracker is the same address followed by
`tracker.html`.

The repository has to be Public for free Pages. Only the app is published
there, never any survey data, which stays on the phones and on your computer.

**Updating later.** Phones keep the app in a cache. After replacing any file,
open `sw.js` and change the first line, for example `v4` to `v5`. Without that
the phones keep running the old version.

---

## 2. Install on the 8 phones

On each phone, with network:

1. Open the link in **Chrome**.
2. Menu, then **Install app** (or "Add to Home screen").
3. The Voltline icon appears on the home screen.
4. Open it once with network, after that it works **offline**.
5. Allow **location** when Chrome asks.

On iPhone: Safari, Share button, "Add to Home Screen".

On first launch the surveyor picks a code **SURV-01 to SURV-08** and types
their name. Asked once only. Give a different code to each of your eight
surveyors, that is what makes the tracking work.

---

## 3. A surveyor's day

1. Fill in the transformer zone at the top of the **Capture** tab.
2. Record the **poles** in order, from the transformer towards the end.
3. Record the **spans** between poles, the length is computed automatically.
4. Record the **customers**, picking the pole from the drop down list.
5. Open **Checks** and fix everything shown in red.
6. Open **Send**, tap "Create my send file", share it by WhatsApp or e-mail.

Records stay on the phone until someone taps Erase. Surveyors erase only
after you confirm you have their file.

---

## 4. Your tracking

Open **tracker.html** on the computer and drop the files you received into it.

- **Team tracking** — who has sent, how many points, date of the last record,
  who is behind, number of issues per surveyor.
- **Transformer summary** — the quantity take-off, all surveyors combined.
- **Issues** — including conflicts between surveyors, such as the same pole
  number captured twice, a duplicated meter, or two poles recorded less than
  3 m apart.
- **Merge and export** — one CSV per sheet, whole team combined, same headers
  as your Excel workbook plus an Agent column.

Nothing goes to the internet. Everything stays on the phones and on your
computer.

---

## Numbering

Numbers are prefixed with the surveyor code, for example `P01001` for SURV-01
and `P02001` for SURV-02, so two surveyors cannot create the same pole number.
If your drawings need one continuous series instead, say so and I will switch
to fixed ranges per surveyor.

## Coordinates

GPS is converted automatically into the REG grid: Transverse Mercator, central
meridian 30 degrees, scale factor 0.9999, false easting 500 000, false northing
5 000 000. The X and Y columns come out ready to use.

---

## Utility Network alignment

REG collects in ArcGIS Field Maps against the Utility Network model, with the
layers Structure Junction, Electric Line, Electric Device and Electric Junction.
Every record in this app now also carries the Field Maps attributes, shown in
the **Utility Network** card under the main form:

| App record | Field Maps layer | Asset group |
|---|---|---|
| Pole | Structure Junction | LV Pole |
| Span, derived from the poles | Electric Line | Low Voltage Overhead Conductor |
| Transformer | Electric Device | Distribution Transformer |
| Customer | Electric Junction | to be confirmed with REG GIS |

Grey boxes fill themselves:

- **Height** from `Height_m`
- **Mechanical Strength (dAN)** from `Wooden_Pol`, so S140 becomes 140
- **Conductor size(mm2)**, **Phases** and **Rated Current (A)** from `Conductor`,
  the current coming from REG table 10
- **Service Pole** turns to Yes as soon as a customer is attached to that pole
- **Supported subnetwork name** and **Subnetwork controller name** from `TRF_Name`

The Send tab produces a CSV per Field Maps layer alongside the workbook CSVs.

---

## Administrative location and time

District, Sector, Cell and Village are typed once per transformer zone, at the
top of the Capture tab, and are then stamped onto every pole, span, customer and
transformer without any extra typing. On the Customer form the four fields are
also shown and can be edited, because a village boundary sometimes runs through
a transformer zone.

Every record also carries the exact moment it was taken. It appears on each card
in the List tab and comes out as two separate columns, `Date` and `Time`, in
every export. Times are the phone's local time, not UTC, so they match what the
surveyor saw on screen.

The tracker adds a Villages column per surveyor and shows the date and time of
each surveyor's last recorded point, which makes an idle phone obvious.

---

## Spans are no longer recorded, they are derived

There is no separate span record. On the pole form the surveyor picks
**From_Pole**, the pole the conductor was strung from, and the **Conductor**.
The box defaults to the pole just recorded, so walking a line in order means
one tap per pole. The span, its length and its geometry then come from the two
sets of coordinates.

At a tee-off the surveyor picks the parent pole instead of accepting the
default, which is what keeps branches correct.

The LV Lines sheet and the Electric Line layer are still exported, built from
that chain, with the from and to coordinates included.

---

## On-site helpers for the surveyor

**Repeat mode.** A tick box at the top of the attribute form keeps the values
that usually stay the same from one point to the next: for a pole that is
Structure, Height, class, Assembly, Conductor and TRF_Name; for a customer it
is cable, customer type, meter type and the four location fields. A line above
the form shows what was carried over, so the surveyor only changes what differs.
Untick it to start clean.

**Mini-map.** A small offline map on the Capture tab shows every point already
taken, the pole chain as a blue line, the current GPS position as a yellow dot,
and a scale bar. No network or tiles needed, it is drawn from the coordinates,
so it works in weak-signal areas. It answers the two field questions at a
glance: have I already done this pole, and am I still on the line.

**Progress line.** Under the header: poles, spans, customers and metres walked,
updated on every save, with a tick confirming each record is stored on the phone.

---

## Customer location

The surveyor now stands at the customer meter and records the point there, so
the customer's own GPS position is captured, not just the pole's.

- Leave **Horizontal distance** blank and the app measures it from the supply
  pole to where you stand, straight from GPS. Type a tape figure only when you
  want to override it.
- **Distance source** shows whether the length came from GPS or a tape.
- The export now has clearly named columns: **Pole_X / Pole_Y** for the supply
  pole and **House_X / House_Y** for the customer, instead of two unlabelled
  X/Y pairs.
- On the mini-map each customer is joined to its pole by a thin line, so the
  service drops are visible and a wrong pole link stands out.

---

## Full workbook alignment

The three sheets now carry every column of your workbook, in the same order.

**Customer**: POLES, X, Y (the supply pole), HSE No., Horizontal distance, REAL
LENGTH OF SERVICE CABLE, FIRST NAME, Second Name, TYPE OF CUSTOMMER, X, Y (the
house), READYBOARD, Meter_number, ID, UPI, Phone_number, Meter Type, then
Service_Cable and Distance source, then the location and audit columns.

**Pole**: TRF_Name, Structure, Height_m, Pole_Numbe, X, Y, Wooden_Pol,
STAY_ASSEM, Flaying_st, Earthing, Assembly, plus From_Pole, Conductor and the
computed span length, then location and audit columns. Substation, Feeder_Nam
and Earth_Ohm were removed at your request.

**Transformer surveying summary** now matches your sheet line for line:
Length of cable with each service cable size and Total Service Cable, the LV
line conductors labelled like "3x35+54.6mm2 - 35 mm2 3phase ABC" with Total
Length of LV Lines, poles by class, Infrastructures by customer type with TOTAL
Customers, all nine Assemblies, then Earthing, overhead stay, Stay, single
Phase, Three Phase and ReadyBord.

The summary is now visible on the phone in a new **Summary** tab, and on the
tracker it can be downloaded as a CSV with the **Download this summary as CSV**
button.

---

## Data safety fix

Earlier builds could lose points on some phones: once photos filled the small
localStorage space, a save would fail silently and the file appeared saved when
it was not. This is fixed.

- Records are now stored in **IndexedDB**, which is large enough for photos, with
  localStorage kept only as a fast mirror.
- **Every save is verified.** If the write did not land, a red banner appears and
  the save bar shows "NOT saved - send your file now", instead of losing work
  quietly. The points stay in memory so they can be exported straight away.
- Restore never overwrites good data with an empty list.

If a surveyor ever sees the red banner, they open the Send tab, create the file,
and send it immediately; then free some phone storage or reinstall the app.

---

## Simplified field build (v10)

The app is now focused on fast, complete field capture, not compliance.

- **REG compliance checks removed.** No more red warnings on the standard. The
  app captures and computes; it does not judge.
- **Distances tab** replaces Checks. It shows kilometres walked along the line,
  LV line length by conductor, and service cable by size, all from GPS. The tab
  badge shows km walked, and the header line shows it too.
- **No empty cells on export.** Every column a formula can fill is resolved at
  save time: span length, service cable real length, X and Y, District to
  Village, date and time. The file opens in Excel ready to use; only identity
  fields like meter number and ID are left for the office.
- **Excel-clean CSV.** Each file starts with a BOM and a "sep=," line, so Excel
  splits the columns correctly on any computer, French locale included.
- **Offline.** Once opened once with network, the app runs with no internet.
  Records are stored in IndexedDB on the phone. Only creating the send file and
  updating the app need a connection.

---

## Filling several point types without losing work (v2)

The Capture screen is a workspace for one point at a time. Each point becomes
permanent only when you press **Save point**; saved points live in the **List**
tab, not in the form.

Two changes make this safe:

- **Drafts are kept per type.** If you fill the Pole form, then tap Customer,
  then Transformer, and come back, what you typed is still there. Switching type
  or tab no longer wipes an unsaved form. The draft is even kept if the app
  closes.
- **A clear reminder.** Above the Save button, a red line "Not saved yet - press
  Save point" appears while the form has unsaved content, and turns green once
  the point is saved. Watch that line: if it is red, the point is not yet in
  your data.

So the rule on the phone is simple: fill a point, press **Save point**, and it
appears in the List. Do that for every pole, every customer, every transformer.

---

## Real lines, satellite view, and GPS accuracy (v3)

**The map now follows the real network, not the walk.** The line is drawn from
the spans you set with From_Pole, so it matches the distribution line on the
ground. If a surveyor zigzags between poles, the drawing stays straight from
pole to pole. Tee-offs branch from the correct parent pole.

**Satellite view.**
- In the app, the map card has a **Satellite** button. It loads the real
  satellite imagery and overlays your poles, lines and customers. It needs
  internet, so in a no-signal spot it falls back to the offline diagram.
- The **Diagram (offline)** button is always available and needs no network.
- In both the app and the tracker, the Send/Export area has **Create Google
  Earth file (KML)**. Open it in Google Earth on the phone or the computer to
  see everything on the true satellite basemap. This always works, even offline
  during collection, and is the reliable way to review the survey.

**GPS accuracy.**
- The app now averages the most accurate of the last several readings instead of
  trusting one noisy fix, so the position steadies as you wait.
- The accuracy box shows metres, a quality word (good / fair / poor) and how many
  readings were combined.
- Saving a point at worse than 15 m asks for confirmation, so weak fixes are not
  recorded by accident.
- Note: GPS accuracy comes from the satellites, not from internet. Standing in
  the open, away from walls and metal roofs, and waiting 30 to 60 seconds is what
  improves it most. Internet only speeds up the very first satellite lock.

---

## Editing points on the map (Voltline)

Tap any point, on the offline diagram or on the satellite view, to open it for
correction. This is how you fix what the Google Earth review shows.

- **Wrong branch (topology):** open the pole and change **From_Pole** to the
  correct parent. The line redraws and the span length recomputes at once.
- **Wrong position:** stand at the right spot, press **Start GPS**, wait for a
  good fix, then **Update point**. The coordinates are replaced; if you do not
  re-capture, the position is kept.
- **Wrong attribute:** correct any field and press Update point.
- **Delete:** still on the List tab, per point.

Coordinates are not draggable by hand on purpose. A pole's position is a real
GPS measurement; the way to correct it is to re-measure on site, not to guess it
with a finger on a small screen.

---

## Phase 2 customer details (build 2026-11-01-a)

Aligned to the real Lot-2 Phase 2 customer lists (Kirehe & Ngoma). New fields on
the Customer form:

- **Category** — RESIDENTIAL / COMMERCIAL / NON RESIDENTIAL / INDUSTRIAL /
  PUBLIC INSTITUTION (the Phase 2 "Category / CATEGORIES" column).
- **Phase** — SINGLE PHASE / THREE PHASE, kept separate from Meter Type.
- **Comment** — free note per customer (the Phase 2 COMMENT column).
Category and Phase are carried over from the previous customer (repeat mode), so
they are one tap on a street of similar houses.

### Customer list in your workbook format
Send tab and the tracker both have **Customer list — Phase 2 format**. It exports
exactly your columns, in your order:

NO, Pole N0, HOUSE NO, Cable Length, First Name, Last Name, Village, Cell,
Sector, Category, ID, Meter Number, UPI/No Parcel, phone number, Phase,
Transformer, Signed, Comment.

Drop it straight into the Kirehe / Ngoma customer workbook — only identity
fields you choose to add later stay blank.

---

## Pick the customer from the list (build 2026-11-01-b)

The customer details already exist in the Kirehe / Ngoma lists. The surveyor no
longer types them. Instead:

1. In the Transformer zone, tap **Load customer list** and choose the CSV for
   that transformer (provided in the customer_lists folder).
2. On the **Customer** point type, a **Pick the customer** list appears. Search
   by house, name or meter, and tap the person.
3. Name, last name, Category, Phase, ID, Meter, UPI and phone fill in from the
   list. The surveyor only: chooses the supply pole, stands at the meter, takes
   the GPS. Cable length computes itself. Save.
4. The list shows **X of N left**; a surveyed customer turns green and sinks to
   the bottom, so the surveyor always sees who remains.
5. **+ New customer not on the list** gives a blank form for a walk-in.

The signature feature was removed.

### Ready-to-load customer lists
The **customer_lists** folder has one CSV per transformer, built from your
Phase 2 workbooks (1,338 customers across 9 transformers so far): RUSHONGA,
KABUGA, RUHAMA, NYAMISAGARA, NYAMATEKE, Ex. KAGOROGORO, KANOGO, MPANGUHE,
KIRIRA. Columns: Pole, House, First Name, Last Name, Category, ID, Meter, UPI,
Phone, Phase, Village, Cell, Sector, Transformer. New lists: export the sheet
from Excel as CSV with a header row using these names (order and case do not
matter; the app matches by keyword).

---

## Simpler to use on site (build 2026-11-01-c)

The capture screen was made field-first:

- **Setup folds away.** Transformer, zone and the customer-list loader sit in a
  single "Setup" line at the top; it collapses once the transformer is set.
- **Big type buttons** — Pole, Customer, Transformer — right under a compact GPS
  strip that shows accuracy at a glance (green = good).
- **GPS starts by itself** when the page opens on https, so there is nothing to
  tap first.
- **Only the essential fields show.** Everything else is under "More details".
  Pole: From_Pole, Conductor, class, Assembly, Earthing. Customer: supply pole
  and cable length. Transformer: name, capacity, phases, support.
- **Customer: pick, then a green banner** shows who is selected; the surveyor
  takes the GPS at the meter and saves. Identity stays filled underneath.
- The **map** is collapsed into its own line, opened only when needed.

Nothing was removed from the data or the exports — only the screen was made
calmer so it is quick to use with one hand in the field.

---

## Almost everything is now a choice (build 2026-11-01-d)

The surveyor taps, he does not type. Every option list is now a row of big
buttons instead of a dropdown:

- Pole class (S100 ... S255), Assembly, Structure, Height, Conductor — tap one.
- Yes/No fields (Earthing, Stay, Flying stay, Ready board) are two big
  No / Yes buttons instead of 0 / 1.
- Customer, phase, category, service cable — all chosen by tapping.

The only things still typed are a measured number (left blank, GPS fills it) and
the rare walk-in customer not already in the loaded list. Pole and house numbers
fill themselves.

---

## Choose the name, see all the details (build 2026-11-01-e)

When the surveyor picks a customer from the list, the full record is shown at
once: name, house no, category, phase, national ID, meter, UPI/parcel, phone,
village, cell, sector. Nothing hidden. He confirms it is the right person, then
only chooses the supply pole and takes the GPS at the meter. Everything else is
already there and goes into the export.

---

## Everything is a choice, from the start (build 2026-11-01-f)

Setup is now all selection, no typing — built from your Lot-2 data:

- **District** — choose Kirehe or Ngoma.
- **Transformer** — choose from the 35 Phase-2 transformers (filtered by
  district). Picking it fills the **Sector** by itself and labels the load
  button with that transformer's name.
- **Cell** and **Village** — become drop-downs of the real values once the
  customer list is loaded.

So from the first screen the surveyor only taps: district, transformer, load
the list. Then per point he taps the type, taps the attributes, picks the
customer, and takes the GPS. Almost nothing is typed anywhere.

---

## Customer is a drop-down choice too (build 2026-11-01-g)

The customer is now chosen the same way as the transformer: a single
**Customer** drop-down listing the names (not-yet-surveyed first, a tick on the
ones already done). Choose the name and the full record appears. No search box,
no typing — just a choice. "+ New customer not on the list" stays for walk-ins.

---

## Customer lists built in — GPS only (build 2026-11-01-h)

Two changes you asked for:

1. **Coordinates are GPS only.** The "type coordinates by hand" option is gone.
   A point is saved only from the GPS position.
2. **The customer lists are inside the app** (file customers.js, 30 transformers,
   7,781 customers). Nothing to load on the phone. The surveyor chooses the
   district, then the transformer, and that transformer's customers are already
   there. Choosing the name shows every detail from your lists.

Deploy BOTH files: index.html and customers.js (plus sw.js, manifest, icons).
customers.js is required — index.html alone will have no customers. To refresh
the lists later, regenerate customers.js and bump sw.js.

Transformers without an embedded list yet (Ikibinde and the industrial sites,
and Nyabayama) show an empty list; the surveyor adds those by hand.

---

## Map on top, drag to fix, no clutter (build 2026-11-01-j)

- **The map is at the top of every capture**, satellite by default (Diagram
  offline is one tap). The surveyor sees the plan as he works.
- **Edit on the map:** tap a point to open it (fix the pole link / line), or
  **drag it** on the satellite to the correct house position if the GPS was off.
  Moving a point recomputes the span lengths and the service-cable lengths.
- **No more "More details".** Every field shows in one sequence: for a pole,
  From_Pole, Conductor, Span length (computed), Structure, Height, class,
  Assembly, Stay, Flying stay, Earthing, Photo.
- **REG/Utility-Network fields removed** (mechanical strength, year of
  commissioning, lifecycle/construction status, etc.) — not needed.
- Customer and transformer: same single sequence, map on top, photos kept.
