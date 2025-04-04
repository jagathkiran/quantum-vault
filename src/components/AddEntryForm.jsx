import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AddEntryForm({ onClose, onSave, defaultApp = '' }) {
  const [formData, setFormData] = useState({
    appName: defaultApp,
    username: '',
    password: ''
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, appName: defaultApp }));
  }, [defaultApp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-8 w-full max-w-md shadow-2xl">
      <h3 className="text-2xl font-bold mb-6">Add New Entry</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Application Name</label>
          <input
            type="text"
            required
            className="w-full p-3 rounded-lg bg-slate-700"
            value={formData.appName}
            onChange={(e) => setFormData({...formData, appName: e.target.value})}
          />
        </div>

        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            required
            className="w-full p-3 rounded-lg bg-slate-700"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>

        <div>
          <label className="block mb-2">Password</label>
          <div className="flex gap-2">
            <input
              type="password"
              required
              className="flex-1 p-3 rounded-lg bg-slate-700"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button
              type="button"
              className="px-4 py-3 bg-slate-700 rounded-lg hover:bg-slate-600"
            >
              Generate
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 hover:bg-slate-700 rounded-lg"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary px-6 py-3">
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
}