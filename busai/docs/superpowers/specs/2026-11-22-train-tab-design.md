# Train Tab — Status / Timings Design Spec

**Status:** Draft for review
**Date:** 2026-11-22
**Platform:** React Native + Expo, iOS-first, 390px reference width
**Related plan:** `docs/superpowers/plans/2026-11-21-train-gtfs-sync-github-actions.md`
**Reference:** Attached "Status" and "Timings · Search + line + interchange" artboards

---

## 1. Intent

Replace the current Train-tab line-status screen with a two-mode screen:

- **Status** — is the network running normally, line by line?
- **Timings** — when is the next scheduled train from a specific station, on a specific line and direction?

The key addition is scheduled GTFS timings with **station search**, a **line strip**, and an **interchange line picker**. Timings are scheduled, not live predictions.

## 2. Users and jobs

| User job | Screen |
|---|---|
| "Is my line disrupted right now?" | Status |
| "When is the next train from Woodlands toward Jurong East?" | Timings |
| "I'm at an interchange — which line do I want?" | Interchange bottom sheet |
| "Find Woodlands North quickly" | Search |
| "Switch from NSL to TEL at Woodlands" | Also-at row / bottom sheet |

## 3. Scope

### In scope

- Status: network banner + 9 line cards.
- Timings: station search, global line browser, line strip, direction toggle, timing card, also-at row.
- Search results with station codes and line badges.
- Interchange bottom sheet with one button per line, terminal labels and remembered line.
- Implementation only inside the existing **Trains** tab screen.
- The app's existing 4-tab navigation (Nearby, Bookmarks, Trains, Settings) stays unchanged.
- Data from the compact GTFS snapshot (see §7).

### Out of scope

- Live train positions or true real-time arrival predictions (not published by LTA).
- Route planning, fares, service alerts detail screens.
- LTA real-time trip updates (delay overlay) — future.
- Android-specific layout.

## 4. Information architecture

```
Train tab
├── Status
│   ├── Normal / disrupted banner
│   └── Line cards: NSL EWL NEL CCL DTL TEL BPL SKL PGL
└── Timings
    ├── Station search
    ├── Search results
    │   └── Interchange → bottom sheet → Timings
    ├── Global line browser (all 9 lines)
    ├── Line strip
    ├── Direction toggle
    ├── Timing card
    ├── Also at <station> row
    └── Scheduled-times note
```

## 5. Screens and flows

### 5.1 Header

- Title **Train** (28px, 700), horizontally aligned with the Bookmarks/Settings headers at 24px padding.
- **Status | Timings** segmented control, filling the space next to the title.
- No refresh button. Pull down on the screen to refresh (native `RefreshControl`, accent-coloured spinner).
- Subtitle:
  - Status: `Updated HH:MM:SS SGT`
  - Timings: `Scheduled departures`

### 5.2 Status

- Alert source: **reuse the current app's legacy `useTrainServiceAlerts` hook for this change.** Do not migrate the Status tab to GTFS-RT in this scope; the preview's GTFS-RT path is illustrative only.
- Banner:
  - normal: accent-tinted card, GPS icon, **Normal service**, "All MRT and LRT lines operating normally".
  - warning: amber card, **Service disruptions reported**, count.
  - error: danger card with retry.
- Nine line cards in one column, 9px gap:
  - 44px line badge, line name, status dot + **Normal** / **Disrupted**.
  - Disruption text below a divider.
- Keep the current app footer on Status: `Last updated: …` and `Train alerts powered by LTA DataMall, Singapore Open Data Licence v1.0.` Timings keeps the `Scheduled times · not live predictions` note.

### 5.3 Timings

Top-to-bottom:

0. **No default station.** Opening Timings shows the search field plus the global line browser. No station is selected until the user searches or taps a stop on the strip. Selection is kept while switching Status/Timings in the same session, but is not persisted across app restarts.
1. **Station search field** (44px, search icon, clear ×).
2. **Global line browser** — always visible above the strip:
   - all 9 lines: NSL, EWL, NEL, CCL, DTL, TEL, BPL, SKL, PGL;
   - the row is centered and chips scale to the available width, from 36px at narrow widths up to 56px on wide screens;
   - all 9 fit in one row at 390px; below ~360px the row scrolls horizontally;
   - selected: **2px outline in the line colour**, no solid fill;
   - other lines: coloured dot + code, no dimming;
   - choosing a line with no station shows that line’s full strip;
   - choosing a line that does **not** serve the current station clears the station and shows that line’s strip. No dead-end dimmed chips.
   - If the user searched a station, its line (or interchange choice) is selected and the global browser stays available.
