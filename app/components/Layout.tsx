import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🔬 Sentiment System</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-blue-600">Trang chủ</Link>
          <Link to="/statistics" className="text-blue-600">Thống kê</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
