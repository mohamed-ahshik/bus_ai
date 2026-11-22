# Trains Tab Expo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Trains-tab screen with the approved Status/Timings design, using the current app theme, 4-tab navigation, iOS/Android native components, fixture data first and Supabase RPC data after.

**Architecture:** `app/(tabs)/map.tsx` becomes a thin screen shell with a Status/Timings switch. Status reuses the existing legacy `useTrainServiceAlerts`. Timings is built from small components in `components/train/`, pure helpers in `lib/train/`, and a `TrainDataSource` adapter. Development starts with a bundled compact-snapshot fixture; a Supabase adapter (table reads + `train_station_timings` RPC) replaces it without changing the components. The data pipeline from the sync plan runs in parallel.

**Tech Stack:** Expo 55, React Native 0.83, TypeScript, React Query, Supabase JS, AsyncStorage, Jest + `jest-expo`.

**Spec:** `docs/superpowers/specs/2026-11-22-train-tab-design.md`

**Parallel data plan:** `docs/superpowers/plans/2026-11-21-train-gtfs-sync-github-actions.md`

## Global Constraints

- **Only the Trains tab changes.** Keep `components/CustomTabBar.tsx`, the existing 4-tab navigation, and all other tabs untouched.
- Use the **current app theme**: `useAppTheme()` colours, system font, `bgSection #242424`, `surface #1e1e1e`, `border #333`, `primary #66bb6a`. No global re-theme.
- Header title: **Train**.
- Status: keep legacy `useTrainServiceAlerts`; do not migrate the alert source.
- Status footer: keep `Last updated: …` and the LTA DataMall attribution.
- Timings footer: `Scheduled times · not live predictions`.
- Direction/labels: station order first/last; `To <first>` / `To <last>`.
- Per-line station codes: use `codes[line]` (`NS9`, `TE2`); fall back to station ID.
- LRT lines: BPL/SKL/PGL are separate chips; use the actual line selected and its per-line station code.
- Search: max 8, starts-with first, then substring, alphabetical.
- Stale snapshot: show `Schedule snapshot from <date>` only after 7 days.
- `feed_end_date` exceeded: show `Schedule not available for this date`; no fake countdown.
- No PH calendar in this change; public-holiday dates use the feed’s weekday/weekend service. Documented limitation.
- iOS + Android native are the target; web can keep the current fallback.
- No LTA key or GTFS download in the app.
- Touch targets: line-browser chips need `hitSlop`/44px hit area; line-strip stops 44px tap height.

## Review Focus

- **Station codes at interchanges:** Woodlands must show `NS9 · Platform A` and `TE2` in the also-at row. Do not fall back to one code for both lines.
- **Direction/terminal alignment:** `direction=0` must be the first station in the line order; filtering departures by `direction` must not mix directions.
- **Service day:** after-midnight departures (`t >= 86400`) belong to the previous service date. The RPC handles this; the app must not recompute dates from the wall clock.
- **PH gap:** 25 Dec 2026 shows weekday service. This is accepted; do not invent holiday data.
- **Expiry:** after 31 Dec 2026, show unavailable, not an empty list.
- **Legacy alerts:** Status line cards use the existing alert text/matching; do not silently switch to GTFS-RT.
- **Hit areas:** 32px line-browser chips must still have 44px touch targets.
- **Fixture vs production:** fixture code must not be the default in a production build.

---

## File Structure

