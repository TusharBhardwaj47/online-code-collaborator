import { useNavigate } from "react-router";
import { Circle } from "lucide-react";

interface Room {
  id: string;
  name: string;
  language: string;
  languageColor: string;
  participants: { name: string; avatar: string }[];
  lastEdited: string;
  isActive: boolean;
}

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-xl p-6 border border-[#E4E7EF] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative">
      {/* Language Badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="px-2.5 py-1 rounded-md text-xs font-semibold text-white"
          style={{ backgroundColor: room.languageColor }}
        >
          {room.language.toUpperCase()}
        </span>
        {room.isActive && (
          <div className="flex items-center gap-1.5">
            <Circle className="w-2 h-2 text-[#00C896] fill-[#00C896] animate-pulse" />
            <span className="text-xs text-[#00C896] font-medium">Active</span>
          </div>
        )}
      </div>

      {/* Room Name */}
      <h3 className="text-lg font-semibold text-[#0F1117] mb-3">
        {room.name}
      </h3>

      {/* Participants & Last Edited */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {room.participants.map((participant, idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00C896] flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
              title={participant.name}
            >
              {participant.avatar}
            </div>
          ))}
        </div>
        <span className="text-xs text-[#6B7280]">{room.lastEdited}</span>
      </div>

      {/* Join Button - Shows on Hover */}
      <button
        onClick={() => navigate(`/app/editor/${room.id}`)}
        className="absolute inset-x-6 bottom-6 py-2 bg-[#6C63FF] text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Join Room
      </button>
    </div>
  );
}
