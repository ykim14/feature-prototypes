import { useState, useCallback, useRef } from 'react'
import { useLocation } from 'wouter'
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
} from 'lucide-react'
import { navTree } from '../nav-config'
import type { NavNode } from '../nav-config'

function hasActivePath(node: NavNode, currentPath: string): boolean {
  if (node.path) return node.path === currentPath
  return node.children?.some((c) => hasActivePath(c, currentPath)) ?? false
}

function NavItem({ node, currentPath, depth }: { node: NavNode; currentPath: string; depth: number }) {
  const isFolder = !!node.children
  const isActive = node.path === currentPath
  const [open, setOpen] = useState(hasActivePath(node, currentPath))
  const [, setLocation] = useLocation()

  if (!isFolder) {
    return (
      <button
        onClick={() => setLocation(node.path!)}
        className={`flex items-center gap-1.5 w-full text-left px-2 py-1 text-sm rounded ${
          isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
        <span className="whitespace-nowrap">{node.name}</span>
      </button>
    )
  }

  const isTopLevel = depth === 0

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 w-full text-left px-2 rounded ${
          isTopLevel ? 'py-1.5 text-sm font-semibold text-gray-800' : 'py-1 text-sm text-gray-700'
        } hover:bg-gray-100`}
      >
        {open ? (
          <ChevronDown className={`shrink-0 text-gray-400 ${isTopLevel ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
        ) : (
          <ChevronRight className={`shrink-0 text-gray-400 ${isTopLevel ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
        )}
        {!isTopLevel && (
          open ? (
            <FolderOpen className="w-4 h-4 shrink-0 text-blue-500" />
          ) : (
            <Folder className="w-4 h-4 shrink-0 text-blue-500" />
          )
        )}
        <span className={`whitespace-nowrap ${isTopLevel ? '' : 'font-medium'}`}>{node.name}</span>
      </button>
      {open && (
        <div className="ml-3 mt-0.5 space-y-0.5">
          {node.children!.map((child) => (
            <NavItem key={child.name} node={child} currentPath={currentPath} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

const MIN_WIDTH = 200
const MAX_WIDTH = 500

export default function Sidebar() {
  const [location] = useLocation()
  const [width, setWidth] = useState(280)
  const isResizing = useRef(false)

  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isResizing.current = true
    const startX = e.clientX
    const startWidth = width

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.current) return
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + moveEvent.clientX - startX))
      setWidth(newWidth)
    }

    const onMouseUp = () => {
      isResizing.current = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [width])

  return (
    <aside
      className="shrink-0 bg-white border-r border-gray-200 h-screen overflow-x-hidden overflow-y-auto relative"
      style={{ width }}
    >
      <div className="p-3 space-y-1">
        <div className="px-2 py-2 mb-2">
          <h1 className="text-base font-bold text-gray-900 whitespace-nowrap">Prototypes</h1>
          <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">Feature mockups & demos</p>
        </div>
        {navTree.map((node) => (
          <NavItem key={node.name} node={node} currentPath={location} depth={0} />
        ))}
      </div>
      <div
        onMouseDown={startResize}
        className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-blue-300 active:bg-blue-400 transition-colors"
      />
    </aside>
  )
}
