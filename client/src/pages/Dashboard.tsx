import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import api from '../lib/axios';

interface StatItem {
  status: string;
  count: number;
}

export default function Dashboard() {
  const { user, isLoading } = useAuth();

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.get('/analytics').then(r => r.data),
    enabled: !!user,
  });

  const totalProjects = analytics?.projectStats?.reduce((sum: number, s: StatItem) => sum + Number(s.count), 0) ?? 0;
  const totalTasks = analytics?.taskStats?.reduce((sum: number, s: StatItem) => sum + Number(s.count), 0) ?? 0;
  const activeTasks = analytics?.taskStats?.find((s: StatItem) => s.status === 'in_progress')?.count ?? 0;
  const recentActivity = analytics?.activityTrend?.reduce((sum: number, d: { count: number }) => sum + Number(d.count), 0) ?? 0;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-20">
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : user ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-gray-500">{user.email}</p>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                {user.role}
              </span>
            </div>
          </div>

          {analyticsLoading ? (
            <p className="text-sm text-gray-400">Loading stats...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5">
                <p className="text-sm text-gray-500">Projects</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalProjects}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5">
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalTasks}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5">
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-3xl font-bold text-indigo-600 mt-1">{activeTasks}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5">
                <p className="text-sm text-gray-500">Activity (30d)</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{recentActivity}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/projects" className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 p-5">
              <p className="font-medium text-gray-900">Projects</p>
              <p className="text-xs text-gray-500 mt-1">Manage your work</p>
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 p-5">
                <p className="font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500 mt-1">Users &amp; audit log</p>
              </Link>
            )}
            <Link to="/account" className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 p-5">
              <p className="font-medium text-gray-900">Account</p>
              <p className="text-xs text-gray-500 mt-1">Password &amp; settings</p>
            </Link>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500">Unable to load user info.</p>
      )}
    </div>
  );
}
