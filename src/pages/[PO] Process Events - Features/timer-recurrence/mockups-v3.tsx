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
  const types = ['Never', 'Daily', 'Every Weekday', 'Weekly', 'Monthly', 'Yearly', 'Interval']

  return (
    <div className="space-y-6">
      <div className="w-1/2 [&_svg.hover\:text-gray-700]:hidden">
        <DropdownField
          label="Repeat"
          choiceLabels={types}
          choiceValues={types}
          value={repeatType}
          onChange={(v) => { if (v) setRepeatType(v) }}
          required={true}
          labelPosition="ABOVE"
          marginBelow="NONE"
        />
      </div>

      {repeatType !== 'Never' && (
        <>
          <div>
            {repeatType === 'Daily' && <DailyTab />}
            {repeatType === 'Weekly' && <WeeklyTab />}
            {repeatType === 'Monthly' && <MonthlyTab />}
            {repeatType === 'Yearly' && <YearlyTab />}
            {repeatType === 'Interval' && <IntervalTab />}
          </div>

          {repeatType !== 'Interval' && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <FormulaTextField label="Time of Day" placeholder="09:00 AM" />
                <FormulaDropdown label="Timezone" options={timezones} placeholder="Select timezone..." />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function TimerRecurrenceMockupsV3() {
  return (
    <div>
      <HeadingField text="Option C" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
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
            <li>Radio buttons for recurrence type — all options visible at once.</li>
            <li>Switch toggles for OR logic (weekdays only, nth weekday pattern).</li>
            <li>Form-driven grid layout with labeled fields.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
