import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  title: string;
  description: string;
}

export function StatCard({ icon, value, title, description }: StatCardProps) {
  return (
    <div className="bg-brand-light/50 border border-gray-200/80 rounded-lg p-5 flex items-center space-x-4">
      <div className="flex-shrink-0 text-brand-green">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-brand-dark">{value}</p>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