- Modify: `app/(tabs)/map.tsx` — thin shell; Status/Timings switch; remove old inline UI.
- Create: `components/train/TrainScreen.tsx` — view state + header/mode switch.
- Create: `components/train/StatusView.tsx` — banner + line list + footer.
- Create: `components/train/TimingsView.tsx` — search, content, results.
- Create: `components/train/StationSearch.tsx`
- Create: `components/train/LineBrowser.tsx`
- Create: `components/train/LineStrip.tsx`
- Create: `components/train/DirectionToggle.tsx`
- Create: `components/train/TimingCard.tsx`
- Create: `components/train/AlsoAtRow.tsx`
- Create: `components/train/InterchangeSheet.tsx`
- Create: `lib/train/types.ts`
- Create: `lib/train/format.ts`
- Create: `lib/train/resolve.ts`
- Create: `lib/train/search.ts`
- Create: `lib/train/dataSource.ts`
- Create: `lib/train/fixture.ts` (dev-only fixture)
- Create: `lib/api/trainSchedule.ts` — Supabase table reads + RPC
- Create: `lib/hooks/useTrainNetwork.ts`
- Create: `lib/hooks/useTrainTimings.ts`
- Create: `lib/train/__tests__/format.test.ts`
- Create: `lib/train/__tests__/resolve.test.ts`
- Create: `lib/train/__tests__/search.test.ts`
- Modify: `package.json` — Jest config/scripts/devDeps.

### Data contract

```ts
export type TrainLineCode = 'NSL' | 'EWL' | 'NEL' | 'CCL' | 'DTL' | 'TEL' | 'BPL' | 'SKL' | 'PGL';

export type TrainStation = {
  id: string;
  name: string;
  lines: TrainLineCode[];
  codes: Record<string, string>; // { NSL: 'NS9', TEL: 'TE2' }
};

export type TrainLine = {
  code: TrainLineCode;
  name: string;
  stations: { id: string; name: string; code: string }[];
};

export type TrainDeparture = {
  tripId: string;
  line: string;
  direction: '0' | '1';
  headsign: string;
  platform: string;
  scheduledAt: string; // ISO
  epochMs: number;
};

export type TrainTimings = {
  station: TrainStation;
  line: TrainLine;
  direction: '0' | '1';
  departures: TrainDeparture[];
  feedEndDate: string | null; // YYYY-MM-DD
  scheduleAvailable: boolean;
};
```

RPC:

```sql
public.train_station_timings(
  p_station_id text,
  p_line text,
  p_direction smallint default 0,
  p_limit int default 5,
  p_at timestamptz default now()
) returns jsonb
```

The RPC is defined in the parallel data plan, Task 8. It resolves services, handles after-midnight departures, and returns departures + `feed_end_date` + `schedule_available`.

Direct table reads:

```sql
select station_id, name, lines, codes from public.train_gtfs_stations;
select line, station_ids from public.train_gtfs_line_stations;
```

---

### Task 1: Test setup and pure helpers

**Files:**
- Modify: `package.json`
- Create: `lib/train/types.ts`
- Create: `lib/train/format.ts`
- Create: `lib/train/resolve.ts`
- Create: `lib/train/search.ts`
- Create: `lib/train/__tests__/format.test.ts`
- Create: `lib/train/__tests__/resolve.test.ts`
- Create: `lib/train/__tests__/search.test.ts`

**Interfaces:**
- `formatCountdown(epochMs: number, now?: number): { value: string; unit: string }`
- `formatEta(epochMs: number, now?: number): string`
- `formatClock(iso: string): string`
- `resolveDirection(line: TrainLine, direction: '0' | '1'): { origin: string; destination: string }`
- `stationCode(station: TrainStation, line: string): string`
- `rankStations(stations: TrainStation[], query: string, limit?: number): TrainStation[]`
- `isScheduleAvailable(feedEndDate: string | null, date?: Date): boolean`
- `isSnapshotStale(importedAt: string | null, now?: number, days?: number): boolean`

- [ ] **Step 1: Add Jest**

Add dev dependencies `jest`, `jest-expo`, `@types/jest`; add `"test": "jest"` and `jest` config with `preset: "jest-expo"`. Keep tests in `lib/train/__tests__`.

- [ ] **Step 2: Write failing tests**

