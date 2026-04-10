export interface NavPage {
  title: string
  path: string
}

export interface NavFeature {
  name: string
  version?: string
  pages: NavPage[]
}

export interface NavTeam {
  name: string
  features: NavFeature[]
}

export const navTree: NavTeam[] = [
  {
    name: 'Process Orchestration',
    features: [
      {
        name: 'Process Events',
        pages: [],
      },
    ],
  },
  {
    name: 'UX Team',
    features: [
      {
        name: 'Sailwind Starter',
        pages: [
          { title: 'Sailwind Starter Guidance', path: '/guidance' },
          { title: 'Task Dashboard', path: '/task-dashboard' },
          { title: 'Application Status', path: '/application-status' },
          { title: 'Document Review', path: '/document-review' },
        ],
      },
    ],
  },
]
