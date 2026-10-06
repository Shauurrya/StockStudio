# StockStudio — Presentation & Viva Notes

## Project title
StockStudio: Interactive Inventory Sorting using Merge Sort and Quick Sort

## What problem does your project solve?
StockStudio organizes unsorted product inventory by price, stock quantity, or product name, making it easier to inspect products in a useful order. It also shows each sorting decision so users can understand how Merge Sort and Quick Sort work.

## Which algorithm did you use?
Merge Sort and Quick Sort. Both use divide and conquer. Merge Sort divides the list into smaller groups and merges sorted groups. Quick Sort partitions the list around a pivot and recursively sorts the two sides.

## Time complexity
Merge Sort: O(n log n) in all cases.
Quick Sort: O(n log n) best/average; O(n²) worst case.
n is the number of product records. The Quick Sort implementation uses the last product as pivot.

## Space complexity
Merge Sort uses O(n) auxiliary algorithm space.
Quick Sort uses an O(log n) recursion stack on average, O(n) in the worst case.
The animation stores extra snapshots for backward stepping, so its memory use is higher than the standard algorithms.

## 2–3 minute demonstration script
“Good morning. My prototype is StockStudio, an interactive inventory sorting system.

A store can have products entered in any order. If we want to inspect low-priced products first, identify low-stock products, or arrange names alphabetically, we need sorting. My prototype allows all three fields in ascending or descending order.

These are complete product records containing a name, price, and stock quantity. I can edit these values, add a product, remove one, or shuffle the inventory.

First I select price ascending and Merge Sort. Merge Sort splits the list into smaller groups. It then compares the front products of two sorted groups and writes the next product into a temporary buffer. Once a group is merged, it is copied back. The explanation panel tells us exactly what each step means.

I can pause, move forward one step, go backward, change the speed, and drag the timeline. The highlighted products show the current comparison or move.

Next I choose Quick Sort on the same input. Here the last product is the pivot. Products are compared with it and moved to the appropriate side. The pivot is placed in its final position, and the algorithm repeats on the remaining groups.

The comparison table shows real operation counts from both implementations. These are not execution-time measurements. Merge counts buffer writes, while Quick counts swaps, so those movement counts have different meanings.

Merge Sort is stable: products with equal sorting values keep their original order. Quick Sort is not stable. The Equal prices sample helps demonstrate this.

Merge Sort has O(n log n) time in every case. Quick Sort has O(n log n) average time, but can take O(n²) with an unbalanced pivot. The Reverse order sample illustrates this when sorting by price ascending.

Finally, the sorted table shows the organized inventory and can be downloaded as CSV. The application uses HTML, CSS, and JavaScript and runs offline without a backend.”

## Experiments to demonstrate
1. Campus store → Price → Ascending → Merge Sort → Next step.
2. Continue until a merge write; point out the left group, right group, and output buffer.
3. Jump to result; show lowest-to-highest prices.
4. Select Stock quantity → Ascending; show that low-stock products come first.
5. Equal prices → Price → Merge Sort; note that Red, Blue, Green notebooks retain their original relative order.
6. Reverse order → Price → Ascending; compare Quick with Merge. Quick makes 28 comparisons for eight products in this case.
7. Edit one price and show the trace resets to the updated input.
8. Complete sorting and export the CSV.

## Common viva questions
**Why is this inventory sorting rather than number sorting?**
The algorithms move full records. A product’s name, price, and stock stay together during every step.

**What is divide and conquer?**
Break a problem into smaller parts, solve those parts, and use their solutions to solve the original problem. Merge Sort combines sorted halves; Quick Sort first partitions around a pivot.

**What does stable mean?**
Equal sorting keys retain their original relative order. For example, two products with the same price stay in their input order under this Merge Sort.

**Why can Quick Sort become quadratic?**
A poor pivot can repeatedly create groups of sizes zero and n−1, requiring nearly n comparisons at each recursive level. A last-element pivot is vulnerable on sorted, reverse-sorted, and equal-key input.

**Is Quick Sort always faster?**
No. Performance depends on input, pivot selection, implementation, and comparison costs. This prototype compares operation counts rather than claiming a universal winner.

**Why use a temporary buffer in Merge Sort?**
The buffer builds a sorted group without overwriting products that have not yet been compared.

**What happens when two values are equal?**
Merge chooses the left product first. Quick puts values equal to the pivot into the qualifying partition, but swaps can still change their relative order.

**Are name comparisons numeric?**
No. Names are compared alphabetically, case-insensitively, using English locale comparison. Price and stock use numeric comparison.

**What are the limitations?**
The prototype handles 2–24 local product records and one sorting field at a time. It does not manage sales, authenticate users, or synchronize inventory through a database. Animation snapshots add memory overhead.

**Could it be improved?**
Add search, filtering, import, combined sorting fields, a database, and randomized or median-based pivot selection. Those additions are outside this small prototype.

## Technology
HTML, CSS, vanilla JavaScript. Algorithms execute in the browser. Local storage optionally remembers input. CSV export saves the final result. Node.js tests are included but Node is not required to run the app.
