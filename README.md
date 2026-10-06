# StockStudio — Interactive Inventory Sorting Lab

A complete working DAA prototype using **Merge Sort and Quick Sort** to organize product records by price, stock quantity, or product name.

## Run it
1. Extract the entire ZIP.
2. Open the **StockStudio** folder.
3. Double-click **index.html** in Chrome, Edge, or Firefox.

No installation, internet, backend, or API key is needed. Keep all four application files together. Extract first: do not open the HTML directly inside the ZIP viewer.

Optional: run `python -m http.server 8000` in this folder and visit http://localhost:8000. This folder can also be uploaded to a static website host without a build step.

## Simple walkthrough
1. Choose Campus store, Reverse order, or Equal prices.
2. Edit product names, prices, and stock quantities, or add a product.
3. Pick Price, Stock quantity, or Product name and Ascending/Descending.
4. Choose Merge Sort or Quick Sort.
5. Click **Start guided sorting** to move to the animation.
6. Use **Next step** for explanations, **Play/Pause** for animation, **Back** to revisit, and the timeline to inspect any step.
7. Use **Jump to result** to show the sorted table immediately.
8. Download the sorted inventory as CSV.

All input changes stop playback and reset the trace. The editable table is your original input; the simulator and result table show the algorithm’s output. Input order is preserved for repeatable algorithm comparisons.

## What users can do
- Edit, add, remove, and shuffle complete product records.
- Sort by three fields in either direction.
- Observe Merge Sort splits, comparisons, buffer writes, and merged groups.
- Observe Quick Sort pivots, comparisons, swaps, and partition positions.
- Scrub, step backward, restart, pause, and change animation speed.
- Compare actual comparisons and movement counts on the same input.
- Inspect final results and export a spreadsheet-friendly CSV.
- Read clear algorithm explanations and complexity tables.
- Resume their last inventory when browser local storage is available.

## Input limits
2–24 products; names 1–30 characters; prices ₹0–99,999 with up to two decimals; stock 0–9,999 whole units. Price sorting is numeric. Name sorting is case-insensitive using English locale comparison. Empty names and invalid numeric input are rejected. Removal stops at two products.

## Algorithm details
### Merge Sort
Recursive top-down split and merge. Ties choose the left product, preserving original order. During a merge, writes appear in a temporary output buffer; the main row changes only when that group has been fully merged. This keeps every visible main-row snapshot a complete inventory with no duplicated or missing records.

Standard time: O(n log n), best/average/worst. Auxiliary space: O(n). Counter: comparisons between field values, and writes into the temporary buffer. Final copy-back assignments are not included in the displayed buffer-write count.

### Quick Sort
Lomuto partition with the last product in the current range as pivot. For ascending order, values less than or equal to the pivot move to the left; descending reverses the comparison. Self-swaps are not counted. This implementation is not stable.

Standard time: O(n log n) best/average, O(n²) worst. Auxiliary recursion stack: O(log n) average, O(n) worst. Counter: field comparisons and swaps between different positions.

The two movement counters describe different operations; they are not equivalent costs. No fabricated runtime benchmark is shown. Numeric complexities count comparisons; sorting long names additionally involves string-comparison costs.

### Animation overhead
The app stores snapshots so users can go backward and scrub. That increases the teaching app's memory use beyond the standard algorithms: up to O(n² log n) snapshot space for Merge and O(n³) for Quick in the worst case. The 24-product limit keeps the interactive demonstration manageable.

## Tests
Node.js is optional and used only to run tests:

```
node tests/algorithms.test.js
node tests/interface.test.js
```

The algorithm suite checks 1,208 cases across both algorithms, all fields and directions, stable ties, record preservation in every snapshot, merge-buffer ordering, and the Quick Sort worst-case comparison count. The interface suite checks interaction handlers using a DOM mock: navigation, stepping, backward movement, timeline, Play/Pause, completion, editing, custom records, validation, export, and reset.

JavaScript syntax checks and these suites passed. A real browser visual/accessibility test was unavailable in the build environment. DOM-mock checks do not verify pixel layout or replace browser testing.

## Files
- index.html — interface and learning content
- styles.css — responsive layout and visual design
- app.js — inventory controls, animation, persistence, CSV export
- algorithms.js — actual Merge Sort and Quick Sort, with recorded decisions
- EVALUATION.md — presentation script and viva answers
- tests/ — algorithm and interface checks

## Scope
This is a sorting and algorithm-learning prototype, not a complete inventory management system. It does not track sales, synchronize multiple users, connect a database, or support a combined multi-field comparator. Browser storage is local to that browser; CSV exports provide a portable result.
