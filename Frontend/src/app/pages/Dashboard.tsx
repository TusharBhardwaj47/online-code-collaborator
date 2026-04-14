import { useState, useEffect } from "react";
import api from "../../configs/api";
import { Sidebar } from "../components/Sidebar";
import { StatsCard } from "../components/StatsCard";
import { RoomCard } from "../components/RoomCard";
import { RoomCardSkeleton } from "../components/RoomCardSkeleton";
import { CreateRoomModal } from "../components/CreateRoomModal";
import { Activity, Users, Clock, Plus } from "lucide-react";

// const mockRooms = [
//   {
//     id: "1",
//     name: "Backend API Development",
//     language: "javascript",
//     languageColor: "#F7DF1E",
//     participants: [
//       { name: "Alice", avatar: "A" },
//       { name: "Bob", avatar: "B" },
//       { name: "Charlie", avatar: "C" },
//     ],
//     lastEdited: "2 minutes ago",
//     isActive: true,
//   },
  
// ];

export function Dashboard() {
 const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [rooms, setRooms] = useState<any[]>([]);
const [stats, setStats] = useState({ 
  activeRooms: 0, 
  totalSessions: 0, 
  collaborators: 0 
});
const userName = localStorage.getItem("userName") || "User";

useEffect(() => {
  api.get("/rooms/my").then((res) => {
    const data = res.data.data.rooms;
    setRooms(data);
    setStats({
      activeRooms: data.filter((r: any) => r.isActive).length,
      totalSessions: data.length,
      collaborators: data.reduce(
        (acc: number, r: any) => acc + r.participantCount, 0
      ),
    });
  });
}, []);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar - Hidden on mobile, visible on lg+ */}
      <div className="hidden lg:block">
        <Sidebar onCreateRoom={() => setIsCreateModalOpen(true)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#0F1117] mb-1">
              Welcome back, {userName} 👋
            </h1>
            <p className="text-[#6B7280]">
              Continue where you left off or start a new coding session
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              
        icon={<Activity className="w-5 h-5" />}
        label="Active Rooms"
        value={String(stats.activeRooms)}
        iconColor="text-[#00C896]"
       iconBg="bg-[#00C896]/10"
/>
    <StatsCard
  icon={<Clock className="w-5 h-5" />}
  label="Total Sessions"
  value={String(stats.totalSessions)}
  iconColor="text-[#6C63FF]"
  iconBg="bg-[#6C63FF]/10"
/>
<StatsCard
  icon={<Users className="w-5 h-5" />}
  label="Collaborators"
  value={String(stats.collaborators)}
  iconColor="text-[#F59E0B]"
  iconBg="bg-[#F59E0B]/10"
/>
          </div>

          {/* Recent Rooms */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#0F1117]">Recent Rooms</h2>
              <button className="text-sm text-[#6C63FF] hover:underline">
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {rooms.map((room: any) => (
  <RoomCard key={room.roomId} room={{
    id: room.roomId,
    name: room.name,
    language: room.language,
    languageColor: room.language === "python" 
      ? "#3776AB" 
      : room.language === "cpp"
      ? "#00599C"
      : "#F7DF1E",
    participants: [],
    lastEdited: new Date(room.updatedAt).toLocaleString(),
    isActive: room.isActive,
  }} />
))}
            </div>
          </div>
        </div>
      </main>

      {/* Create Room Modal */}
      {isCreateModalOpen && (
        <CreateRoomModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {/* Floating Action Button - Mobile Only */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#6C63FF] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-40 hover:scale-110 transition-all"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}