import { useState } from 'react'
import {
  HeadingField,
  ButtonWidget,
  TextField,
  DropdownField,
  CheckboxField,
  RadioButtonField,
  CardLayout,
} from '@pglevy/sailwind'

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

function FormulaTextField({ label, placeholder, disabled }: { label?: string; placeholder: string; disabled?: boolean }) {
  const [val, setVal] = useState<string | undefined>(undefined)
  return (
    <div className={`flex gap-0.5 ${label ? 'items-end' : 'items-center'} ${disabled ? '[&_input]:bg-gray-50 opacity-50' : ''}`}>
      <div className="flex-1">
        <TextField
          label={label}
          placeholder={placeholder}
          value={val ?? ''}
          onChange={(v) => setVal(v || undefined)}
          labelPosition={label ? 'ABOVE' : 'COLLAPSED'}
          marginBelow="NONE"
          disabled={disabled}
        />
      </div>
      <FormulaButton />
    </div>
  )
}

function FormulaDropdown({ label, options, placeholder, disabled, defaultValue }: { label?: string; options: string[]; placeholder?: string; disabled?: boolean; defaultValue?: string }) {
  const [val, setVal] = useState<string | undefined>(defaultValue)
  return (
    <div className={`flex gap-0.5 hide-dropdown-clear ${label ? 'items-end' : 'items-center'} ${disabled ? '[&_button]:bg-gray-50' : ''}`}>
      <div className="flex-1">
        <DropdownField
          label={label}
          choiceLabels={options}
          choiceValues={options}
          value={val}
          onChange={setVal}
          placeholder={placeholder || 'Select...'}
          labelPosition={label ? 'ABOVE' : 'COLLAPSED'}
          marginBelow="NONE"
          disabled={disabled}
        />
      </div>
      <FormulaButton />
    </div>
  )
}

const timezones = [
  "Default (process' timezone)",
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Anchorage', 'Pacific/Honolulu', 'Europe/London', 'Europe/Paris',
  'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Australia/Sydney', 'UTC',
]

