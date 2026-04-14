import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import api from "../../configs/api";
import { motion } from "motion/react";

const languages = [
  { id: "javascript", name: "JavaScript", color: "#F7DF1E" },
  { id: "python", name: "Python", color: "#3776AB" },
  { id: "java", name: "Java", color: "#F89820" },
  { id: "cpp", name: "C++", color: "#00599C" },
  { id: "typescript", name: "TypeScript", color: "#3178C6" },
  { id: "go", name: "Go", color: "#00ADD8" },
];

interface CreateRoomModalProps {
  onClose: () => void;
}

export function CreateRoomModal({ onClose }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const navigate = useNavigate();
  
const handleCreate = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await api.post("/rooms", {
      name: roomName,
      language: selectedLanguage,
    });
    const { roomId } = res.data.data.room;
    navigate(`/app/editor/${roomId}`);
  } catch (err: any) {
    alert(err.response?.data?.message || "Failed to create room");
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#0F1117] mb-1">
              Create a New Room
            </h2>
            <p className="text-sm text-[#6B7280]">
              Set up your collaborative coding space
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8F9FC] transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="space-y-5">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-medium text-[#0F1117] mb-2">
              Room Name
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
              placeholder="e.g., Backend API Development"
              required
            />
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-[#0F1117] mb-2">
              Select Language
            </label>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedLanguage === lang.id
                      ? "border-[#6C63FF] bg-[#EEF0FF]"
                      : "border-[#E4E7EF] hover:border-[#6C63FF]/30"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-sm font-medium text-[#0F1117]">
                    {lang.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Create Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#6C63FF] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#6C63FF]/25 hover:-translate-y-0.5 transition-all"
          >
            Create Room
          </button>

          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-[#6B7280] hover:text-[#0F1117] transition-colors"
          >
            Cancel
          </button>
        </form>
      </motion.div>
    </div>
  );
}
