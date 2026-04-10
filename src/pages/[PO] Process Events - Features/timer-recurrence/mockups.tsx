import { useState } from 'react'
import {
  HeadingField,
  RichTextDisplayField,
  TextItem,
  ButtonWidget,
  TextField,
  DropdownField,
  CheckboxField,
  RadioButtonField,
  CardLayout,
} from '@pglevy/sailwind'

type RecurrenceType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | 'Interval'

function FormulaButton() {
  return (
    <ButtonWidget
      icon="square-pen"
      style="LINK"
      color="ACCENT"
      size="SMALL"
      tooltip="Open expression editor"
    />
  )
}

function FormulaTextField({ label, placeholder }: { label?: string; placeholder: string }) {
  const [val, setVal] = useState('')
  return (
    <div className="flex items-end gap-0.5">
      <div className="flex-1">
        <TextField
          label={label}
          placeholder={placeholder}
          value={val}
          onChange={setVal}
          labelPosition={label ? 'ABOVE' : 'COLLAPSED'}
          marginBelow="NONE"
        />
      </div>
      <FormulaButton />
    </div>
  )
}

function FormulaDropdown({ label, options }: { label?: string; options: string[] }) {
  const [val, setVal] = useState(options[0])
  return (
    <div className="flex items-end gap-0.5">
      <div className="flex-1">
        <DropdownField
          label={label}
          choiceLabels={options}
          choiceValues={options}
          value={val}
          onChange={setVal}
          labelPosition={label ? 'ABOVE' : 'COLLAPSED'}
          marginBelow="NONE"
        />
      </div>
      <FormulaButton />
    </div>
  )
}

function DailySettings() {
  const [mode, setMode] = useState('every_n_days')
  return (
    <div className="space-y-3">
      <RadioButtonField
        choiceLabels={['Every ___ day(s)', 'Every weekday']}
        choiceValues={['every_n_days', 'every_weekday']}
        value={mode}
        onChange={setMode}
        labelPosition="COLLAPSED"
        choiceLayout="STACKED"
        marginBelow="NONE"
      />
      {mode === 'every_n_days' && (
        <div className="ml-6 w-24">
          <FormulaTextField placeholder="1" />
        </div>
      )}
    </div>
  )
}

