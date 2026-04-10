import { useState } from 'react'
import { useLocation } from 'wouter'
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
} from 'lucide-react'
import { navTree } from '../nav-config'
import type { NavTeam, NavFeature } from '../nav-config'

function FeatureFolder({ feature, currentPath }: { feature: NavFeature; currentPath: string }) {
  const hasActivePage = feature.pages.some((p) => p.path === currentPath)
  const [open, setOpen] = useState(hasActivePage)
  const [, setLocation] = useLocation()

  const label = feature.version ? `${feature.name} [${feature.version}]` : feature.name

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
      >
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 shrink-0 text-gray-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
        )}
        {open ? (
          <FolderOpen className="w-4 h-4 shrink-0 text-blue-500" />
        ) : (
          <Folder className="w-4 h-4 shrink-0 text-blue-500" />
        )}
        <span className="truncate font-medium">{label}</span>
      </button>
      {open && (
        <div className="ml-4 mt-0.5 space-y-0.5">
          {feature.pages.map((page) => {
            const isActive = currentPath === page.path
            return (
              <button
                key={page.path}
                onClick={() => setLocation(page.path)}
                className={`flex items-center gap-1.5 w-full text-left px-2 py-1 text-sm rounded truncate ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                <span className="truncate">{page.title}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function TeamFolder({ team, currentPath }: { team: NavTeam; currentPath: string }) {
  const hasActivePage = team.features.some((f) => f.pages.some((p) => p.path === currentPath))
  const [open, setOpen] = useState(hasActivePage || true)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 w-full text-left px-2 py-1.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded"
      >
        {open ? (
          <ChevronDown className="w-4 h-4 shrink-0 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 shrink-0 text-gray-500" />
        )}
        <span className="truncate">{team.name}</span>
      </button>
      {open && (
        <div className="ml-3 mt-0.5 space-y-0.5">
          {team.features.map((feature) => (
            <FeatureFolder key={feature.name} feature={feature} currentPath={currentPath} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const [location] = useLocation()

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 h-screen overflow-y-auto p-3 space-y-1">
      <div className="px-2 py-2 mb-2">
        <h1 className="text-base font-bold text-gray-900">Prototypes</h1>
        <p className="text-xs text-gray-500 mt-0.5">Feature mockups & demos</p>
      </div>
      {navTree.map((team) => (
        <TeamFolder key={team.name} team={team} currentPath={location} />
      ))}
    </aside>
  )
}
