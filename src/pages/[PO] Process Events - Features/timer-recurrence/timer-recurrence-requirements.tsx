import { HeadingField, RichTextDisplayField, TextItem } from '@pglevy/sailwind'

export default function TimerRecurrenceFeatureCard() {
  return (
    <div className="space-y-6">
      <div>
        <HeadingField
          text="Timer Events in Autoscale: Timer Recurrence"
          size="LARGE_PLUS"
          fontWeight="BOLD"
          marginBelow="EVEN_LESS"
        />
        <RichTextDisplayField
          value={[
            <TextItem key="sub" text="Feature card for improving the timer recurrence UI." color="SECONDARY" size="MEDIUM" />,
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 items-start">
        {/* Requirements */}
        <div>
          <HeadingField text="Requirements" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5 text-base text-gray-800 leading-relaxed">
            <div>
              <p className="font-semibold mb-1">1. Dynamic Inputs</p>
              <p>Every numeric or time-based field must support a "formula" (logic/expression) rather than just a fixed integer.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">2. Recurrence Types</p>
              <p>Five distinct modes (Daily, Weekly, Monthly, Yearly, Interval) with specific sub-logic for each (e.g., "nth day of week" vs. "specific date").</p>
            </div>
            <div>
              <p className="font-semibold mb-1">3. Universal Overrides</p>
              <p>Regardless of the frequency, users can optionally specify the Time of Day and Timezone using formulas.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">4. UX Pattern: OR Logic</p>
              <p>The interface needs to handle "OR" logic (e.g., "every X days" vs. "every weekday") cleanly.</p>
            </div>
          </div>
        </div>

        {/* Current Behavior */}
        <div>
          <HeadingField text="Current Behavior" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
            {[
              { src: '/process-events/timer-recurrence/timerRecurrence-daily.png', label: 'Daily' },
              { src: '/process-events/timer-recurrence/timerRecurrence-weekly.png', label: 'Weekly' },
              { src: '/process-events/timer-recurrence/timerRecurrence-monthly.png', label: 'Monthly' },
              { src: '/process-events/timer-recurrence/timerRecurrence-yearly.png', label: 'Yearly' },
              { src: '/process-events/timer-recurrence/timerRecurrence-interval.png', label: 'Interval' },
            ].map((img) => (
              <div key={img.label}>
                <p className="text-sm font-semibold text-gray-700 mb-2">{img.label}</p>
                <img
                  src={img.src}
                  alt={`Current timer recurrence UI — ${img.label}`}
                  className="rounded border border-gray-200 w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
