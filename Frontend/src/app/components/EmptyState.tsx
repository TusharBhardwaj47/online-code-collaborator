import { Code2, Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateRoom: () => void;
}

export function EmptyState({ onCreateRoom }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      {/* Icon */}
      <div className="w-24 h-24 rounded-2xl bg-[#EEF0FF] flex items-center justify-center mb-6">
        <Code2 className="w-12 h-12 text-[#6C63FF]" strokeWidth={1.5} />
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-[#0F1117] mb-2">
        No rooms yet
      </h3>
      <p className="text-center text-[#6B7280] mb-6 max-w-sm">
        Get started by creating your first collaborative coding room
      </p>

      {/* CTA Button */}
      <button
        onClick={onCreateRoom}
        className="flex items-center gap-2 px-6 py-3 bg-[#6C63FF] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#6C63FF]/25 hover:-translate-y-0.5 transition-all"
      >
        <Plus className="w-5 h-5" />
        Create Your First Room
      </button>
    </div>
  );
}
