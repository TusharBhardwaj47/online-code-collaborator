import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Search, Home, Code2, User, Plus, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const commands = [
  { id: "dashboard", label: "Go to Dashboard", icon: <Home className="w-4 h-4" />, action: "/app" },
  { id: "profile", label: "View Profile", icon: <User className="w-4 h-4" />, action: "/app/profile" },
  { id: "create", label: "Create New Room", icon: <Plus className="w-4 h-4" />, action: "create" },
  { id: "editor", label: "Open Editor", icon: <Code2 className="w-4 h-4" />, action: "/app/editor/demo" },
  { id: "logout", label: "Logout", icon: <LogOut className="w-4 h-4" />, action: "/" },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          handleCommand(filteredCommands[selectedIndex].action);
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  const handleCommand = (action: string) => {
    if (action === "create") {
      // Trigger create room modal
      onClose();
    } else {
      navigate(action);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Command Palette */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E4E7EF]">
            <Search className="w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none"
              autoFocus
            />
            <kbd className="px-2 py-1 bg-[#F8F9FC] border border-[#E4E7EF] rounded text-xs text-[#6B7280]">
              ESC
            </kbd>
          </div>

          {/* Commands List */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.id}
                  onClick={() => handleCommand(cmd.action)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    index === selectedIndex
                      ? "bg-[#EEF0FF] text-[#6C63FF]"
                      : "text-[#0F1117] hover:bg-[#F8F9FC]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      index === selectedIndex
                        ? "bg-[#6C63FF] text-white"
                        : "bg-[#F8F9FC] text-[#6B7280]"
                    }`}
                  >
                    {cmd.icon}
                  </div>
                  <span className="text-sm font-medium">{cmd.label}</span>
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-[#6B7280] text-sm">
                No commands found
              </div>
            )}
          </div>

          {/* Footer Hint */}
          <div className="border-t border-[#E4E7EF] px-4 py-2 bg-[#F8F9FC]">
            <div className="flex items-center gap-4 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-[#E4E7EF] rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-[#E4E7EF] rounded">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-[#E4E7EF] rounded">↵</kbd>
                to select
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
