import { useState } from 'react'
import {
  HeadingField,
  ButtonWidget,
  TextField,
  DropdownField,
  CheckboxField,
  SwitchField,
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

function FormulaDropdown({ label, options, placeholder, disabled }: { label?: string; options: string[]; placeholder?: string; disabled?: boolean }) {
  const [val, setVal] = useState<string | undefined>(undefined)
  return (
    <div className={`flex gap-0.5 ${label ? 'items-end' : 'items-center'} ${disabled ? '[&_button]:bg-gray-50' : ''}`}>
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

function DailyTab() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-gray-900">Repeat every</span>
      <div className="w-20"><FormulaTextField placeholder="1" /></div>
      <span className="text-base text-gray-900">day(s)</span>
    </div>
  )
}

function WeeklyTab() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-base text-gray-900">Repeat every</span>
        <div className="w-20"><FormulaTextField placeholder="1" /></div>
        <span className="text-base text-gray-900">week(s) on</span>
      </div>
      <CheckboxField
        choiceLabels={days}
        choiceValues={days}
        value={selectedDays}
        onChange={setSelectedDays}
        choiceLayout="COMPACT"
        labelPosition="COLLAPSED"
        marginBelow="NONE"
      />
    </div>
  )
}

function MonthlyTab() {
  const [useNth, setUseNth] = useState(false)
  const ordinals = ['First', 'Second', 'Third', 'Fourth', 'Last']
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="[&>div]:mb-0 [&>div]:leading-none">
          <SwitchField
            value={useNth}
            onChange={setUseNth}
            labelPosition="COLLAPSED"
            marginBelow="NONE"
            size="SMALL"
          />
        </div>
        <span className="text-base text-gray-900">Use nth weekday pattern</span>
      </div>
      {!useNth ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-base text-gray-900">Day</span>
            <div className="w-20"><FormulaTextField placeholder="1" /></div>
            <span className="text-base text-gray-900">of every</span>
            <div className="w-20"><FormulaTextField placeholder="1" /></div>
            <span className="text-base text-gray-900">month(s)</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <FormulaDropdown label="Occurrence" options={ordinals} placeholder="Select..." />
            <FormulaDropdown label="Day of week" options={weekdays} placeholder="Select..." />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base text-gray-900">Every</span>
            <div className="w-20"><FormulaTextField placeholder="1" /></div>
            <span className="text-base text-gray-900">month(s)</span>
          </div>
        </div>
      )}
    </div>
  )
}

function YearlyTab() {
  const [useNth, setUseNth] = useState(false)
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const ordinals = ['First', 'Second', 'Third', 'Fourth', 'Last']
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="[&>div]:mb-0 [&>div]:leading-none">
          <SwitchField
            value={useNth}
            onChange={setUseNth}
            labelPosition="COLLAPSED"
            marginBelow="NONE"
            size="SMALL"
          />
        </div>
        <span className="text-base text-gray-900">Use nth weekday pattern</span>
      </div>
      {!useNth ? (
        <div className="grid grid-cols-2 gap-3">
          <FormulaDropdown label="Month" options={months} placeholder="Select..." />
          <FormulaTextField label="Day" placeholder="1" />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <FormulaDropdown label="Occurrence" options={ordinals} placeholder="Select..." />
            <FormulaDropdown label="Day of week" options={weekdays} placeholder="Select..." />
            <FormulaDropdown label="Month" options={months} placeholder="Select..." />
          </div>
        </div>
      )}
    </div>
  )
}

