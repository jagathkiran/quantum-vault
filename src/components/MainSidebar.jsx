import { Link } from 'react-router-dom'

export default function MainSidebar() {
  return (
    <aside className="w-64 bg-slate-800 p-4 h-screen fixed">
      <h1 className="text-2xl font-bold mb-8">QuantumVault</h1>
      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-primary transition-colors">Dashboard</Link>
        <Link to="/vault" className="block hover:text-primary transition-colors">My Vault</Link>
      </nav>
    </aside>
  )
}