```ts
describe('formatCountdown', () => {
  const now = Date.UTC(2026, 10, 22, 0, 0, 0);
  it('minutes', () => expect(formatCountdown(now + 2 * 60_000, now)).toEqual({ value: '2', unit: 'min' }));
  it('hours', () => expect(formatCountdown(now + 65 * 60_000, now)).toEqual({ value: '1', unit: 'h 5m' }));
  it('due', () => expect(formatCountdown(now + 10_000, now)).toEqual({ value: 'Due', unit: '' }));
  it('departed', () => expect(formatCountdown(now - 120_000, now)).toEqual({ value: '—', unit: '' }));
});

describe('rankStations', () => {
  const stations = [/* Woodlands, Woodlands North, Woodleigh, Admiralty */];
  it('starts-with first, max 8', () => {
    const result = rankStations(stations, 'wood');
    expect(result[0].name).toBe('Woodlands');
    expect(result.map((s) => s.name)).toContain('Woodleigh');
  });
});

describe('resolveDirection', () => {
  it('uses first and last stations', () => {
    expect(resolveDirection(line, '0')).toEqual({ origin: 'Jurong East', destination: 'Marina South Pier' });
  });
});

describe('stationCode', () => {
  it('uses the per-line code', () => {
    expect(stationCode({ id: 'NS9', codes: { NSL: 'NS9', TEL: 'TE2' } }, 'TEL')).toBe('TE2');
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- --runInBand`
Expected: FAIL because the helpers do not exist.

- [ ] **Step 4: Implement the helpers**

- Countdown uses `now` parameter; no `Date.now()` inside pure helpers.
- `formatClock` uses `Asia/Singapore`, 24-hour.
- `rankStations` case-insensitive; starts-with group first; alphabetical; default limit 8.
- `isScheduleAvailable` compares the SGT calendar date to `feed_end_date`.
- `isSnapshotStale` compares `imported_at` to `now`; 7 days default.

- [ ] **Step 5: Run tests**

Run: `npm test -- --runInBand`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add package.json lib/train
git commit -m "feat: add train timing helpers and tests"
```

---

### Task 2: Fixture and data-source adapter

**Files:**
- Create: `lib/train/dataSource.ts`
- Create: `lib/train/fixture.ts`
- Create: `lib/train/__tests__/fixture.test.ts`

**Interfaces:**
- `TrainDataSource`:
  ```ts
  interface TrainDataSource {
    getNetwork(): Promise<{ stations: TrainStation[]; lines: TrainLine[] }>;
    getTimings(stationId: string, line: string, direction: '0' | '1'): Promise<TrainTimings>;
  }
  ```
- `fixtureDataSource: TrainDataSource`
- `createSupabaseDataSource(): TrainDataSource` (implemented in Task 7)

- [ ] **Step 1: Generate the fixture**

Create `lib/train/fixture.ts` from the local compact snapshot:

- all 186 stations, with `lines` and `codes`;
- all 9 lines with ordered `stations` (`id`, `name`, `code`);
- departures for Woodlands (NSL + TEL, both directions) and a few other stations so line/direction switching is testable;
- **direction-specific offsets**: do not reuse the same departure sequence for direction `0` and `1`. A fixture test must fail if any station/line pair has identical offsets, otherwise switching direction can look broken.

Keep the fixture compact. Do not include the full 392k departures.

- [ ] **Step 2: Add a fixture test**

```ts
it('preserves interchange codes', () => {
  const woodlands = fixture.stations.find((s) => s.id === 'NS9');
  expect(woodlands?.codes).toMatchObject({ NSL: 'NS9', TEL: 'TE2' });
});
```

- [ ] **Step 3: Implement the fixture data source**

`getNetwork` returns the fixture; `getTimings` filters fixture departures by line/direction, sorts, takes 5, and returns feed-end/availability fields.

- [ ] **Step 4: Run tests and typecheck**

Run: `npm test -- --runInBand`
Run: `npx tsc --noEmit`
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add lib/train/fixture.ts lib/train/dataSource.ts lib/train/__tests__/fixture.test.ts
git commit -m "feat: add compact train fixture and data source"
```

---

### Task 3: Train shell, header, and Status view

