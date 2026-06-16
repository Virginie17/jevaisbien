export default function AppHeader() {
  return (
    <header className="bg-purple-900/50 backdrop-blur-sm border-b border-purple-700">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-white">Je Vais Bien</h1>
          <div className="flex gap-4">
            <a href="/senior" className="text-white hover:text-purple-200 transition">Senior</a>
            <a href="/proches" className="text-white hover:text-purple-200 transition">Proches</a>
            <a href="/aidant" className="text-white hover:text-purple-200 transition">Aidant</a>
            <a href="/installation" className="text-white hover:text-purple-200 transition">Installation</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
