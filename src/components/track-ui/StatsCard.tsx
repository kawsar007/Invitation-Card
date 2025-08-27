import { TrendingUp } from "lucide-react";

export const StatsCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  trend?: string;
}> = ({ title, value, icon, color, subtitle, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 ${color} rounded-full`}>{icon}</div>
    </div>
    {(trend || subtitle) && (
      <div className="mt-4">
        {trend && (
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-semibold">{trend}</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        )}
        {subtitle && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{subtitle.split(":")[0]}</span>
            <span className="font-semibold text-purple-600">
              {subtitle.split(":")[1]}
            </span>
          </div>
        )}
      </div>
    )}
  </div>
);