3. **Line strip** — horizontal, **swipeable mini-map of the full selected line**:
   - about 5 stations visible at 390px;
   - swipe left/right to see the rest of the line;
   - the selected station is auto-centered and has a larger filled dot with bold code/name;
   - horizontal line in the line colour, station dot, code above name;
   - tapping a stop selects that station on the same line.
4. **Direction toggle**: `To <first terminal>` | `To <last terminal>`, active accent green. Switching direction must change the platform and departure rows; fixture data must not reuse one direction’s offsets for the other.
5. **Timing card**:
   - station name, `NS9 · Platform A`,
   - large countdown for the next train (e.g. `2 min`),
   - next 4 departures: `HH:MM` and `in X min`,
   - card border/tint uses the selected line colour.
6. **Also at `<station>` · `<other line code>` · Switch ›** when the station is an interchange.
   - Example: `TEL Also at Woodlands · TE2  Switch ›`.
7. Footer: `Scheduled times · not live predictions`.

### 5.4 Search

- Typing filters stations by name (case-insensitive, starts-with ranked first, max 8).
- Result row: station name, all per-line codes (`NS9 · TE2`), badges for every serving line.
- Single-line station → straight to Timings for that line.
- Interchange → bottom sheet.

### 5.5 Interchange bottom sheet

- Backdrop dims the screen; sheet from bottom, 20px top radius.
- Open animation: backdrop fades in over ~220ms while the sheet slides up over ~300ms. Close reverses both over ~180–220ms, then dismisses.
- Choosing a line also animates the sheet out before the timing card changes.
- On web, both the backdrop and sheet are constrained to the 430px simulated phone frame. Native modals remain full-screen.
- Title: `<station> · Which line?`
- Subtitle: `This station is an interchange`.
- One button per line:
  - line badge,
  - line name,
  - terminals: `To <first> · <last>`,
  - chevron.
- Remembered/last-used line has a **2px line-colour outline**.
- Choosing a line closes the sheet, clears search, and shows Timings for that station + line.
- Backdrop tap closes.
- Persist last used line in local storage (`trainDesignLastLine` in the preview; `AsyncStorage` in the app).

## 6. Visual tokens

Use the **current app theme** from `lib/theme.ts`; do not re-theme the app.

| Token | Value |
|---|---|
| Screen background | `#242424` (`bgSection`) |
| Card background | `#1e1e1e` (`surface`) |
| Border | `#333333` |
| Primary text | `#f5f5f5` |
| Muted text | `#a3a3a3` |
| Accent (active pills) | `#66bb6a` |
| Warning | `#f57c00` |
| Danger | `#e53935` |
| Font | Current app system font (SF Pro / Roboto) |
| Radius | 12–16px |
| Touch targets | ≥44px |

Line colours:

| Line | Colour |
|---|---|
| NSL | `#D42E12` |
| EWL | `#009530` |
| NEL | `#9900AA` |
| CCL | `#FA9E0D` |
| DTL | `#005EC4` |
| TEL | `#9D5B25` |
| LRT | `#748577` |

## 7. Data contracts

### 7.1 Compact snapshot tables

The web preview currently reads the local compact snapshot served by the demo server. In production it reads Supabase tables produced by the GitHub Action plan.

Required shape:

```
train_gtfs_stations
  station_id   text primary key
  name         text
  lines        jsonb   -- ["NSL","TEL"]
  codes        jsonb   -- {"NSL":"NS9","TEL":"TE2"}

train_gtfs_line_stations
  line         text primary key
  station_ids  jsonb   -- ordered station IDs; join train_gtfs_stations for name/code
```

The read API joins these into `[{id,name,code}]` for the line strip.

`codes` is a **required addition** to the current GitHub Action plan; the current plan only stores station IDs/names. Without it, the interchange cannot display `NS9 · TE2` or `TE2` in the also-at row.