**Files:**
- Create: `components/train/TrainScreen.tsx`
- Create: `components/train/StatusView.tsx`
- Modify: `app/(tabs)/map.tsx`

**Interfaces:**
- `TrainScreen` owns `view: 'status' | 'timings'`, selected station/line/direction, and renders `StatusView` / `TimingsView`.
- `StatusView` consumes the existing `useTrainServiceAlerts()` data; no new alert source.
- Header: `Train` (28/700, matching the other tab headers) at 24px horizontal padding, Status/Timings segmented control; no refresh button.
- Pull-to-refresh on the screen `ScrollView` using `RefreshControl`; `onRefresh` refetches alerts and bumps the timings refresh token.

- [ ] **Step 1: Move the current line-status UI into `StatusView`**

Reuse the current `MRT_LINES`, `getAlertsForLine`, `formatTrainAlertLine`, banner, line cards and footer from `app/(tabs)/map.tsx`. Use `useAppTheme()` colours. Remove the old inline header/refresh from `map.tsx`; the new shell owns them.

- [ ] **Step 2: Create `TrainScreen`**

Render:
```tsx
<View style={{ flex: 1, backgroundColor: colors.bgSection }}>
  <ScrollView
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  > // Timings uses nested scroll for its content
    <Header title="Train" view={view} onChange={setView} />
    {view === 'status' ? <StatusView /> : <TimingsView />}
  </ScrollView>
</View>
```

Keep the existing `CustomTabBar` from the tabs layout. Do not modify `components/CustomTabBar.tsx`.

- [ ] **Step 3: Update `app/(tabs)/map.tsx`**

Replace the current screen body with `<TrainScreen />`. Keep the file as the route; no other tab changes.

- [ ] **Step 4: Manual check**

- Status renders all 9 lines with the current theme.
- The 4-tab bar is unchanged and Trains is active.
- Timings can be empty for now (Task 4).

- [ ] **Step 5: Commit**

```bash
git add app/(tabs)/map.tsx components/train/TrainScreen.tsx components/train/StatusView.tsx
git commit -m "feat: add train shell and status view"
```

---

### Task 4: Timings shell — search, global line browser, line strip, direction toggle

**Files:**
- Create: `components/train/TimingsView.tsx`
- Create: `components/train/StationSearch.tsx`
- Create: `components/train/LineBrowser.tsx`
- Create: `components/train/LineStrip.tsx`
- Create: `components/train/DirectionToggle.tsx`
- Create: `lib/hooks/useTrainNetwork.ts`

**Interfaces:**
- `useTrainNetwork()` returns `{ stations, lines, isLoading, error }` from `fixtureDataSource` (Task 7 swaps to Supabase).
- `TimingsView` owns selected station/line/direction, query, and uses `getTimings`. Initial `stationId` and `line` are **null**; no default station. Render the **global line browser** (all 9 lines) above the strip at all times. Choosing a line sets `line` and clears the station only when that line does not serve the current station; otherwise it keeps the station and switches the card to that line. With `stationId` null, choosing a line shows its full strip; tapping a station sets `stationId` and opens the card. Keep the component mounted while switching Status/Timings so the selection survives the switch; do not persist it across app restarts.
- `LineBrowser` input: selected line, `onSelect`; always renders all 9 lines with no dimming.
- `LineStrip` input: line, selected station, `onSelect`.
- `DirectionToggle` input: line, direction, `onChange`.

- [ ] **Step 1: Build the network hook**

Use React Query:
```ts
useQuery({ queryKey: ['trainNetwork'], queryFn: () => dataSource.getNetwork(), staleTime: 24 * 60 * 60 * 1000 })
```
Build a station index with `codes` and line order.

- [ ] **Step 2: Build the search**

`StationSearch` is a TextInput with search icon and clear button. Query state lives in `TimingsView`. Results use `rankStations`; max 8. Single-line result selects immediately; interchange opens the sheet (Task 6; for now open a stub).

- [ ] **Step 3: Build the global line browser**

