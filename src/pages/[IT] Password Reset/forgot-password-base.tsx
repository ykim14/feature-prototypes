import { useState } from 'react'
import {
  HeadingField,
  CheckboxField,
  TextField,
  CardLayout,
  RadioButtonField,
  TabsField,
  MultipleDropdownField,
} from '@pglevy/sailwind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faBold, faItalic, faUnderline, faLink, faListUl, faListOl, faCircleInfo, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

// Type for a custom email configuration
interface CustomEmailConfig {
  id: string
  locales: string[]
  resetSubject: string
  resetBody: string
  rejectionSubject: string
  rejectionBody: string
}

/**
 * Custom Tooltip component for better hover behavior.
 * Sailwind's helpTooltip uses native title attribute which has delayed appearance.
 * This provides immediate tooltip visibility on hover.
 */
function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  
  return (
    <span 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg whitespace-nowrap max-w-xs">
          {text}
        </span>
      )}
    </span>
  )
}

/**
 * Custom RichTextEditor mockup component.
 * Sailwind does not include a rich text editor, so this is a project-specific
 * mockup component to simulate the editing experience.
 */
function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-300">
        <button type="button" className="p-1.5 rounded hover:bg-gray-200" aria-label="Bold">
          <FontAwesomeIcon icon={faBold} className="w-4 h-4" />
        </button>
        <button type="button" className="p-1.5 rounded hover:bg-gray-200" aria-label="Italic">
          <FontAwesomeIcon icon={faItalic} className="w-4 h-4" />
        </button>
        <button type="button" className="p-1.5 rounded hover:bg-gray-200" aria-label="Underline">
          <FontAwesomeIcon icon={faUnderline} className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <button type="button" className="p-1.5 rounded hover:bg-gray-200" aria-label="Link">
          <FontAwesomeIcon icon={faLink} className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <button type="button" className="p-1.5 rounded hover:bg-gray-200" aria-label="Bullet list">
          <FontAwesomeIcon icon={faListUl} className="w-4 h-4" />
        </button>
        <button type="button" className="p-1.5 rounded hover:bg-gray-200" aria-label="Numbered list">
          <FontAwesomeIcon icon={faListOl} className="w-4 h-4" />
        </button>
      </div>
      <textarea
        className="w-full p-3 min-h-[160px] resize-y text-sm focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function EmailEditor({
  subjectValue,
  onSubjectChange,
  bodyValue,
  onBodyChange,
}: {
  subjectValue: string
  onSubjectChange: (v: string) => void
  bodyValue: string
  onBodyChange: (v: string) => void
}) {
  return (
    <div>
      <TextField
        label="Subject"
        labelPosition="ABOVE"
        value={subjectValue}
        onChange={onSubjectChange}
        required={true}
        marginBelow="STANDARD"
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body <span className="text-red-600">*</span>
        </label>
        <RichTextEditor value={bodyValue} onChange={onBodyChange} />
      </div>
    </div>
  )
}

