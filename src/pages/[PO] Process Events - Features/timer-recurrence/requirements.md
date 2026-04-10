# Timer Events in Autoscale: Timer Recurrence

## Requirements

### REQ-1: Dynamic Inputs
Every numeric or time-based field must support a "formula" (logic/expression) rather than just a fixed integer.

### REQ-2: Recurrence Types
Five distinct modes (Daily, Weekly, Monthly, Yearly, Interval) with specific sub-logic for each (e.g., "nth day of week" vs. "specific date").

### REQ-3: Universal Overrides
Regardless of the frequency, users can optionally specify the Time of Day and Timezone using formulas.

### REQ-4: UX Pattern — OR Logic
The interface needs to handle "OR" logic (e.g., "every X days" vs. "every weekday") cleanly.
