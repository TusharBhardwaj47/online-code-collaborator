import { OutputTab } from "./OutputTab";
import { ChatTab } from "./ChatTab";
import { HistoryTab } from "./HistoryTab";

interface RightPanelProps {
  activeTab: "output" | "chat" | "history";
  setActiveTab: (tab: "output" | "chat" | "history") => void;
  onRunCode?: (code: string) => void;
  outputContent?: string;
}

export function RightPanel({ activeTab, setActiveTab, onRunCode, outputContent }: RightPanelProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-[#E4E7EF]">
        <button
          onClick={() => setActiveTab("output")}
          className={`flex-1 py-3 text-sm font-medium transition-all relative ${
            activeTab === "output"
              ? "text-[#6C63FF]"
              : "text-[#6B7280] hover:text-[#0F1117]"
          }`}
        >
          Output
          {activeTab === "output" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C63FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-3 text-sm font-medium transition-all relative ${
            activeTab === "chat"
              ? "text-[#6C63FF]"
              : "text-[#6B7280] hover:text-[#0F1117]"
          }`}
        >
          Chat
          {activeTab === "chat" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C63FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-3 text-sm font-medium transition-all relative ${
            activeTab === "history"
              ? "text-[#6C63FF]"
              : "text-[#6B7280] hover:text-[#0F1117]"
          }`}
        >
          History
          {activeTab === "history" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C63FF]" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "output" && <OutputTab onRunCode={onRunCode} externalOutput={outputContent} />}
        {activeTab === "chat" && <ChatTab />}
        {activeTab === "history" && <HistoryTab />}
      </div>
    </div>
  );
}