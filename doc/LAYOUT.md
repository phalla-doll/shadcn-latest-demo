# Borderlines Active Conflict Monitor - Layout Documentation

## Overall Layout Structure

The app uses a **flex column layout** with `min-h-screen` to ensure full viewport height.

---

## 1. Sticky Header

A sticky navigation bar that stays fixed at the top while scrolling:

**Left side:**
- `LiveStatusBadge` — "Cambodia-Thailand: Active Conflict Monitor" with live indicator
- Date range badge (e.g., "Dec 7th - Dec 17th")
- Main title: "Documenting the Border Crisis" with subtitle

**Right side (desktop only):**
- "Phnom Penh Donation Map" CTA button with map pin icon

---

## 2. Main Content Area

Centered content with `max-w-4xl mx-auto`:

### a) Conflict Map (`ConflictMap.tsx`)
- Section heading: "Conflict Map – Key Areas"
- Interactive Leaflet map centered on Cambodia border region
- Red dot markers for conflict locations (clickable to open event modal)
- Legend explaining the markers

### b) Displacement Summary (`DisplacementSummary.tsx`)
A detailed statistics card with:

**Header**: "Civilian Impact Situation" with report date

**Displacement Impact Grid** (3 columns):
- Displaced Persons count (447,509)
- Injuries Reported (77)
- Confirmed Casualties (17)

**Education Impact Grid** (3 columns):
- Schools Closed (1,091)
- Teachers Affected (11,922)
- Students Affected (254,480)

**Province Breakdown Table**: Detailed data by province with families, people, and casualties

### c) Quote Section
- Decorative section with semi-transparent flag map background
- Inspirational quote: *"United for Cambodia..."*
- Horizontal accent line divider

### d) Filter Bar
- Location filter dropdown
- Result count display
- "Submit Event" button

### e) Timeline Container
- Chronological list of conflict events
- Events grouped by date with date separators
- Clickable events that open the `EventModal`

---

## 3. Site Footer (`SiteFooter.tsx`)

Two-column grid:
- **Left**: Project name "Borderlines Archive" with disclaimer about being an independent documentation project
- **Right**: Copyright info, data sources, and "Boycott Thailand" link

---

## 4. Floating Elements & Modals

| Element | Description |
|---------|-------------|
| `ScrollDateBadge` | Appears when scrolling through timeline, shows current date in view |
| `EventModal` | Opens when clicking a timeline event or map marker |
| `SubmitEventModal` | Form to submit new events |
| **Floating Mobile Button** | Fixed bottom-right "Donation Map" button (mobile only) |

---

## Visual Flow Diagram

```
┌─────────────────────────────────────────┐
│        STICKY HEADER (nav bar)          │
│  [Live Badge] [Date Range]    [CTA btn] │
│  Title + Subtitle                       │
├─────────────────────────────────────────┤
│                                         │
│         🗺️ CONFLICT MAP                 │
│        (Leaflet interactive map)        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│      📊 DISPLACEMENT SUMMARY            │
│   [Stats Cards] [Education Impact]      │
│   [Province Breakdown Table]            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│          💬 QUOTE SECTION               │
│       (with flag background)            │
│                                         │
├─────────────────────────────────────────┤
│         🔍 FILTER BAR                   │
├─────────────────────────────────────────┤
│                                         │
│         📅 TIMELINE                     │
│   [Date Separator]                      │
│   [Event Card] [Event Card]...          │
│                                         │
├─────────────────────────────────────────┤
│           FOOTER                        │
│   [Project Info]     [Copyright/Links]  │
└─────────────────────────────────────────┘

+ Floating: Mobile Donation Button (bottom-right)
+ Overlays: Scroll Date Badge, Event Modal, Submit Modal
```

