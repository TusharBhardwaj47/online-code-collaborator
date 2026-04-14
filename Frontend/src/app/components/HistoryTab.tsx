import { RotateCcw, Clock } from "lucide-react";

const mockSnapshots = [
  {
    id: "1",
    name: "Added user authentication",
    timestamp: "2 hours ago",
    author: "Tushar",
    avatar: "T",
  },
  {
    id: "2",
    name: "Fixed database queries",
    timestamp: "4 hours ago",
    author: "Alice",
    avatar: "A",
  },
  {
    id: "3",
    name: "Initial API setup",
    timestamp: "Yesterday",
    author: "Bob",
    avatar: "B",
  },
  {
    id: "4",
    name: "Project scaffolding",
    timestamp: "2 days ago",
    author: "Tushar",
    avatar: "T",
  },
];

export function HistoryTab() {
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="space-y-3">
        {mockSnapshots.map((snapshot) => (
          <div
            key={snapshot.id}
            className="p-4 bg-[#F8F9FC] border border-[#E4E7EF] rounded-lg hover:border-[#6C63FF]/30 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00C896] flex items-center justify-center text-white text-xs font-semibold">
                  {snapshot.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0F1117]">
                    {snapshot.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                    <Clock className="w-3 h-3" />
                    <span>{snapshot.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full mt-2 flex items-center justify-center gap-2 py-1.5 bg-white border border-[#E4E7EF] text-[#6B7280] text-sm font-medium rounded-lg hover:text-[#6C63FF] hover:border-[#6C63FF] transition-all opacity-0 group-hover:opacity-100">
              <RotateCcw className="w-3.5 h-3.5" />
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
