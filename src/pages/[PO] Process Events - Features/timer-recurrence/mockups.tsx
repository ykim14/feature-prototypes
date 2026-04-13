import { useState } from 'react'
import {
  HeadingField,
  RichTextDisplayField,
  TextItem,
  ButtonWidget,
  TextField,
  DropdownField,
  CheckboxField,
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

function FormulaTextField({ label, placeholder, disabled, value, onChange }: { label?: string; placeholder: string; disabled?: boolean; value?: string; onChange?: (v: string) => void }) {
  const [localVal, setLocalVal] = useState<string | undefined>(undefined)
  const controlled = value !== undefined && onChange !== undefined
  const displayVal = controlled ? value : (localVal ?? '')
  const handleChange = (v: string) => {
    if (controlled) {
      onChange!(v)
    } else {
      setLocalVal(v || undefined)
    }
  }
  return (
    <div className={`flex gap-0.5 ${label ? 'items-end' : 'items-center'} ${disabled ? '[&_input]:bg-gray-50 opacity-50' : ''}`}>
      <div className="flex-1">
        <TextField
          label={label}
          placeholder={placeholder}
          value={displayVal}
          onChange={handleChange}
          labelPosition={label ? 'ABOVE' : 'COLLAPSED'}
          marginBelow="NONE"
          disabled={disabled}
        />
      </div>
      <FormulaButton />
    </div>
  )
}

function FormulaDropdown({ label, options, placeholder }: { label?: string; options: string[]; placeholder?: string }) {
  const [val, setVal] = useState<string | undefined>(undefined)
  return (
    <div className={`flex gap-0.5 ${label ? 'items-end' : 'items-center'}`}>
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
        />
      </div>
      <FormulaButton />
    </div>
  )
}

function DailySettings() {
  const [mode, setMode] = useState('every_n_days')
  const [dayCount, setDayCount] = useState('')

  const switchMode = (newMode: string) => {
    if (newMode !== mode) {
      if (newMode === 'every_weekday') {
        setDayCount('')
      }
      setMode(newMode)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input type="radio" name="daily-mode" checked={mode === 'every_n_days'} onChange={() => switchMode('every_n_days')} className="h-4 w-4 shrink-0 cursor-pointer" />
        <span className="text-base text-gray-900">Every</span>
        <div className="w-24"><FormulaTextField placeholder="1" disabled={mode !== 'every_n_days'} value={dayCount} onChange={setDayCount} /></div>
        <span className="text-base text-gray-900">day(s)</span>
      </div>
      <div className="flex items-center gap-2">
        <input type="radio" name="daily-mode" checked={mode === 'every_weekday'} onChange={() => switchMode('every_weekday')} className="h-4 w-4 shrink-0 cursor-pointer" />
        <span className="text-base text-gray-900">Every weekday</span>
      </div>
    </div>
  )
}

function WeeklySettings() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (d: string) => setSelected((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-base text-gray-900">Recur every</span>
        <div className="w-24"><FormulaTextField placeholder="1" /></div>
        <span className="text-base text-gray-900">week(s) on:</span>
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
  const [dayOfMonth, setDayOfMonth] = useState('')
  const [everyNMonths1, setEveryNMonths1] = useState('')
  const [nthOrdinal, setNthOrdinal] = useState('First')
  const [nthWeekday, setNthWeekday] = useState('Monday')
  const [everyNMonths2, setEveryNMonths2] = useState('')

  const switchMode = (newMode: string) => {
    if (newMode !== mode) {
      if (newMode === 'day_of_month') {
        setNthOrdinal('First')
        setNthWeekday('Monday')
        setEveryNMonths2('')
      } else {
        setDayOfMonth('')
        setEveryNMonths1('')
      }
      setMode(newMode)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input type="radio" name="monthly-mode" checked={mode === 'day_of_month'} onChange={() => switchMode('day_of_month')} className="h-4 w-4 shrink-0 cursor-pointer" />
        <span className="text-base text-gray-900">Day</span>
        <div className="w-24"><FormulaTextField placeholder="1" disabled={mode !== 'day_of_month'} value={dayOfMonth} onChange={setDayOfMonth} /></div>
        <span className="text-base text-gray-900">of every</span>
        <div className="w-24"><FormulaTextField placeholder="1" disabled={mode !== 'day_of_month'} value={everyNMonths1} onChange={setEveryNMonths1} /></div>
        <span className="text-base text-gray-900">month(s)</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <input type="radio" name="monthly-mode" checked={mode === 'nth_weekday'} onChange={() => switchMode('nth_weekday')} className="h-4 w-4 shrink-0 cursor-pointer" />
        <span className="text-base text-gray-900">The</span>
        <div className={`w-28 [&_svg.hover\\:text-gray-700]:hidden ${mode !== 'nth_weekday' ? '[&_button]:bg-gray-50' : ''}`}>
          <DropdownField choiceLabels={['First','Second','Third','Fourth','Last']} choiceValues={['First','Second','Third','Fourth','Last']} value={nthOrdinal} onChange={setNthOrdinal} labelPosition="COLLAPSED" marginBelow="NONE" disabled={mode !== 'nth_weekday'} />
        </div>
        <div className={`w-32 [&_svg.hover\\:text-gray-700]:hidden ${mode !== 'nth_weekday' ? '[&_button]:bg-gray-50' : ''}`}>
          <DropdownField choiceLabels={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} choiceValues={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} value={nthWeekday} onChange={setNthWeekday} labelPosition="COLLAPSED" marginBelow="NONE" disabled={mode !== 'nth_weekday'} />
        </div>
        <span className="text-base text-gray-900">of every</span>
        <div className="w-24"><FormulaTextField placeholder="1" disabled={mode !== 'nth_weekday'} value={everyNMonths2} onChange={setEveryNMonths2} /></div>
        <span className="text-base text-gray-900">month(s)</span>
      </div>
    </div>
  )
}

function YearlySettings() {
  const [mode, setMode] = useState('specific_date')
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const [specificMonth, setSpecificMonth] = useState('January')
  const [specificDay, setSpecificDay] = useState('')
  const [nthOrdinal, setNthOrdinal] = useState('First')
  const [nthWeekday, setNthWeekday] = useState('Monday')
  const [nthMonth, setNthMonth] = useState('January')

  const switchMode = (newMode: string) => {
    if (newMode !== mode) {
      if (newMode === 'specific_date') {
        setNthOrdinal('First')
        setNthWeekday('Monday')
        setNthMonth('January')
      } else {
        setSpecificMonth('January')
        setSpecificDay('')
      }
      setMode(newMode)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input type="radio" name="yearly-mode" checked={mode === 'specific_date'} onChange={() => switchMode('specific_date')} className="h-4 w-4 shrink-0 cursor-pointer" />
        <span className="text-base text-gray-900">Every</span>
        <div className={`w-36 [&_svg.hover\\:text-gray-700]:hidden ${mode !== 'specific_date' ? '[&_button]:bg-gray-50' : ''}`}>
          <DropdownField choiceLabels={months} choiceValues={months} value={specificMonth} onChange={setSpecificMonth} labelPosition="COLLAPSED" marginBelow="NONE" disabled={mode !== 'specific_date'} />
        </div>
        <div className="w-24"><FormulaTextField placeholder="1" value={specificDay} onChange={setSpecificDay} disabled={mode !== 'specific_date'} /></div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <input type="radio" name="yearly-mode" checked={mode === 'nth_weekday'} onChange={() => switchMode('nth_weekday')} className="h-4 w-4 shrink-0 cursor-pointer" />
        <span className="text-base text-gray-900">The</span>
        <div className={`w-28 [&_svg.hover\\:text-gray-700]:hidden ${mode !== 'nth_weekday' ? '[&_button]:bg-gray-50' : ''}`}>
          <DropdownField choiceLabels={['First','Second','Third','Fourth','Last']} choiceValues={['First','Second','Third','Fourth','Last']} value={nthOrdinal} onChange={setNthOrdinal} labelPosition="COLLAPSED" marginBelow="NONE" disabled={mode !== 'nth_weekday'} />
        </div>
        <div className={`w-32 [&_svg.hover\\:text-gray-700]:hidden ${mode !== 'nth_weekday' ? '[&_button]:bg-gray-50' : ''}`}>
          <DropdownField choiceLabels={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} choiceValues={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']} value={nthWeekday} onChange={setNthWeekday} labelPosition="COLLAPSED" marginBelow="NONE" disabled={mode !== 'nth_weekday'} />
        </div>
        <span className="text-base text-gray-900">of</span>
        <div className={`w-36 [&_svg.hover\\:text-gray-700]:hidden ${mode !== 'nth_weekday' ? '[&_button]:bg-gray-50' : ''}`}>
          <DropdownField choiceLabels={months} choiceValues={months} value={nthMonth} onChange={setNthMonth} labelPosition="COLLAPSED" marginBelow="NONE" disabled={mode !== 'nth_weekday'} />
        </div>
      </div>
    </div>
  )
}

function IntervalSettings() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-gray-900">Every</span>
      <div className="w-24"><FormulaTextField placeholder="30" /></div>
      <div className="w-28 [&_svg.hover\:text-gray-700]:hidden">
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
      <div className="w-1/3 [&_svg.hover\:text-gray-700]:hidden">
        <DropdownField
          choiceLabels={types}
          choiceValues={types}
          value={type}
          onChange={(v) => { if (v) setType(v) }}
          placeholder="Daily"
          required={true}
          labelPosition="COLLAPSED"
          marginBelow="NONE"
        />
      </div>

      <div>
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
        choiceLabels={['Repeat Timer Event']}
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

import { TimerRecurrenceMockupsV2 } from './mockups-v2'
import { TimerRecurrenceMockupsV3 } from './mockups-v3'

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
            <TextItem key="sub" text="Interactive prototypes for the repeat timer configuration." color="SECONDARY" size="MEDIUM" />,
          ]}
        />
      </div>

      <div className="space-y-10">
        {/* V1 */}
        <div>
          <HeadingField text="Option A" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
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
                <li>Dropdown for recurrence type selection.</li>
                <li>Inline radio buttons with input fields for OR logic.</li>
                <li>Disabled state on unselected radio option fields.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* V2 */}
        <TimerRecurrenceMockupsV2 />

        {/* V3 */}
        <TimerRecurrenceMockupsV3 />
      </div>
    </div>
  )
}
