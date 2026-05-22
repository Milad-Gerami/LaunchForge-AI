import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: "url('/httplocalhost5173.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="text-center mb-12">
        <h2 className="text-xl font-semibold mb-6">Everything you need to launch</h2>
        <div className="flex flex-col gap-3 text-left max-w-md mx-auto">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">&#10003;</span>
            <p className="text-gray-700"><span className="font-semibold">Plan Your Launch</span> — Create and manage startup projects with tasks, priorities, and progress tracking.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">&#10003;</span>
            <p className="text-gray-700"><span className="font-semibold">AI-Powered Strategy</span> — Generate launch plans, marketing copy, and go-to-market content using AI.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">&#10003;</span>
            <p className="text-gray-700"><span className="font-semibold">Campaign Management</span> — Organize and track marketing campaigns from ideation through execution.</p>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2">LaunchForge</h1>
      <p className="text-gray-600 mb-6">Plan, track, and ship your projects.</p>
      <div className="space-x-4">
        <Link to="/login" className="inline-block text-center min-w-[120px] px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200">Login</Link>
        <Link to="/register" className="inline-block text-center min-w-[120px] px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all duration-200">Register</Link>
      </div>
    </div>
  );
}
