import { useState } from "react";
import { Camera, Save } from "lucide-react";

export function Profile() {
  const [name, setName] = useState("Tushar Kumar");
  const [email, setEmail] = useState("tushar@codesync.dev");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [defaultLanguage, setDefaultLanguage] = useState("javascript");

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert("Account info saved!");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert("Password updated!");
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert("Preferences saved!");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#0F1117] mb-2">
            Profile & Settings
          </h1>
          <p className="text-[#6B7280]">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Avatar Section */}
        <div className="bg-white rounded-xl p-8 border border-[#E4E7EF] mb-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00C896] flex items-center justify-center text-white text-3xl font-semibold">
                T
              </div>
              <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0F1117] mb-1">
                Profile Picture
              </h3>
              <p className="text-sm text-[#6B7280] mb-3">
                Click to upload a new avatar
              </p>
              <button className="text-sm text-[#6C63FF] hover:underline">
                Remove photo
              </button>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-xl p-6 border border-[#E4E7EF] mb-6">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">
            Account Info
          </h3>
          <form onSubmit={handleSaveAccount} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F1117] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F1117] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-[#6C63FF] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl p-6 border border-[#E4E7EF] mb-6">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">
            Security
          </h3>
          <form onSubmit={handleSavePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F1117] mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F1117] mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F1117] mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-[#6C63FF] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all"
              >
                <Save className="w-4 h-4" />
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl p-6 border border-[#E4E7EF]">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">
            Preferences
          </h3>
          <form onSubmit={handleSavePreferences} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F1117] mb-2">
                Default Language
              </label>
              <select
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E4E7EF] rounded-lg text-[#0F1117] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="typescript">TypeScript</option>
                <option value="go">Go</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-[#0F1117]">
                  Email Notifications
                </p>
                <p className="text-xs text-[#6B7280]">
                  Receive updates about your rooms
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-[#E4E7EF] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#6C63FF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6C63FF]"></div>
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-[#6C63FF] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
