import React from "react";
import { Users, TrendingUp, Clock } from "lucide-react";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: string;
  color: string;
}

function StatsCard({ icon, title, value, trend, color }: StatsCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-opacity-10 rounded-lg ${color}`}>{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {trend && <p className="text-sm text-gray-400 mt-1">{trend}</p>}
        </div>
      </div>
    </div>
  );
}

export function StatsOverview({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard icon={<Users className="w-6 h-6 text-blue-500" />} title="Total Responses" value={stats.totalResponses} trend="+12% this week" color="text-blue-500" />
      <StatsCard icon={<TrendingUp className="w-6 h-6 text-green-500" />} title="Completion Rate" value={`${stats.completionRate}%`} trend="5% higher than average" color="text-green-500" />
      <StatsCard icon={<Clock className="w-6 h-6 text-purple-500" />} title="Active Forms" value={stats.activeForms} color="text-purple-500" />
    </div>
  );
}