```
train_gtfs_departures
  station_id, service_id, departures jsonb
  [{t,line,headsign,platform,direction,tripId}, ...]
```

```
train_gtfs_services / train_gtfs_service_exceptions
  service resolution by date
```

### 7.2 Read endpoints (preview)

| Endpoint | Purpose |
|---|---|
| `GET /api/app/stations` | lines + ordered stations + per-line `code` |
| `GET /api/app/departures?station=NS9&limit=24&window=1440&perline=1` | departures for station; filter by line + direction client-side |
| `GET /api/app/meta` | compact snapshot inspector |

The departures response must include `feedEndDate` (or `scheduleAvailable`) so the app can distinguish “no service in the next 24h” from “the feed has no data for this date.” After `feed_end_date`, show **Schedule not available for this date**.

Production equivalent: Supabase `select`/RPC or an Edge Function. Do not call LTA GTFS from the app.

### 7.3 Resolution rules

- **Station code**: `station.codes[line]`; fall back to `station.id`.
- **Direction**: `0` → first station in the line order; `1` → last station. Labels `To <first>` / `To <last>`.
- **LRT category**: maps the `LRT` chip to the actual BPL/SKL/PGL serving the station.
- **Next 5**: filter by line + direction, sort by epoch, first is the large countdown, next 4 are rows.
- **Also-at**: first other line at the station; `Switch` opens the sheet with all lines.
- **Countdown**: refresh every second client-side; the schedule itself is static until the next snapshot.

## 8. State and interactions

```
view: 'status' | 'timings'
stationId: string | null      // initially null
line: TrainLineCode | null    // initially null
direction: '0' | '1'
departures: next 5
query: search string
lastUsedLine: persisted string
sheetStationId: string | null
```

Initial Timings state is empty. `line` may be selected while `stationId` is null (line browser). Selecting a station is session state; it resets when the screen remounts.

- Changing line/direction/station clears the timing card and refetches.
- Search query hides the Timings content and shows results.
- Switching Status/Timings preserves the selected station/line.
- Pull-to-refresh refetches live alerts and timings; countdowns recalculate every second.

## 9. Edge cases

- **No service**: show `No scheduled departures in the next 24 hours.` Do not fake a countdown.
- **After midnight**: GTFS `24:00+` times belong to the previous service day; server resolves the calendar day (already implemented in the preview).
- **Public holidays**: the current feed does **not** mark 25 Dec 2026 as a holiday (resolves to weekday service). **Accepted limitation:** do not add a PH calendar in this change. The app will show the feed’s weekday/weekend service on public holidays until LTA publishes a `calendar_dates` exception.
- **Feed expiry**: current feed ends **2026-12-31**. For dates beyond `feed_end_date`, show **“Schedule not available for this date”** — not an empty or stale timetable. The scheduled GitHub Action will import a 2027 feed automatically **if and when LTA publishes one**; it cannot create the schedule. The action warns at T-30 days but continues checking daily.
- **Station with >2 lines**: sheet lists every line; the also-at row shows the first other line.
- **LRT station**: BPL, SKL and PGL are separate chips; the selected LRT line drives the strip and timing card.
- **Unknown station code**: fall back to station ID.
- **Stale snapshot**: if the imported snapshot is older than **7 days**, show a small `Schedule snapshot from <date>` note. Do not label it live. Between 0–7 days, the normal “Scheduled times” note is enough.

## 10. Accessibility

- 44px minimum for header controls, search, direction buttons, nav.
- Line chips are 38px tall visually; give them a 44px hit area with `hitSlop` or an invisible wrapper in React Native.
- Line-strip stops must expose at least a 44px tap height.
- Line status is not colour-only: text `Normal`/`Disrupted`.
- Search field has an accessible label and clear button label.
- Bottom sheet traps focus and returns focus to the trigger on close.
- Countdowns use tabular numerals; screen-reader text says “2 minutes”.

## 11. Acceptance criteria

