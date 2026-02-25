"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  Calendar,
  Award,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useDashboardTheme } from './dashboard-theme-provider';
import { DashboardSkeleton } from './dashboard-skeleton';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { StatusBadge } from '@/components/ui/status-badge';

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  monthlyRevenue: number;
  totalRevenue: number;
  todayAttendance: number;
  newMembersThisMonth: number;
  revenueGrowth: number;
  memberGrowth: number;
}

export default function AdminDashboard() {
  const { activeColorTheme } = useDashboardTheme();
  
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 2547,
    activeMembers: 2103,
    monthlyRevenue: 125840,
    totalRevenue: 892450,
    todayAttendance: 342,
    newMembersThisMonth: 87,
    revenueGrowth: 12.5,
    memberGrowth: 8.3,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate potential error (10% chance for demo)
        if (Math.random() < 0.1) {
          throw new Error('Failed to load dashboard data');
        }
        
        // Data is already set in initial state
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Revenue Chart Data
  const revenueData = [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 92000 },
    { month: 'Mar', revenue: 88000 },
    { month: 'Apr', revenue: 105000 },
    { month: 'May', revenue: 112000 },
    { month: 'Jun', revenue: 118000 },
    { month: 'Jul', revenue: 115000 },
    { month: 'Aug', revenue: 122000 },
    { month: 'Sep', revenue: 128000 },
    { month: 'Oct', revenue: 125000 },
    { month: 'Nov', revenue: 130000 },
    { month: 'Dec', revenue: 125840 },
  ];

  // Members Chart Data
  const membersData = [
    { week: 'Week 1', newMembers: 18, renewals: 45 },
    { week: 'Week 2', newMembers: 25, renewals: 52 },
    { week: 'Week 3', newMembers: 22, renewals: 48 },
    { week: 'Week 4', newMembers: 22, renewals: 55 },
  ];

  const statCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers.toLocaleString(),
      change: `+${stats.memberGrowth}%`,
      icon: Users,
      color: 'from-primary to-primary-light',
      bgColor: 'bg-primary-bg',
    },
    {
      title: 'Monthly Revenue',
      value: `$${(stats.monthlyRevenue / 1000).toFixed(1)}K`,
      change: `+${stats.revenueGrowth}%`,
      icon: DollarSign,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Today Attendance',
      value: stats.todayAttendance.toString(),
      change: '82%',
      icon: Activity,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Active Members',
      value: stats.activeMembers.toLocaleString(),
      change: `${((stats.activeMembers / stats.totalMembers) * 100).toFixed(1)}%`,
      icon: TrendingUp,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-400/10',
    },
  ];

  const recentActivities = [
    { 
      type: 'member', 
      name: 'John Doe', 
      action: 'joined Premium plan', 
      time: '2 mins ago',
      status: 'success' as const
    },
    { 
      type: 'payment', 
      name: 'Sarah Wilson', 
      action: 'paid $59.99', 
      time: '15 mins ago',
      status: 'success' as const
    },
    { 
      type: 'member', 
      name: 'Mike Johnson', 
      action: 'renewed membership', 
      time: '32 mins ago',
      status: 'success' as const
    },
    { 
      type: 'payment', 
      name: 'Emily Brown', 
      action: 'paid $99.99', 
      time: '1 hour ago',
      status: 'success' as const
    },
    { 
      type: 'member', 
      name: 'David Chen', 
      action: 'joined Basic plan', 
      time: '2 hours ago',
      status: 'success' as const
    },
  ];

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-dark flex items-center justify-center p-4">
          <div className="bg-dark-100 rounded-2xl p-8 max-w-md w-full border border-primary-border text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Dashboard Error</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="bg-dark min-h-screen p-4 md:p-6">
        <div className="max-w-full mx-auto">
          {/* Header with Status Indicator */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                Admin <span style={{ color: activeColorTheme.primary }} className="drop-shadow-lg">Dashboard</span>
              </h1>
              <StatusBadge status="success" variant="subtle" size="sm">
                Live
              </StatusBadge>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-gray-400 text-base md:text-lg">Overview of your gym's performance and metrics.</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="relative bg-dark-100 rounded-2xl p-4 md:p-6 border border-primary-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 md:w-14 md:h-14 ${card.bgColor} rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: card.icon === Users ? activeColorTheme.primary : undefined }} />
                    </div>
                    <h3 className="text-gray-400 text-xs md:text-sm font-bold mb-2 uppercase tracking-wider">
                      {card.title}
                    </h3>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 leading-none">{card.value}</p>
                    <motion.div
                      className="text-xs md:text-sm font-bold inline-flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <StatusBadge 
                        status={parseFloat(card.change.replace('+', '')) > 0 ? 'up' : 'down'} 
                        variant="subtle" 
                        size="sm"
                      >
                        {card.change}
                      </StatusBadge>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-8">
          {/* Revenue Chart */}
          <motion.div
            className="bg-dark-100 rounded-2xl p-4 md:p-6 border border-primary-border hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-2">
              <div>
                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">Revenue Trend</h3>
                <p className="text-gray-400 text-sm">Monthly revenue over the year</p>
              </div>
              <div className="text-right">
                <p className="text-xl md:text-2xl font-black" style={{ color: activeColorTheme.primary }}>${(stats.totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500">Total Revenue</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#6b7280' }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: `1px solid ${activeColorTheme.primary}`,
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  itemStyle={{ color: activeColorTheme.primary }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke={activeColorTheme.primary}
                  strokeWidth={3}
                  dot={{ fill: activeColorTheme.primary, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Members Chart */}
          <motion.div
            className="bg-dark-100 rounded-2xl p-4 md:p-6 border border-primary-border hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-2">
              <div>
                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">Member Growth</h3>
                <p className="text-gray-400 text-sm">New members vs renewals</p>
              </div>
              <div className="text-right">
                <p className="text-xl md:text-2xl font-black" style={{ color: activeColorTheme.primary }}>{stats.newMembersThisMonth}</p>
                <p className="text-xs text-gray-500">This Month</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={membersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="week" 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#6b7280' }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: `1px solid ${activeColorTheme.primary}`,
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Bar dataKey="newMembers" fill={activeColorTheme.primary} radius={[8, 8, 0, 0]} />
                <Bar dataKey="renewals" fill={activeColorTheme.primaryLight} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Recent Activity */}
          <motion.div
            className="lg:col-span-2 bg-dark-100 rounded-2xl p-4 md:p-6 border border-primary-border hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg md:text-xl font-black text-white uppercase mb-4 md:mb-6 tracking-tight">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-dark rounded-xl hover:bg-dark-200 transition-all duration-200 cursor-pointer group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  title={`${activity.name} ${activity.action} - ${activity.time}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${
                    activity.type === 'member' ? 'bg-primary-bg' : 'bg-green-400/10'
                  }`}>
                    {activity.type === 'member' ? (
                      <Users className="w-5 h-5" style={{ color: activeColorTheme.primary }} />
                    ) : (
                      <DollarSign className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold text-sm md:text-base truncate">{activity.name}</p>
                      <StatusBadge status={activity.status} variant="subtle" size="sm" icon={false}>
                        {activity.type === 'member' ? 'Member' : 'Payment'}
                      </StatusBadge>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm truncate">{activity.action}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-dark-100 rounded-2xl p-4 md:p-6 border border-primary-border hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg md:text-xl font-black text-white uppercase mb-4 md:mb-6 tracking-tight">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: 'Add Member', icon: Users, description: 'Register new member' },
                { label: 'Create Plan', icon: Award, description: 'Design membership plan' },
                { label: 'View Payments', icon: DollarSign, description: 'Payment history' },
                { label: 'Schedule Class', icon: Calendar, description: 'Class management' },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={i}
                    className="w-full flex items-center gap-3 p-3 md:p-4 bg-dark rounded-xl hover:bg-primary-bg border border-transparent hover:border-primary/30 transition-all duration-200 text-left group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title={action.description}
                  >
                    <div className="w-10 h-10 bg-primary-bg rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                      <Icon className="w-5 h-5" style={{ color: activeColorTheme.primary }} />
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-semibold text-sm md:text-base">{action.label}</span>
                      <p className="text-gray-500 text-xs hidden md:block">{action.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
        
        {/* Professional Footer */}
        <div className="mt-12 pt-8 border-t border-primary-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <StatusBadge status="success" variant="subtle" size="sm">
                System Operational
              </StatusBadge>
              <span className="text-xs text-gray-500">
                Version 2.1.0 • Build {new Date().toISOString().slice(0, 10).replace(/-/g, '')}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              © 2024 German Fitness Management System
            </div>
          </div>
        </div>
      </div>
      </div>
    </ErrorBoundary>
  );
}
