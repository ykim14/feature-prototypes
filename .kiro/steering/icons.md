# Icon Usage

Always use Font Awesome icons via `@fortawesome/react-fontawesome`. Do NOT use Lucide icons or emoji characters.

## Required Packages

```
@fortawesome/fontawesome-svg-core
@fortawesome/free-solid-svg-icons
@fortawesome/react-fontawesome
```

## Usage Pattern

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faLink } from '@fortawesome/free-solid-svg-icons'

<FontAwesomeIcon icon={faBold} />
```

## Rules

- Import icons individually from `@fortawesome/free-solid-svg-icons`
- Use `<FontAwesomeIcon>` component for rendering
- Do NOT use Lucide React (`lucide-react`) for icons
- Do NOT use emoji characters for visual indicators
