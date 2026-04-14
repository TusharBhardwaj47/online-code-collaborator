import { Plus, Circle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const sidebarRooms = [
  { id: "1", name: "Backend API", language: "JS", isActive: true },
  { id: "2", name: "ML Model", language: "PY", isActive: false },
  { id: "3", name: "React Components", language: "JS", isActive: false },
  { id: "4", name: "Algorithms", language: "C++", isActive: false },
  { id: "5", name: "Mobile App", language: "Java", isActive: false },
];

interface SidebarProps {
  onCreateRoom: () => void;
}

export function Sidebar({ onCreateRoom }: SidebarProps) {
  const [joinRoomId, setJoinRoomId] = useState("");
const navigate = useNavigate();

const handleJoinRoom = () => {
  if (!joinRoomId.trim()) return;
  navigate(`/app/editor/${joinRoomId.trim()}`);
};
  return (
    <aside className="w-60 bg-white border-r border-[#E4E7EF] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {/* My Rooms Section */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3 px-3">
            My Rooms
          </h3>
          <div className="space-y-1">
            {sidebarRooms.map((room) => (
              <button
                key={room.id}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all group ${
                  room.isActive
                    ? "bg-[#EEF0FF] border-l-2 border-[#6C63FF] pl-[10px]"
                    : "hover:bg-[#F8F9FC]"
                }`}
              >
                <div className="w-8 h-8 bg-[#F8F9FC] rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-[#6B7280]">
                    {room.language}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F1117] truncate">
                    {room.name}
                  </p>
                </div>
                {room.isActive && (
                  <Circle className="w-2 h-2 text-[#00C896] fill-[#00C896] flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Create Room Button */}
      <div className="p-4 border-t border-[#E4E7EF]">
        <button
          onClick={onCreateRoom}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#6C63FF] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#6C63FF]/25 hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Room
        </button>
        <div className="mt-3 space-y-2">
  <input
    type="text"
    value={joinRoomId}
    onChange={(e) => setJoinRoomId(e.target.value)}
    placeholder="Enter Room ID..."
    className="w-full px-3 py-2 bg-white border border-[#E4E7EF] rounded-lg text-sm text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
  />
  <button
    onClick={handleJoinRoom}
    className="w-full py-2.5 bg-white border-2 border-[#6C63FF] text-[#6C63FF] rounded-xl font-medium text-sm hover:bg-[#EEF0FF] transition-all"
  >
    → Join Room
  </button>
</div>
       
    

      </div>
    </aside>
  );
}
