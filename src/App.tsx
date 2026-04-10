import { Route, Router, Switch } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import Sidebar from './components/Sidebar'
import Home from './pages/sailwind-starter/home'
import Guidance from './pages/sailwind-starter/guidance'
import TaskDashboard from './pages/sailwind-starter/task-dashboard'
import ApplicationStatus from './pages/sailwind-starter/application-status'
import DocumentReview from './pages/sailwind-starter/document-review'
import TimerRecurrenceRequirements from './pages/[PO] Process Events - Features/timer-recurrence/timer-recurrence-requirements'
import NotFound from './pages/sailwind-starter/not-found'

const pages = [
  { path: '/', component: Home },
  { path: '/guidance', component: Guidance },
  { path: '/task-dashboard', component: TaskDashboard },
  { path: '/application-status', component: ApplicationStatus },
  { path: '/document-review', component: DocumentReview },
  { path: '/process-events/timer-recurrence-requirements', component: TimerRecurrenceRequirements },
]

function App() {
  return (
    <Router hook={useHashLocation}>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Switch>
            {pages.map(({ path, component: Component }) => (
              <Route key={path} path={path} component={Component} />
            ))}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