function IntervalTab() {
  const units = ['Minutes', 'Hours']
  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-gray-900">Repeat every</span>
      <div className="w-24"><FormulaTextField placeholder="30" /></div>
      <div className="w-28 [&_svg.hover\:text-gray-700]:hidden">
        <DropdownField
          choiceLabels={units}
          choiceValues={units}
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

function RepeatTimerSection() {
  const [repeatType, setRepeatType] = useState('Never')
  const [useNth, setUseNth] = useState(false)
  const [useNthYearly, setUseNthYearly] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const types = ['Never', 'Daily', 'Every weekday', 'Weekly', 'Monthly', 'Yearly', 'Time interval']
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-base text-gray-900">Repeat</span>
        <div className="w-48 [&_svg.hover\:text-gray-700]:hidden">
          <DropdownField
            choiceLabels={types}
            choiceValues={types}
            value={repeatType}
            onChange={(v) => { if (v) setRepeatType(v) }}
            labelPosition="COLLAPSED"
            marginBelow="NONE"
          />
        </div>
        {(repeatType === 'Daily' || repeatType === 'Weekly' || repeatType === 'Monthly' || repeatType === 'Yearly' || repeatType === 'Time interval') && (
          <>
            <span className="text-base text-gray-900">every</span>
            <div className="w-24"><FormulaTextField placeholder="1" /></div>
          </>
        )}
        {repeatType === 'Daily' && <span className="text-base text-gray-900">day(s)</span>}
        {repeatType === 'Weekly' && <span className="text-base text-gray-900">week(s) on</span>}
        {repeatType === 'Monthly' && <span className="text-base text-gray-900">month(s) on</span>}
        {repeatType === 'Yearly' && <span className="text-base text-gray-900">year(s) on</span>}
        {repeatType === 'Time interval' && (
          <div className="w-28 [&_svg.hover\:text-gray-700]:hidden">
            <DropdownField
              choiceLabels={['Minutes', 'Hours']}
              choiceValues={['Minutes', 'Hours']}
              value="Minutes"
              labelPosition="COLLAPSED"
              marginBelow="NONE"
            />
          </div>
        )}
      </div>

      {repeatType === 'Weekly' && (
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
      )}

      {repeatType === 'Monthly' && (
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-36 [&_svg.hover\:text-gray-700]:hidden">
            <DropdownField
              choiceLabels={['Day of month', 'Day of week']}
              choiceValues={['day_of_month', 'day_of_week']}
              value={useNth ? 'day_of_week' : 'day_of_month'}
              onChange={(v) => setUseNth(v === 'day_of_week')}
              labelPosition="COLLAPSED"
              marginBelow="NONE"
            />
          </div>
          {!useNth ? (
            <div className="w-24"><FormulaTextField placeholder="1" /></div>
          ) : (
            <>
              <span className="text-base text-gray-900">the</span>
              <div className="w-28 [&_svg.hover\:text-gray-700]:hidden">
                <DropdownField choiceLabels={['First','Second','Third','Fourth','Last']} choiceValues={['First','Second','Third','Fourth','Last']} value="First" labelPosition="COLLAPSED" marginBelow="NONE" />
              </div>
              <div className="w-32 [&_svg.hover\:text-gray-700]:hidden">
                <DropdownField choiceLabels={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} choiceValues={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} value="Monday" labelPosition="COLLAPSED" marginBelow="NONE" />
              </div>
            </>
          )}
        </div>
      )}

      {repeatType === 'Yearly' && (
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-36 [&_svg.hover\:text-gray-700]:hidden">
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
              <div className="w-36 [&_svg.hover\:text-gray-700]:hidden">
                <DropdownField choiceLabels={months} choiceValues={months} value="January" labelPosition="COLLAPSED" marginBelow="NONE" />
              </div>
              <div className="w-24"><FormulaTextField placeholder="1" /></div>
            </>
          ) : (
            <>
              <span className="text-base text-gray-900">the</span>
              <div className="w-28 [&_svg.hover\:text-gray-700]:hidden">
                <DropdownField choiceLabels={['First','Second','Third','Fourth','Last']} choiceValues={['First','Second','Third','Fourth','Last']} value="First" labelPosition="COLLAPSED" marginBelow="NONE" />
              </div>
              <div className="w-32 [&_svg.hover\:text-gray-700]:hidden">
                <DropdownField choiceLabels={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} choiceValues={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} value="Monday" labelPosition="COLLAPSED" marginBelow="NONE" />
              </div>
              <span className="text-base text-gray-900">of</span>
              <div className="w-36 [&_svg.hover\:text-gray-700]:hidden">
                <DropdownField choiceLabels={months} choiceValues={months} value="January" labelPosition="COLLAPSED" marginBelow="NONE" />
              </div>
            </>
          )}
        </div>
      )}

      {repeatType !== 'Never' && repeatType !== 'Time interval' && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <FormulaTextField label="Time of Day" placeholder="09:00 AM" />
            <FormulaDropdown label="Timezone" options={timezones} placeholder="Select timezone..." />
          </div>
        </div>
      )}
    </div>
  )
}

export function TimerRecurrenceMockupsV3() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6 items-start">
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
            <li>Single "Repeat" dropdown with Never/Daily/Every weekday/Time interval options.</li>
            <li>All settings read as inline sentences (e.g., "Repeat [Daily ▾] every [___] day(s)").</li>
            <li>Day of month/week dropdown for monthly and yearly OR logic.</li>
            <li>Day toggle buttons for weekly recurrence.</li>
            <li>Formula button on all numeric inputs.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
