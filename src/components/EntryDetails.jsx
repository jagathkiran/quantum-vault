import { Link, useParams } from 'react-router-dom'

export default function EntryDetails() {
  const { appName } = useParams()
  const entries = [
    { username: 'user1', password: '********', modified: 'Invalid Date' },
    { username: 'user2', password: '********', modified: 'Invalid Date' }
  ]

  return (
    <div className="flex">
      <MainSidebar />
      <main className="ml-64 p-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{appName}</h2>
          <Link to="/vault" className="btn-primary">
            Back to Applications
          </Link>
        </div>

        <div className="card">
          <div className="divide-y divide-slate-700">
            {entries.map((entry, index) => (
              <div key={index} className="py-4">
                <div className="font-medium">Username: {entry.username}</div>
                <div className="text-slate-400">Password: {entry.password}</div>
                <div className="text-sm text-slate-500 mt-2">
                  Last modified: {entry.modified}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}