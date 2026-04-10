import { useState } from 'react'
import {
  HeadingField,
  RichTextDisplayField,
  TextItem,
  ButtonWidget,
  TextField,
  DropdownField,
  CheckboxField,
  SwitchField,
  CardLayout,
  TabsField,
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
    <div className={`flex gap-0.5 ${label ? 'items-end' : 'items-center'}`}>
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
          disabled={disabled}
        />
      </div>
      <FormulaButton />
    </div>
  )
}

function DailyTab() {
  const [weekdaysOnly, setWeekdaysOnly] = useState(false)
  return (
    <div className="space-y-4">
      <FormulaTextField label="Repeat every ___ day(s)" placeholder="1" disabled={weekdaysOnly} />
      <SwitchField
        label="Weekdays only"
        labelPosition="ADJACENT"
        value={weekdaysOnly}
        onChange={setWeekdaysOnly}
        marginBelow="NONE"
      />
    </div>
  )
}

function WeeklyTab() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  return (
    <div className="space-y-4">
      <FormulaTextField label="Repeat every ___ week(s)" placeholder="1" />
      <CheckboxField
        label="On these days"
        choiceLabels={days}
        choiceValues={days}
        value={selectedDays}
        onChange={setSelectedDays}
        choiceLayout="COMPACT"
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
      <SwitchField
        label="Use nth weekday pattern"
        labelPosition="ADJACENT"
        value={useNth}
        onChange={setUseNth}
        marginBelow="NONE"
      />
      {!useNth ? (
        <div className="grid grid-cols-2 gap-3">
          <FormulaTextField label="Day of month" placeholder="1" />
          <FormulaTextField label="Every ___ month(s)" placeholder="1" />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <FormulaDropdown label="Occurrence" options={ordinals} placeholder="Select..." />
            <FormulaDropdown label="Day of week" options={weekdays} placeholder="Select..." />
          </div>
          <FormulaTextField label="Every ___ month(s)" placeholder="1" />
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
      <SwitchField
        label="Use nth weekday pattern"
        labelPosition="ADJACENT"
        value={useNth}
        onChange={setUseNth}
        marginBelow="NONE"
      />
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
    <div className="grid grid-cols-2 gap-3">
      <FormulaTextField label="Repeat every" placeholder="30" />
      <FormulaDropdown label="Unit" options={units} placeholder="Select..." />
    </div>
  )
}

const timezones = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Anchorage', 'Pacific/Honolulu', 'Europe/London', 'Europe/Paris',
  'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Australia/Sydney', 'UTC',
]

function RecurrenceContent() {
  const [activeTab, setActiveTab] = useState(0)
  const tabLabels = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Interval']

  return (
    <div className="space-y-4">
      <TabsField
        tabs={tabLabels.map((label, i) => ({
          label,
          content: null,
          isActive: i === activeTab,
        }))}
        onTabChange={setActiveTab}
        marginBelow="NONE"
      />

      <div>
        {activeTab === 0 && <DailyTab />}
        {activeTab === 1 && <WeeklyTab />}
        {activeTab === 2 && <MonthlyTab />}
        {activeTab === 3 && <YearlyTab />}
        {activeTab === 4 && <IntervalTab />}
      </div>

      {activeTab !== 4 && (
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

function RepeatTimerSection() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="space-y-4">
      <SwitchField
        label="Repeat Timer Event"
        labelPosition="ADJACENT"
        value={enabled}
        onChange={setEnabled}
        marginBelow="NONE"
      />
      {enabled && <RecurrenceContent />}
    </div>
  )
}

export default function TimerRecurrenceMockupsV2() {
  return (
    <div className="space-y-6">
      <div>
        <HeadingField
          text="Timer Recurrence — Mockup V2"
          size="LARGE_PLUS"
          fontWeight="BOLD"
          marginBelow="EVEN_LESS"
        />
        <RichTextDisplayField
          value={[
            <TextItem key="sub" text="Alternative design using tabs and switches instead of dropdowns and radio buttons." color="SECONDARY" size="MEDIUM" />,
          ]}
        />
      </div>

      <div className="max-w-2xl">
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
      </div>

      <div className="max-w-lg text-sm text-gray-500 space-y-2">
        <p className="font-semibold text-gray-700">Design Notes</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Tabs replace the dropdown for recurrence type selection — all options visible at once.</li>
          <li>Switch toggle replaces checkbox for "Repeat Timer Event" and OR logic (weekdays only, nth weekday pattern).</li>
          <li>Form-driven layout with labeled fields in a grid — no inline radio+text patterns.</li>
          <li>Every numeric field and dropdown has a formula button for expression editor access.</li>
          <li>Time of Day and Timezone appear for all types except Interval.</li>
        </ul>
      </div>
    </div>
  )
}
