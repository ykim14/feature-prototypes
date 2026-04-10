---
inclusion: fileMatch
fileMatchPattern: "src/pages/**"
---

# Available Sailwind Components

Import these from `@pglevy/sailwind`. Do not look in `src/components/` for these — they come from the npm package. Use exact names (case-sensitive).

```tsx
import { ComponentName } from '@pglevy/sailwind'
```

**Layout:** `CardLayout`, `CollapsibleSection`, `ApplicationHeader`, `SideNavAdmin`

**Display:** `HeadingField`, `RichTextDisplayField`, `TextItem`, `Icon`, `ImageField`, `MessageBanner`, `TagField`, `TagItem`, `StampField`, `ProgressBar`, `MilestoneField`

**Input:** `TextField`, `DropdownField`, `MultipleDropdownField`, `CheckboxField`, `RadioButtonField`, `SwitchField`, `ToggleField`, `SliderField`

**Actions:** `ButtonWidget`, `ButtonArrayLayout`, `DialogField`, `TabsField`

**Utility:** `FieldLabel`, `FieldWrapper`

**Total: 29 components**

Common name mistakes to avoid:
- ❌ `Button` → ✅ `ButtonWidget`
- ❌ `Card` → ✅ `CardLayout`
- ❌ `Text` → ✅ `TextItem` or `RichTextDisplayField`
- ❌ `Heading` → ✅ `HeadingField`
- ❌ `Tabs` → ✅ `TabsField`
- ❌ `Tag` → ✅ `TagField`

## Mandatory: Sailwind-Only Components

When generating prototypes and mockups, you MUST use Sailwind components listed above. Do NOT use raw HTML elements (`<input>`, `<select>`, `<button>`, `<label>`, etc.) when a Sailwind equivalent exists.

If no appropriate Sailwind component exists for a UI need, STOP and flag it to the user before writing any custom HTML or CSS. Explain what's missing and ask for approval before proceeding with a workaround.
