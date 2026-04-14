interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconColor: string;
  iconBg: string;
}

export function StatsCard({ icon, label, value, iconColor, iconBg }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#E4E7EF] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#6B7280] mb-1">{label}</p>
          <p className="text-3xl font-semibold text-[#0F1117]">{value}</p>
        </div>
        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