Always show all 9 lines in the order `NSL EWL NEL CCL DTL TEL BPL SKL PGL` in a horizontal `ScrollView`. Center the row and scale chips to the available content width: 36px minimum, 56px maximum, using the full width at 390px. All 9 fit in one row at 390px; below ~360px the row scrolls. Selected chip: 2px line-colour border, no fill. Other chips: line dot + code. Never dim a chip and never disable it. Chips are 38px tall; use `hitSlop={6}` to reach a 44px touch height. Selecting a line that does not serve the current station clears `stationId` and shows that line’s strip; selecting one that does serve the station keeps the station and switches the card’s line.

- [ ] **Step 4: Build the line strip**

Render the **full selected line** in a horizontal `ScrollView` (about 5 stops visible at 390px at a time). Swipe to see the rest. Auto-center the selected station on mount/selection using a `scrollTo` calculation and the measured viewport width. Line in line colour; dots; code + name; selected dot larger/filled. Tapping selects that station on the same line. `minHeight: 44` for taps.

- [ ] **Step 5: Build the direction toggle**

Use `resolveDirection(line, '0'|'1')` for `To <first>` / `To <last>`. Active uses `colors.primary`; inactive `surface`/`border`.

- [ ] **Step 6: Wire fixture timings**

On station/line/direction change, call `getTimings` with the fixture; show loading/error. The card comes in Task 5.

- [ ] **Step 7: Manual check**

- Search `Wood` shows Woodlands, Woodlands North, Woodlands South, Woodleigh.
- Opening Timings shows all 9 line chips in one row with none selected and no default station.
- Choosing NEL shows the full NEL strip; tapping a station opens its card.
- Tapping TEL at Woodlands keeps Woodlands and updates the strip/direction to TEL.
- Tapping EWL at Woodlands (EWL does not serve Woodlands) clears the station and shows the EWL strip.
- Strip shows the full line and auto-centers the selected station.

- [ ] **Step 8: Commit**

```bash
git add components/train lib/hooks/useTrainNetwork.ts
git commit -m "feat: add train timings search, line browser, strip, direction"
```

---

### Task 5: Timing card, also-at row, footer, stale state

**Files:**
- Create: `components/train/TimingCard.tsx`
- Create: `components/train/AlsoAtRow.tsx`
- Modify: `components/train/TimingsView.tsx`

**Interfaces:**
- `TimingCard`: station, line, departures, scheduleAvailable.
- `AlsoAtRow`: station, selected line, `onSwitch`.
- `useTrainTimings(stationId, line, direction)` hook uses the data source; refetch on key change.

- [ ] **Step 1: Build the timing card**

- Name, per-line code, platform from first departure.
- Large countdown for first departure; next four rows `HH:MM` + `in X`.
- Line-colour border/tint.
- 1-second tick; use `formatCountdown` with `Date.now()` at the component boundary.
- No service: `No scheduled departures in the next 24 hours.`
- `scheduleAvailable === false`: `Schedule not available for this date.` and no fake countdown.

- [ ] **Step 2: Build the also-at row**

First other line at the station; badge, `Also at <station> · <code>`, `Switch ›`; calls `onSwitch` (Task 6 sheet; stub for now).

- [ ] **Step 3: Add the footer/stale note**

Timings footer fixed: `Scheduled times · not live predictions`.
If the snapshot is older than 7 days, add `Schedule snapshot from <date>` above the footer. The fixture can expose a stale date for a manual state.

- [ ] **Step 4: Manual check**

- Woodlands NSL: `NS9 · Platform A`, countdown, next 4.
- `Also at Woodlands · TE2`; TEL switch updates the card.
- 2027 fixture: unavailable message.
- Stale fixture date: stale note.

- [ ] **Step 5: Commit**

```bash
git add components/train/TimingCard.tsx components/train/AlsoAtRow.tsx components/train/TimingsView.tsx lib/hooks/useTrainTimings.ts
git commit -m "feat: add train timing card and also-at row"
```

---

### Task 6: Interchange sheet and remembered line