function RecurrenceContent() {
  const [activeType, setActiveType] = useState('Daily')
  const [dailyUnit, setDailyUnit] = useState('days')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [useNthMonthly, setUseNthMonthly] = useState(false)
  const [useNthYearly, setUseNthYearly] = useState(false)
  const types = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Interval']
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

  return (
    <div className="space-y-6">
      <RadioButtonField
        choiceLabels={types}
        choiceValues={types}
        value={activeType}
        onChange={setActiveType}
        choiceLayout="COMPACT"
        labelPosition="COLLAPSED"
        marginAbove="STANDARD"
        marginBelow="STANDARD"
      />

      {activeType === 'Daily' && (
        <div className="flex items-center gap-2">
          <span className="text-base text-gray-900">Every</span>
          {dailyUnit === 'days' && <div className="w-24"><FormulaTextField placeholder="1" /></div>}
          <div className="w-32 hide-dropdown-clear">
            <DropdownField
              choiceLabels={['Day(s)', 'Weekday']}
              choiceValues={['days', 'weekdays']}
              value={dailyUnit}
              onChange={(v) => { if (v) setDailyUnit(v) }}
              labelPosition="COLLAPSED"
              marginBelow="NONE"
            />
          </div>
        </div>
      )}

      {activeType === 'Weekly' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-base text-gray-900">Every</span>
            <div className="w-24"><FormulaTextField placeholder="1" /></div>
            <span className="text-base text-gray-900">week(s) on</span>
          </div>
          <div className="flex gap-1.5">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d])}
                className={`px-2.5 py-1 text-xs rounded border font-medium ${selectedDays.includes(d) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeType === 'Monthly' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base text-gray-900">Every</span>
            <div className="w-24"><FormulaTextField placeholder="1" /></div>
            <span className="text-base text-gray-900">month(s) on</span>
            <div className="w-36 hide-dropdown-clear">
              <DropdownField
                choiceLabels={['Day of month', 'Day of week']}
                choiceValues={['day_of_month', 'day_of_week']}
                value={useNthMonthly ? 'day_of_week' : 'day_of_month'}
                onChange={(v) => setUseNthMonthly(v === 'day_of_week')}
                labelPosition="COLLAPSED"
                marginBelow="NONE"
              />
            </div>
            {!useNthMonthly ? (
              <div className="w-24"><FormulaTextField placeholder="1" /></div>
            ) : (
              <>
                <span className="text-base text-gray-900">the</span>
                <div className="w-28 hide-dropdown-clear">
                  <DropdownField choiceLabels={['First','Second','Third','Fourth','Last']} choiceValues={['First','Second','Third','Fourth','Last']} value="First" labelPosition="COLLAPSED" marginBelow="NONE" />
                </div>
                <div className="w-32 hide-dropdown-clear">
                  <DropdownField choiceLabels={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} choiceValues={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} value="Monday" labelPosition="COLLAPSED" marginBelow="NONE" />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeType === 'Yearly' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base text-gray-900">Every</span>
            <div className="w-24"><FormulaTextField placeholder="1" /></div>
            <span className="text-base text-gray-900">year(s) on</span>
            <div className="w-36 hide-dropdown-clear">
              <DropdownField
                choiceLabels={['Day of month', 'Day of week']}
                choiceValues={['day_of_month', 'day_of_week']}
                value={useNthYearly ? 'day_of_week' : 'day_of_month'}
                onChange={(v) => setUseNthYearly(v === 'day_of_week')}
                labelPosition="COLLAPSED"
                marginBelow="NONE"
              />
            </div>
            {!useNthYearly ? (
              <>
                <div className="w-36 hide-dropdown-clear">
                  <DropdownField choiceLabels={months} choiceValues={months} value="January" labelPosition="COLLAPSED" marginBelow="NONE" />
                </div>
                <div className="w-24"><FormulaTextField placeholder="1" /></div>
              </>
            ) : (
              <>
                <span className="text-base text-gray-900">the</span>
                <div className="w-28 hide-dropdown-clear">
                  <DropdownField choiceLabels={['First','Second','Third','Fourth','Last']} choiceValues={['First','Second','Third','Fourth','Last']} value="First" labelPosition="COLLAPSED" marginBelow="NONE" />
                </div>
                <div className="w-32 hide-dropdown-clear">
                  <DropdownField choiceLabels={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} choiceValues={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} value="Monday" labelPosition="COLLAPSED" marginBelow="NONE" />
                </div>
                <span className="text-base text-gray-900">of</span>
                <div className="w-36 hide-dropdown-clear">
                  <DropdownField choiceLabels={months} choiceValues={months} value="January" labelPosition="COLLAPSED" marginBelow="NONE" />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeType === 'Interval' && (
        <div className="flex items-center gap-2">
          <span className="text-base text-gray-900">Every</span>
          <div className="w-24"><FormulaTextField placeholder="30" /></div>
          <div className="w-28 hide-dropdown-clear">
            <DropdownField
              choiceLabels={['Minutes', 'Hours']}
              choiceValues={['Minutes', 'Hours']}
              value="Minutes"
              labelPosition="COLLAPSED"
              marginBelow="NONE"
            />
          </div>
        </div>
      )}

      {activeType !== 'Interval' && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <FormulaTextField label="Time of Day" placeholder="09:00 AM" />
            <FormulaDropdown label="Timezone" options={timezones} defaultValue="Default (process' timezone)" />
          </div>
        </div>
      )}
    </div>
  )
}

function RepeatTimerSection() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <CheckboxField
        choiceLabels={['Repeat node']}
        choiceValues={[true]}
        value={enabled ? [true] : []}
        onChange={(val) => setEnabled(val.length > 0)}
        labelPosition="COLLAPSED"
        marginBelow="NONE"
      />
      {enabled && <div className="ml-6"><RecurrenceContent /></div>}
    </div>
  )
}

export function TimerRecurrenceMockupsV2() {
  return (
    <div>
      <div className="grid grid-cols-[700px_1fr] gap-6 items-start">
        <CardLayout padding="NONE" showShadow={false} shape="SQUARED">
          <div className="px-6 py-4 border-b border-gray-200">
            <HeadingField text="Timer Event" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="NONE" />
          </div>
          <div className="p-6 overflow-y-auto" style={{ height: '350px' }}>
            <RepeatTimerSection />
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <ButtonWidget label="CANCEL" style="OUTLINE" color="ACCENT" size="SMALL" className="rounded-none" />
            <ButtonWidget label="OK" style="SOLID" color="ACCENT" size="SMALL" className="rounded-none" />
          </div>
        </CardLayout>
        <div className="text-sm text-gray-500 space-y-2">
          <p className="font-semibold text-gray-700">Design Notes</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Checkbox to enable repeat, radio buttons for frequency selection.</li>
            <li>Inline sentence-style settings for all recurrence types.</li>
            <li>Day(s)/Weekday dropdown for daily OR logic.</li>
            <li>Day of month/week dropdown for monthly and yearly OR logic.</li>
            <li>Day toggle buttons for weekly recurrence.</li>
            <li>Formula button on all numeric inputs.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