export default function ForgotPasswordBase() {
  // Option A state
  const [enabledA, setEnabledA] = useState(true)
  const [durationA, setDurationA] = useState('15')
  const [emailModeA, setEmailModeA] = useState<'default' | 'custom'>('default')
  const [activeTabA, setActiveTabA] = useState('reset')
  const [selectedLocalesA, setSelectedLocalesA] = useState<string[]>(['en-US'])
  const [sectionOpenA, setSectionOpenA] = useState(true)
  const [resetSubjectA, setResetSubjectA] = useState('Reset your password')
  const [resetBodyA, setResetBodyA] = useState(
    'You recently requested to reset your password. Click the link below to reset it. This link will expire based on the configured duration.'
  )
  const [rejectionSubjectA, setRejectionSubjectA] = useState('Password reset request denied')
  const [rejectionBodyA, setRejectionBodyA] = useState(
    'A password reset was requested for your account, but it could not be completed. This may be because your account uses LDAP or SAML authentication. Please contact your administrator for assistance.'
  )

  // Option B state
  const [enabledB, setEnabledB] = useState(true)
  const [durationB, setDurationB] = useState('15')
  const [emailModeB, setEmailModeB] = useState<'default' | 'custom'>('default')
  const [sectionOpenB, setSectionOpenB] = useState(false)
  const [customEmailsB, setCustomEmailsB] = useState<CustomEmailConfig[]>([
    {
      id: '1',
      locales: ['en-US'],
      resetSubject: 'Reset your password',
      resetBody: 'You recently requested to reset your password. Click the link below to reset it. This link will expire based on the configured duration.',
      rejectionSubject: 'Password reset request denied',
      rejectionBody: 'A password reset was requested for your account, but it could not be completed. This may be because your account uses LDAP or SAML authentication. Please contact your administrator for assistance.',
    }
  ])

  const addCustomEmailB = () => {
    setCustomEmailsB([...customEmailsB, {
      id: Date.now().toString(),
      locales: [],
      resetSubject: 'Reset your password',
      resetBody: 'You recently requested to reset your password. Click the link below to reset it. This link will expire based on the configured duration.',
      rejectionSubject: 'Password reset request denied',
      rejectionBody: 'A password reset was requested for your account, but it could not be completed. This may be because your account uses LDAP or SAML authentication. Please contact your administrator for assistance.',
    }])
  }

  const removeCustomEmailB = (id: string) => {
    setCustomEmailsB(customEmailsB.filter(e => e.id !== id))
  }

  const updateCustomEmailB = (id: string, updates: Partial<CustomEmailConfig>) => {
    setCustomEmailsB(customEmailsB.map(e => e.id === id ? { ...e, ...updates } : e))
  }

  // Get locales already used by other custom emails (for Option B)
  const getUsedLocalesB = (excludeId: string) => {
    return customEmailsB
      .filter(e => e.id !== excludeId)
      .flatMap(e => e.locales)
  }

  // Common locales supported by Appian
  const localeOptions = [
    { label: 'English (United States)', value: 'en-US' },
    { label: 'English (United Kingdom)', value: 'en-GB' },
    { label: 'Spanish (Spain)', value: 'es-ES' },
    { label: 'Spanish (Latin America)', value: 'es-419' },
    { label: 'French (France)', value: 'fr-FR' },
    { label: 'French (Canada)', value: 'fr-CA' },
    { label: 'German (Germany)', value: 'de-DE' },
    { label: 'Italian (Italy)', value: 'it-IT' },
    { label: 'Portuguese (Brazil)', value: 'pt-BR' },
    { label: 'Portuguese (Portugal)', value: 'pt-PT' },
    { label: 'Dutch (Netherlands)', value: 'nl-NL' },
    { label: 'Japanese (Japan)', value: 'ja-JP' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
    { label: 'Chinese (Traditional)', value: 'zh-TW' },
    { label: 'Korean (Korea)', value: 'ko-KR' },
  ]

  return (
    <div className="space-y-6">
      {/* Option A */}
      <div>
        <button 
          onClick={() => setSectionOpenA(!sectionOpenA)} 
          className="flex items-center gap-2 py-2 text-xl font-semibold text-gray-900 hover:text-blue-500 transition-colors mb-4"
        >
          <FontAwesomeIcon icon={sectionOpenA ? faChevronDown : faChevronRight} className="w-5 h-5" />
          Option A - Low Complexity
        </button>
        {sectionOpenA && (
        <CardLayout padding="MORE" showShadow={false}>
          <HeadingField
            text="Forgot Password"
            size="LARGE"
            headingTag="H2"
            fontWeight="BOLD"
            color="#020A50"
            marginBelow="STANDARD"
          />

          <CheckboxField
            label=""
            labelPosition="COLLAPSED"
            choiceLabels={['Enable Forgot Password from Sign-In Page']}
            choiceValues={['enabled']}
            value={enabledA ? ['enabled'] : []}
            onChange={(values) => setEnabledA(values.includes('enabled'))}
            instructions="When enabled, a link will appear on the Appian sign-in page that allows users who have forgotten their password to send themselves a password reset email. Only users authenticating through Appian (not LDAP or SAML) will receive password reset emails. Passwords are not reset until the link is followed and the password reset form completed, meaning a user cannot reset another user's password."
            marginBelow="STANDARD"
          />

          {enabledA && (
            <>
              <TextField
                label="Password Reset Link Duration (Minutes)"
                labelPosition="ABOVE"
                value={durationA}
                onChange={(val) => setDurationA(val)}
                required={true}
                instructions="The amount of time in minutes that the password reset link is valid. The maximum allowed value is 1440 (24 hours). The minimum allowed value is 1. Changes to this value are applied retroactively to existing links."
                marginBelow="STANDARD"
              />

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-700">Password Reset Email</span>
                  <Tooltip text="Default password reset emails are translated for all supported locales. Custom emails require manual translation.">
                    <FontAwesomeIcon icon={faCircleInfo} className="w-4 h-4 text-blue-500 cursor-help" />
                  </Tooltip>
                </div>
                <RadioButtonField
                  label=""
                  labelPosition="COLLAPSED"
                  choiceLabels={['Default', 'Custom']}
                  choiceValues={['default', 'custom']}
                  value={emailModeA}
                  onChange={(val) => setEmailModeA(val as 'default' | 'custom')}
                  choiceLayout="COMPACT"
                  marginBelow="NONE"
                />
              </div>

              {emailModeA === 'custom' && (
                <>
                  <MultipleDropdownField
                    label="Apply Custom Email to Locales"
                    labelPosition="ABOVE"
                    placeholder="Select locales..."
                    choiceLabels={localeOptions.map(opt => opt.label)}
                    choiceValues={localeOptions.map(opt => opt.value)}
                    value={selectedLocalesA}
                    onChange={setSelectedLocalesA}
                    instructions="Select which locales will use this custom email. All other locales will use the default translated email."
                    marginBelow="STANDARD"
                  />

                  <TabsField
                    tabs={[
                      {
                        value: 'reset',
                        label: 'Password Reset Email',
                        content: (
                          <div className="pt-4">
                            <EmailEditor
                              subjectValue={resetSubjectA}
                              onSubjectChange={setResetSubjectA}
                              bodyValue={resetBodyA}
                              onBodyChange={setResetBodyA}
                            />
                          </div>
                        ),
                      },
                      {
                        value: 'rejection',
                        label: 'Password Reset Rejection Email',
                        content: (
                          <div className="pt-4">
                            <EmailEditor
                              subjectValue={rejectionSubjectA}
                              onSubjectChange={setRejectionSubjectA}
                              bodyValue={rejectionBodyA}
                              onBodyChange={setRejectionBodyA}
                            />
                          </div>
                        ),
                      },
                    ]}
                    value={activeTabA}
                    onValueChange={setActiveTabA}
                    marginBelow="STANDARD"
                  />
                </>
              )}
            </>
          )}
        </CardLayout>
        )}
      </div>

      {/* Option B */}
      <div>
        <button 
          onClick={() => setSectionOpenB(!sectionOpenB)} 
          className="flex items-center gap-2 py-2 text-xl font-semibold text-gray-900 hover:text-blue-500 transition-colors mb-4"
        >
          <FontAwesomeIcon icon={sectionOpenB ? faChevronDown : faChevronRight} className="w-5 h-5" />
          Option B - Mid Complexity
        </button>
        {sectionOpenB && (
        <CardLayout padding="MORE" showShadow={false}>
          <HeadingField
            text="Forgot Password"
            size="LARGE"
            headingTag="H2"
            fontWeight="BOLD"
            color="#020A50"
            marginBelow="STANDARD"
          />

          <CheckboxField
            label=""
            labelPosition="COLLAPSED"
            choiceLabels={['Enable Forgot Password from Sign-In Page']}
            choiceValues={['enabled']}
            value={enabledB ? ['enabled'] : []}
            onChange={(values) => setEnabledB(values.includes('enabled'))}
            instructions="When enabled, a link will appear on the Appian sign-in page that allows users who have forgotten their password to send themselves a password reset email. Only users authenticating through Appian (not LDAP or SAML) will receive password reset emails. Passwords are not reset until the link is followed and the password reset form completed, meaning a user cannot reset another user's password."
            marginBelow="STANDARD"
          />

          {enabledB && (
            <>
              <TextField
                label="Password Reset Link Duration (Minutes)"
                labelPosition="ABOVE"
                value={durationB}
                onChange={(val) => setDurationB(val)}
                required={true}
                instructions="The amount of time in minutes that the password reset link is valid. The maximum allowed value is 1440 (24 hours). The minimum allowed value is 1. Changes to this value are applied retroactively to existing links."
                marginBelow="STANDARD"
              />

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-700">Password Reset Email</span>
                  <Tooltip text="Default password reset emails are translated for all supported locales. Custom emails require manual translation.">
                    <FontAwesomeIcon icon={faCircleInfo} className="w-4 h-4 text-blue-500 cursor-help" />
                  </Tooltip>
                </div>
                <RadioButtonField
                  label=""
                  labelPosition="COLLAPSED"
                  choiceLabels={['Default', 'Custom']}
                  choiceValues={['default', 'custom']}
                  value={emailModeB}
                  onChange={(val) => setEmailModeB(val as 'default' | 'custom')}
                  choiceLayout="COMPACT"
                  marginBelow="NONE"
                />
              </div>

              {emailModeB === 'custom' && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600">
                    Configure custom emails for specific locales. Locales not assigned to a custom email will use the default translated email.
                  </p>

                  {customEmailsB.map((config, index) => {
                    const usedLocales = getUsedLocalesB(config.id)
                    const availableLocales = localeOptions.filter(opt => !usedLocales.includes(opt.value))
                    
                    return (
                      <div key={config.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-semibold text-gray-700">Custom Email {index + 1}</span>
                          {customEmailsB.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCustomEmailB(config.id)}
                              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                            >
                              <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                              Remove
                            </button>
                          )}
                        </div>

                        <MultipleDropdownField
                          label="Apply to Locales"
                          labelPosition="ABOVE"
                          placeholder="Select locales..."
                          choiceLabels={availableLocales.map(opt => opt.label)}
                          choiceValues={availableLocales.map(opt => opt.value)}
                          value={config.locales}
                          onChange={(locales) => updateCustomEmailB(config.id, { locales })}
                          instructions="Select which locales will use this custom email."
                          marginBelow="STANDARD"
                        />

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Password Reset Email</h4>
                            <EmailEditor
                              subjectValue={config.resetSubject}
                              onSubjectChange={(v) => updateCustomEmailB(config.id, { resetSubject: v })}
                              bodyValue={config.resetBody}
                              onBodyChange={(v) => updateCustomEmailB(config.id, { resetBody: v })}
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Password Reset Rejection Email</h4>
                            <EmailEditor
                              subjectValue={config.rejectionSubject}
                              onSubjectChange={(v) => updateCustomEmailB(config.id, { rejectionSubject: v })}
                              bodyValue={config.rejectionBody}
                              onBodyChange={(v) => updateCustomEmailB(config.id, { rejectionBody: v })}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  <button
                    type="button"
                    onClick={addCustomEmailB}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                    Add Custom Email
                  </button>
                </div>
              )}
            </>
          )}
        </CardLayout>
        )}
      </div>
    </div>
  )
}