**Files:**
- Create: `components/train/InterchangeSheet.tsx`
- Modify: `components/train/TimingsView.tsx`

**Interfaces:**
- `InterchangeSheet` props: station, selected line, onSelect, onClose.
- Persist `trainDesignLastLine` via `AsyncStorage`.

- [ ] **Step 1: Build the sheet**

Use React Native `Modal` with `transparent` + `animationType="none"` and an `Animated` bottom sheet. Animate the backdrop opacity from 0 and the sheet `translateY` from its offscreen position in parallel on open; reverse on close and only then call `onClose`/`onSelect`. Dark backdrop, 20px top radius, grab handle. On web, constrain the modal frame to `WEB_SHELL_MAX_WIDTH` (430px) so the backdrop and options stay inside the simulated phone; on native, the frame fills the screen.

- Header: `<station> · Which line?`; subtitle `This station is an interchange`.
- One button per actual line: badge, line name, `To <first> · <last>`, chevron.
- Outline the remembered/last-used line with 2px line colour.

- [ ] **Step 2: Wire search and also-at**

- Interchange search result opens the sheet.
- Single-line result selects directly.
- `Also at` opens the sheet.
- On choose: set station/line, close, clear search, load timings, persist last line.

- [ ] **Step 3: Manual check**

- `Wood` → Woodlands → sheet lists NSL + TEL.
- NSL outlined if it was last used.
- Choose TEL → TEL timings; reopen sheet → TEL outlined.
- Backdrop closes without changing selection.
- Opening fades the backdrop and slides the sheet up; closing/choosing a line reverses it before the sheet disappears.
- At a wide web viewport, the sheet and backdrop stay inside the 430px phone frame; at 390px they fill the phone.

- [ ] **Step 4: Commit**

```bash
git add components/train/InterchangeSheet.tsx components/train/TimingsView.tsx
git commit -m "feat: add interchange line picker"
```

---

### Task 7: Supabase data source with RPC

**Files:**
- Create: `lib/api/trainSchedule.ts`
- Modify: `lib/train/dataSource.ts`
- Modify: `lib/train/TimingsView.tsx` (or a provider) to choose the source
- Test: `lib/train/__tests__/supabaseSource.test.ts` (mapping only; mock client)

**Interfaces:**
- `createSupabaseDataSource(): TrainDataSource`.
- `getNetwork`: select `train_gtfs_stations` + `train_gtfs_line_stations`, map to `TrainStation`/`TrainLine`.
- `getTimings`: call `supabase.rpc('train_station_timings', { p_station_id, p_line, p_direction, p_limit: 5 })`; map JSON.

**Source selection:**
- Use `process.env.EXPO_PUBLIC_TRAIN_FIXTURE === '1'` for the fixture during development.
- In normal builds without the flag, use Supabase if `getSupabase()` is available; otherwise fall back to the fixture only in `__DEV__` and show a dev warning.
- Production must not silently use fixture data; if Supabase is missing, show a configuration error.

- [ ] **Step 1: Implement mapping**

- `stations`: `station_id → id`, `lines`, `codes` (JSON).
- `line_stations`: ordered `station_ids`; join names/codes from stations.
- RPC result: `departures` with `scheduled_at`/`epoch_ms`, `feed_end_date`, `schedule_available`.
- Sort by epoch; take 5.

- [ ] **Step 2: Add a mapping test**

Use a mocked Supabase client / static RPC payload; assert Woodlands codes `NS9`/`TE2`, direction filtering, schedule availability.

- [ ] **Step 3: Wire the hook**

`useTrainNetwork`/`useTrainTimings` use the selected source; React Query keys include station/line/direction; staleTime 24h for network, 60s for timings; no polling (countdown is local).

- [ ] **Step 4: Run typecheck/tests**

Run: `npx tsc --noEmit`
Run: `npm test -- --runInBand`

- [ ] **Step 5: Manual check with production**

