import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  title: string;
  description: string;
}

export function StatCard({ icon, value, title, description }: StatCardProps) {
  return (
    <div className="bg-secondary-100 border border-text-100 rounded-lg p-5 flex items-center space-x-4">
      <div className="flex-shrink-0 text-primary">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-text">{value}</p>
        <p className="text-sm font-medium text-text-light">{title}</p>
        <p className="text-xs text-text-400">{description}</p>
      </div>
    </div>
  );
}