function WeeklySettings() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (d: string) => setSelected((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d])

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2">
        <span className="text-sm text-gray-700 pb-2">Recur every</span>
        <div className="w-20"><FormulaTextField placeholder="1" /></div>
        <span className="text-sm text-gray-600 pb-2">week(s) on:</span>
      </div>
      <div className="flex gap-1.5">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => toggle(d)}
            className={`px-2.5 py-1 text-xs rounded border font-medium ${selected.includes(d) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  )
}

function MonthlySettings() {
  const [mode, setMode] = useState('day_of_month')
  return (
    <div className="space-y-3">
      <RadioButtonField
        choiceLabels={['Day ___ of every ___ month(s)', 'The [nth] [weekday] of every ___ month(s)']}
        choiceValues={['day_of_month', 'nth_weekday']}
        value={mode}
        onChange={setMode}
        labelPosition="COLLAPSED"
        choiceLayout="STACKED"
        marginBelow="NONE"
      />
      {mode === 'day_of_month' && (
        <div className="ml-6 flex items-end gap-2">
          <span className="text-sm text-gray-700 pb-2">Day</span>
          <div className="w-16"><FormulaTextField placeholder="1" /></div>
          <span className="text-sm text-gray-600 pb-2">of every</span>
          <div className="w-16"><FormulaTextField placeholder="1" /></div>
          <span className="text-sm text-gray-600 pb-2">month(s)</span>
        </div>
      )}
      {mode === 'nth_weekday' && (
        <div className="ml-6 flex items-end gap-2 flex-wrap">
          <span className="text-sm text-gray-700 pb-2">The</span>
          <div className="w-28">
            <DropdownField
              choiceLabels={['First', 'Second', 'Third', 'Fourth', 'Last']}
              choiceValues={['First', 'Second', 'Third', 'Fourth', 'Last']}
              value="First"
              labelPosition="COLLAPSED"
              marginBelow="NONE"
            />
          </div>
          <div className="w-32">
            <DropdownField
              choiceLabels={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
              choiceValues={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
              value="Monday"
              labelPosition="COLLAPSED"
              marginBelow="NONE"
            />
          </div>
          <span className="text-sm text-gray-600 pb-2">of every</span>
          <div className="w-16"><FormulaTextField placeholder="1" /></div>
          <span className="text-sm text-gray-600 pb-2">month(s)</span>
        </div>
      )}
    </div>
  )
}

function YearlySettings() {
  const [mode, setMode] = useState('specific_date')
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return (
    <div className="space-y-3">
      <RadioButtonField
        choiceLabels={['Every [month] [day]', 'The [nth] [weekday] of [month]']}
        choiceValues={['specific_date', 'nth_weekday']}
        value={mode}
        onChange={setMode}
        labelPosition="COLLAPSED"
        choiceLayout="STACKED"
        marginBelow="NONE"
      />
      {mode === 'specific_date' && (
        <div className="ml-6 flex items-end gap-2">
          <span className="text-sm text-gray-700 pb-2">Every</span>
          <div className="w-36">
            <DropdownField choiceLabels={months} choiceValues={months} value="January" labelPosition="COLLAPSED" marginBelow="NONE" />
          </div>
          <div className="w-16"><FormulaTextField placeholder="1" /></div>
        </div>
      )}
      {mode === 'nth_weekday' && (
        <div className="ml-6 flex items-end gap-2 flex-wrap">
          <span className="text-sm text-gray-700 pb-2">The</span>
          <div className="w-28">
            <DropdownField choiceLabels={['First','Second','Third','Fourth','Last']} choiceValues={['First','Second','Third','Fourth','Last']} value="First" labelPosition="COLLAPSED" marginBelow="NONE" />
          </div>
          <div className="w-32">
            <DropdownField choiceLabels={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} choiceValues={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} value="Monday" labelPosition="COLLAPSED" marginBelow="NONE" />
          </div>
          <span className="text-sm text-gray-600 pb-2">of</span>
          <div className="w-36">
            <DropdownField choiceLabels={months} choiceValues={months} value="January" labelPosition="COLLAPSED" marginBelow="NONE" />
          </div>
        </div>
      )}
    </div>
  )
}

function IntervalSettings() {
  return (
    <div className="flex items-end gap-2">
      <span className="text-sm text-gray-700 pb-2">Every</span>
      <div className="w-20"><FormulaTextField placeholder="30" /></div>
      <div className="w-28">
        <DropdownField
          choiceLabels={['Minutes', 'Hours']}
          choiceValues={['Minutes', 'Hours']}
          value="Minutes"
          labelPosition="COLLAPSED"
          marginBelow="NONE"
        />
      </div>
    </div>
  )
}

const timezones = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Anchorage', 'Pacific/Honolulu', 'Europe/London', 'Europe/Paris',
  'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Australia/Sydney', 'UTC',
]

function RecurrenceSettings() {
  const [type, setType] = useState('Daily')
  const types = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Interval']

  return (
    <div className="space-y-4">
      <DropdownField
        label="Repeat"
        choiceLabels={types}
        choiceValues={types}
        value={type}
        onChange={setType}
        labelPosition="ABOVE"
        marginBelow="NONE"
      />

      <div className="border-l-2 border-blue-200 pl-4">
        {type === 'Daily' && <DailySettings />}
        {type === 'Weekly' && <WeeklySettings />}
        {type === 'Monthly' && <MonthlySettings />}
        {type === 'Yearly' && <YearlySettings />}
        {type === 'Interval' && <IntervalSettings />}
      </div>

      {type !== 'Interval' && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <FormulaTextField label="Time of Day" placeholder="09:00 AM" />
            <FormulaDropdown label="Timezone" options={timezones} />
          </div>
        </div>
      )}
    </div>
  )
}

function RepeatTimerSection() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="space-y-3">
      <CheckboxField
        choiceLabels={['Repeat timer']}
        choiceValues={[true]}
        value={enabled ? [true] : []}
        onChange={(val) => setEnabled(val.length > 0)}
        labelPosition="COLLAPSED"
        marginBelow="NONE"
      />
      {enabled && (
        <div className="ml-6 mt-2">
          <RecurrenceSettings />
        </div>
      )}
    </div>
  )
}

export default function TimerRecurrenceMockups() {
  return (
    <div className="space-y-6">
      <div>
        <HeadingField
          text="Timer Recurrence — Mockups"
          size="LARGE_PLUS"
          fontWeight="BOLD"
          marginBelow="EVEN_LESS"
        />
        <RichTextDisplayField
          value={[
            <TextItem key="sub" text="Interactive prototype for the repeat timer configuration." color="SECONDARY" size="MEDIUM" />,
          ]}
        />
      </div>

      <div className="max-w-2xl">
        <CardLayout padding="NONE" showShadow={false} shape="SQUARED">
          <div className="px-6 py-4 border-b border-gray-200">
            <HeadingField text="Timer Event" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="NONE" />
          </div>
          <div className="p-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
            <RepeatTimerSection />
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <ButtonWidget label="CANCEL" style="OUTLINE" color="ACCENT" size="SMALL" className="rounded-none" />
            <ButtonWidget label="OK" style="SOLID" color="ACCENT" size="SMALL" className="rounded-none" />
          </div>
        </CardLayout>
      </div>

      <div className="max-w-lg text-sm text-gray-500 space-y-2">
        <p className="font-semibold text-gray-700">Design Notes</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Every numeric field has a formula button that opens the expression editor dialog.</li>
          <li>Five recurrence types: Daily, Weekly, Monthly, Yearly, Interval — each with contextual sub-options.</li>
          <li>Daily and Monthly use radio buttons for OR logic (e.g., "every N days" vs. "every weekday").</li>
          <li>Time of Day and Timezone appear for all types except Interval.</li>
          <li>The entire section is hidden behind a "Repeat timer" checkbox to save space.</li>
        </ul>
      </div>
    </div>
  )
}
