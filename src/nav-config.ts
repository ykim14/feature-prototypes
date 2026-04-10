export interface NavNode {
  name: string
  path?: string          // if set, this is a clickable page (leaf)
  children?: NavNode[]   // if set, this is a folder
}

export const navTree: NavNode[] = [
  {
    name: 'Process Orchestration',
    children: [
      {
        name: 'Process Events',
        children: [
          {
            name: 'Features',
            children: [
              {
                name: 'Timer Events in Autoscale: Timer Recurrence',
                children: [
                  { name: 'Feature Card', path: '/process-events/timer-recurrence-requirements' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'UX Team',
    children: [
      {
        name: 'Sailwind Starter',
        children: [
          { name: 'Sailwind Starter Guidance', path: '/guidance' },
          { name: 'Task Dashboard', path: '/task-dashboard' },
          { name: 'Application Status', path: '/application-status' },
          { name: 'Document Review', path: '/document-review' },
        ],
      },
    ],
  },
]