After the data pipeline is live:
- Search, chips, strip, card, sheet come from Supabase.
- No LTA key in the app.
- RPC returns 5 departures and schedule flags.
- Denied/failed RPC shows a retry state, not a fixture.

- [ ] **Step 6: Commit**

```bash
git add lib/api/trainSchedule.ts lib/train/dataSource.ts lib/train/__tests__/supabaseSource.test.ts
git commit -m "feat: read train timings from Supabase"
```

---

### Task 8: Screen integration and cleanup

**Files:**
- Modify: `app/(tabs)/map.tsx`
- Modify/remove old inline styles/imports.

- [ ] **Step 1: Remove the old inline Train Status UI**

Ensure only `TrainScreen` remains; no duplicate headers, footers or line lists. Keep the route file and the tab layout unchanged.

- [ ] **Step 2: Verify the app-level constraints**

- `components/CustomTabBar.tsx` unchanged.
- `app/(tabs)/_layout.tsx` unchanged.
- Current theme via `useAppTheme`.
- No new fonts, no Inter.
- No changes to other tabs.

- [ ] **Step 3: Manual QA iOS + Android**

- Header: Train, Status/Timings; no refresh button.
- Status: normal banner, 9 line cards, footer.
- Timings: search, chips, strip, direction, card, also-at, note.
- Interchange sheet + last-used line.
- LRT station behavior.
- No service, schedule unavailable, stale note.
- Safe areas, keyboard avoidance for search, Android back closes sheet.
- Countdown updates every second.
- Pull-to-refresh reloads alerts and timings.

- [ ] **Step 4: Commit**

```bash
git add app/(tabs)/map.tsx
git commit -m "feat: integrate train status and timings into trains tab"
```

---

### Task 9: Final verification

**Files:**
- No new files; update tests if needed.

- [ ] **Step 1: Run all checks**

```bash
npm test -- --runInBand
npx tsc --noEmit
npx expo lint   # if the project has lint configured
```

- [ ] **Step 2: Verify acceptance criteria from the spec**

Check every item in `docs/superpowers/specs/2026-11-22-train-tab-design.md` §11.

- [ ] **Step 3: Verify no fixture leak**

Production build has no fixture path enabled; no LTA key; Supabase URL/anon key are the only data config.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: verify train tab implementation"
```

---

## Parallel Data Work

The data plan (`2026-11-21-train-gtfs-sync-github-actions.md`) must deliver, in parallel:

1. Tables: `train_gtfs_meta`, `train_gtfs_stations` (with `codes`), `train_gtfs_line_stations`, `train_gtfs_services`, `train_gtfs_service_exceptions`, `train_gtfs_departures`.
2. `train_station_timings` RPC (Task 8).
3. At least one successful import of the current feed.
4. Public `select`/`execute` grants.
5. Production deployment run by you (Supabase commands + GitHub secrets).

The Expo plan can complete Tasks 1–6 with the fixture while the data plan runs. Task 7 is the join point.

## Manual QA Additions

- **Search:** `Wood` → 4 expected stations and badges. Clear × restores Timings.
- **Interchange:** Woodlands → NSL/TEL sheet; selected line outline; switch works.
- **Direction:** To Jurong East vs To Marina South Pier changes the platform, departure times and countdown.
- **Station strip:** tapping NS10 Admiralty changes the station and card.
- **LRT:** at an LRT station, tapping BPL, SKL or PGL opens that line’s strip and card; no combined LRT chip.
- **After midnight:** fixture/RPC date test includes a `24:xx` departure.
- **PH:** 25 Dec 2026 shows weekday service; documented accepted behavior.
- **Expiry:** 2027 shows unavailable.
- **Stale:** 8-day-old fixture shows the snapshot note.
- **Theme/nav:** only Trains screen changed; 4-tab bar intact.

## Non-Goals

- Full live train predictions.
- GTFS-RT alert migration.
- Web implementation.
- Changing the app-wide theme or navigation.
- Public-holiday calendar.
- Full UI snapshot tests (unit tests + manual QA only).
