import { Search, Bell, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { CommandPalette } from "./CommandPalette";

export function Navbar() {
  const navigate = useNavigate();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isCommandOpen) {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandOpen]);

  return (
    <>
      <nav className="bg-white border-b border-[#E4E7EF] h-16 flex items-center px-6 sticky top-0 z-50">
        <div className="flex items-center gap-8 flex-1">
          {/* Logo */}
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6C63FF] rounded-lg flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8L11 6.5M8 8L5 6.5M8 8V11"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="text-[18px] font-semibold text-[#0F1117]">
              CodeSync
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search rooms..."
              onClick={() => setIsCommandOpen(true)}
              readOnly
              className="w-full h-9 pl-9 pr-12 bg-[#F8F9FC] border border-[#E4E7EF] rounded-lg text-sm text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all cursor-pointer"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-white border border-[#E4E7EF] rounded text-[11px] text-[#6B7280] font-medium">
              /
            </kbd>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search Icon - Mobile Only */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FC] transition-colors"
          >
            <Search className="w-5 h-5 text-[#6B7280]" />
          </button>

          {/* Notifications */}
          <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FC] transition-colors relative">
            <Bell className="w-5 h-5 text-[#6B7280]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00C896] rounded-full border-2 border-white"></span>
          </button>

          {/* Avatar */}
          <button
            onClick={() => navigate("/app/profile")}
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00C896] flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </nav>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}