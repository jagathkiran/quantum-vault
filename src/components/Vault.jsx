import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddEntryForm from './AddEntryForm';
import { EyeIcon, EyeSlashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Vault() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});
  const [entries, setEntries] = useState([]);
  const [newEntryApp, setNewEntryApp] = useState('');

  const togglePasswordVisibility = (app, username) => {
    setShowPasswords(prev => ({
      ...prev,
      [`${app}-${username}`]: !prev[`${app}-${username}`]
    }));
  };

  const handleAddEntry = (newEntry) => {
    const appName = newEntry.appName || selectedApp?.app;
    
    // Update main entries list
    setEntries(prevEntries => {
      const existingApp = prevEntries.find(e => e.app === appName);
      
      if (existingApp) {
        return prevEntries.map(app => 
          app.app === appName ? {
            ...app,
            entries: [...app.entries, {
              username: newEntry.username,
              password: newEntry.password,
              modified: new Date().toLocaleString()
            }],
            count: app.count + 1,
            modified: new Date().toLocaleString()
          } : app
        );
      }
      
      return [...prevEntries, {
        app: appName,
        entries: [{
          username: newEntry.username,
          password: newEntry.password,
          modified: new Date().toLocaleString()
        }],
        count: 1,
        modified: new Date().toLocaleString()
      }];
    });

    // Update selected app if adding to current app
    if (selectedApp?.app === appName) {
      setSelectedApp(prev => ({
        ...prev,
        entries: [...prev.entries, {
          username: newEntry.username,
          password: newEntry.password,
          modified: new Date().toLocaleString()
        }],
        count: prev.count + 1,
        modified: new Date().toLocaleString()
      }));
    }

    setShowAddForm(false);
  };

  const openAddForm = (appName = '') => {
    setNewEntryApp(appName);
    setShowAddForm(true);
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Sidebar */}
      <aside className="w-64 bg-slate-800 p-4 h-screen fixed">
        <h1 className="text-2xl font-bold mb-8">QuantumVault</h1>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block hover:text-primary transition-colors">Dashboard</Link>
          <Link to="/vault" className="block text-primary font-medium">My Vault</Link>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="ml-64 flex-1">
        {/* Empty State */}
        {entries.length === 0 && !selectedApp ? (
          <div className="p-8 h-screen flex flex-col items-center justify-center">
            <div className="text-center max-w-md">
              <div className="text-6xl text-slate-500 mb-4">🔒</div>
              <h2 className="text-2xl font-bold mb-2">No Saved Passwords</h2>
              <p className="text-slate-400 mb-6">Click below to save your first password</p>
              <button
                onClick={() => openAddForm()}
                className="btn-primary inline-flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Add New Entry
              </button>
            </div>
          </div>
        ) : !selectedApp ? (
          /* Applications List */
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">My Vault</h2>
              <button 
                onClick={() => openAddForm()}
                className="btn-primary"
              >
                Add New Entry
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((app) => (
                <div 
                  key={app.app} 
                  onClick={() => setSelectedApp(app)}
                  className="card p-6 cursor-pointer hover:bg-slate-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold">{app.app}</h3>
                  <div className="text-sm text-slate-400 mt-2">
                    {app.count} {app.count === 1 ? 'Entry' : 'Entries'} • 
                    Last modified: {app.modified}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Application Details View */
          <div className="flex">
            {/* Secondary Sidebar */}
            <div className="w-64 bg-slate-850 p-4 h-screen border-r border-slate-700 flex flex-col">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-4">Applications</h2>
                <div className="space-y-2">
                  {entries.map(app => (
                    <div
                      key={app.app}
                      onClick={() => setSelectedApp(app)}
                      className={`p-3 rounded-lg cursor-pointer ${
                        selectedApp.app === app.app 
                          ? 'bg-primary/20 text-primary' 
                          : 'hover:bg-slate-700'
                      }`}
                    >
                      {app.app} <span className="text-slate-400">({app.count})</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Add Entry Button in Sidebar Bottom */}
              <button
                onClick={() => openAddForm(selectedApp.app)}
                className="btn-primary mt-4 w-full flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Add New Entry
              </button>
            </div>

            {/* Entries List */}
            <div className="flex-1 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">{selectedApp.app}</h2>
                <button 
                  onClick={() => openAddForm(selectedApp.app)}
                  className="btn-primary"
                >
                  Add Entry
                </button>
              </div>

              <div className="space-y-4">
                {selectedApp.entries.map((entry, index) => {
                  const entryKey = `${selectedApp.app}-${entry.username}`;
                  return (
                    <div key={index} className="card p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">{entry.username}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">
                              {showPasswords[entryKey] ? entry.password : '••••••••'}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(selectedApp.app, entry.username)}
                              className="text-primary hover:text-blue-400"
                            >
                              {showPasswords[entryKey] ? (
                                <EyeSlashIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-slate-400">
                          {entry.modified}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Add Entry Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <AddEntryForm 
              onClose={() => setShowAddForm(false)}
              onSave={handleAddEntry}
              defaultApp={newEntryApp}
            />
          </div>
        )}
      </main>
    </div>
  );
}