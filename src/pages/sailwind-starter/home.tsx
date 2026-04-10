import { HeadingField, RichTextDisplayField, TextItem } from '@pglevy/sailwind'

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="text-center space-y-4">
        <HeadingField text="Prototypes" size="LARGE_PLUS" fontWeight="BOLD" align="CENTER" />
        <RichTextDisplayField
          value={[
            <TextItem
              key="desc"
              text="Select a prototype from the sidebar to get started."
              color="SECONDARY"
              size="MEDIUM"
            />
          ]}
        />
      </div>
    </div>
  )
}
