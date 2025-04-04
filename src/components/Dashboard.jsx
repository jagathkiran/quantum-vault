import MainSidebar from './MainSidebar'
import { 
  ClockIcon, 
  ChartBarIcon, 
  ShieldCheckIcon, 
  LockClosedIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function Dashboard({ entries }) {
  // Calculate most used apps
  const mostUsed = [...entries]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)

  // Flatten and sort all entries
  const allEntries = entries.flatMap(app => 
    app.entries.map(entry => ({
      ...entry,
      app: app.app,
      modified: new Date(entry.modified.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'))
    }))
  )

  const recentEntries = [...allEntries]
    .sort((a, b) => b.modified - a.modified)
    .slice(0, 3)

  const getHoursAgo = (date) => {
    if (isNaN(date)) return 'Invalid date'
    const now = new Date()
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  }

  // Sample security alerts (would be dynamic in real app)
  const securityAlerts = [
    { 
      type: 'weak-password', 
      message: 'Weak password detected: Email account',
      severity: 'high'
    },
    { 
      type: '2fa-disabled', 
      message: '2FA not enabled: Cloud Storage',
      severity: 'medium'
    }
  ]

  return (
    <div className="flex min-h-screen">
      <MainSidebar />
      
      <main className="ml-64 p-8 flex-1 space-y-8">
        <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold">Password Health</h3>
            </div>
            <div className="text-4xl font-bold text-green-500">92%</div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <LockClosedIcon className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">2FA Status</h3>
            </div>
            <div className="text-4xl font-bold">8/10</div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <ClockIcon className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div className="text-4xl font-bold">4</div>
          </div>
        </div>

        {/* Most Used Section */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <ChartBarIcon className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Most Used</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {mostUsed.map((app) => (
              <div 
                key={app.app} 
                className="px-4 py-2 bg-slate-700 rounded-full flex items-center gap-2"
              >
                <span>{app.app}</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  {app.count} {app.count === 1 ? 'entry' : 'entries'}
                </span>
              </div>
            ))}
            {mostUsed.length === 0 && (
              <p className="text-slate-400">No applications yet</p>
            )}
          </div>
        </div>

        {/* Combined Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Entries */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <ClockIcon className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Recent Entries</h3>
            </div>
            <div className="space-y-4">
              {recentEntries.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-700 rounded-lg">
                  <div>
                    <div className="font-medium">{entry.app}</div>
                    <div className="text-sm text-slate-400">{entry.username}</div>
                  </div>
                  <div className="text-sm text-slate-400">
                    {getHoursAgo(entry.modified)}
                  </div>
                </div>
              ))}
              {recentEntries.length === 0 && (
                <p className="text-slate-400">No recent entries</p>
              )}
            </div>
          </div>

          {/* Security Alerts */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold">Security Alerts</h3>
            </div>
            <div className="space-y-4">
              {securityAlerts.map((alert, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg ${
                    alert.severity === 'high' 
                      ? 'bg-red-900/20 text-red-400'
                      : 'bg-yellow-900/20 text-yellow-400'
                  }`}
                >
                  {alert.message}
                </div>
              ))}
              {securityAlerts.length === 0 && (
                <div className="p-3 bg-green-900/20 text-green-400 rounded-lg">
                  No security issues detected
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}