- 390px layout matches the attached artboards.
- Status and Timings switch without losing the selected station/line.
- Opening Timings with no prior selection shows the global line browser with all 9 line chips and no Woodlands default.
- Choosing a line without a station shows its full swipeable strip; tapping a station opens the card.
- The global line browser stays visible when a station is selected; all 9 lines remain enabled.
- Choosing a line that does not serve the current station clears the station and shows that line’s strip.
- The line strip shows the full line, scrolls horizontally, and auto-centers the selected station.
- Searching `Wood` returns Woodlands, Woodlands North, Woodlands South, Woodleigh with correct badges/codes.
- Woodlands shows `NS9 · TE2`; selecting TEL updates the strip/card and keeps the station.
- NSL direction labels are `To Jurong East` / `To Marina South Pier`.
- Timing card shows the next 5 departures; countdown updates every second.
- Interchange sheet lists NSL and TEL; choosing TEL switch/uses TE2.
- BPL, SKL and PGL appear as individual line chips and open their own strips.
- No-service, after-midnight and feed-expiry states are explicit.
- Past `feed_end_date`, Timings shows **Schedule not available for this date**, not an empty list.
- Status keeps the current app's “Last updated / LTA DataMall” footer.
- A snapshot older than 7 days shows `Schedule snapshot from <date>`.
- No LTA key or GTFS download in the app.

## 12. React Native / Expo implementation notes

- Port the preview into `app/(tabs)/map.tsx`; split components:
  - `TrainStatusView`
  - `TrainTimingsView`
  - `StationSearch`
  - `LineBrowser`
  - `LineStrip`
  - `DirectionToggle`
  - `TimingCard`
  - `InterchangeSheet`
- Use `Pressable`, `ScrollView`, `FlatList`, `Modal` (or a sheet library); reuse `useAppTheme()` colours and the current system font.
- Use `AsyncStorage` for `trainDesignLastLine`.
- Use React Query for `/api`-equivalent Supabase reads; a 30s refetch for alerts, 1s local tick for countdowns.
- Keep `CustomTabBar` and the existing 4-tab navigation unchanged. All work stays inside the Trains screen (`app/(tabs)/map.tsx`).
- Read the compact snapshot from Supabase; do not call LTA DataMall from the app.

## 13. Decisions and open questions

### Decided 2026-11-22

1. **Navigation:** keep the current 4-tab navigation. Implement only inside the **Trains** tab; do not change Bus, Bookmarks, Settings or the custom tab bar.
2. **Theme:** use the current app theme and system font. The preview should mirror `#242424` / `#1e1e1e` / `#333333` / `#66bb6a`.
3. **Per-line station codes:** required. Woodlands must display `NS9` for NSL and `TE2` for TEL.
4. **TEL terminal copy:** use actual GTFS terminals (currently Bayshore / Woodlands North), not the mock’s Gardens by the Bay.
5. **Public holidays:** accepted limitation. No PH calendar in this change; the app shows the feed’s weekday/weekend service until LTA publishes an exception.
6. **Feed expiry:** show **Schedule not available for this date** beyond `feed_end_date`. The GitHub Action warns at T-30 days and continues checking daily; it imports a 2027 feed if LTA publishes one, but it cannot create it.
7. **Status alert source:** use the existing legacy `useTrainServiceAlerts` hook; no alert-source migration in this change.
8. **Header title:** ship **Train** (matches the design and the Trains tab).
9. **Footer:** keep the current app attribution on **Status** only; Timings keeps the scheduled-times note.
10. **LRT lines:** BPL, SKL and PGL are individual chips. If a station is served by more than one, the tapped line is used; search badges list every serving line.
11. **Search scope:** max 8 results; starts-with matches first, then substring matches, alphabetical within each group.
12. **Stale snapshot:** show `Schedule snapshot from <date>` only when the snapshot is older than 7 days.
13. **Default station:** none. Timings opens with search + the **global line browser** (all 9 lines enabled); choosing a line shows its strip, and tapping a station shows the card. The browser stays visible at all times; choosing a line that doesn’t serve the current station clears the station and shows that line’s strip. Selection is kept while switching Status/Timings but not persisted across restarts.

### Still open

No product questions remain. Next step is the Expo implementation plan.

## 14. Non-goals

- Full live train arrival predictions.
- Delay overlays from GTFS-RT (future).
- Route planning or interchange journey search.
- Historical timetables.
- Replacing the existing bus tabs in this change.

---

**Preview:** `/train-tab?view=timings` on the local demo server.
**Reference implementation:** `~/Downloads/train-status-demo/train-tab.html`, `train-tab.css`, `train-tab.js`.
