import { useState, useEffect } from "react";
import socket from "../../configs/socket";
import { Send } from "lucide-react";

interface ChatTabProps {
  roomId: string;
}

// const mockMessages = [
//   {
//     id: "1",
//     author: "Alice",
//     avatar: "A",
//     message: "Hey! I've just pushed the latest changes to the API routes.",
//     timestamp: "10:30 AM",
//     isOwn: false,
//   },
//   {
//     id: "2",
//     author: "You",
//     avatar: "T",
//     message: "Great! Let me review them now.",
//     timestamp: "10:32 AM",
//     isOwn: true,
//   },
//   {
//     id: "3",
//     author: "Bob",
//     avatar: "B",
//     message: "Should we add error handling for the database connection?",
//     timestamp: "10:35 AM",
//     isOwn: false,
//   },
//   {
//     id: "4",
//     author: "You",
//     avatar: "T",
//     message: "Yes, good idea. I'll add try-catch blocks around the DB calls.",
//     timestamp: "10:36 AM",
//     isOwn: true,
//   },
// ];

export function ChatTab({ roomId }: ChatTabProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("chat:message", (msg: any) => {
      setMessages((prev) => [...prev, {
        ...msg,
        isOwn: msg.userId === localStorage.getItem("userId"),
      }]);
    });

    return () => {
      socket.off("chat:message");
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    socket.emit("chat:message", { roomId, message: newMessage });
    setNewMessage("");
  };

  //   const message = {
  //     id: Date.now().toString(),
  //     author: "You",
  //     avatar: "T",
  //     message: newMessage,
  //     timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //     isOwn: true,
  //   };

  //   setMessages([...messages, message]);
  //   setNewMessage("");
  // };

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        { messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${
                msg.isOwn
                  ? "bg-gradient-to-br from-[#6C63FF] to-[#00C896]"
                  : "bg-[#6B7280]"
              }`}
            >
              {msg.avatar}
            </div>

            {/* Message Bubble */}
            <div className={`flex-1 ${msg.isOwn ? "items-end" : "items-start"} flex flex-col`}>
              <div
                className={`px-4 py-2.5 rounded-2xl max-w-[85%] ${
                  msg.isOwn
                    ? "bg-[#6C63FF] text-white rounded-br-md"
                    : "bg-[#F1F3F9] text-[#0F1117] rounded-bl-md"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
              <span className="text-xs text-[#6B7280] mt-1 px-1">
                {msg.author} · {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-[#E4E7EF]">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 bg-[#F8F9FC] border border-[#E4E7EF] rounded-lg text-sm text-[#0F1117] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
          />
          <button
            type="submit"
            className="w-10 h-10 flex items-center justify-center bg-[#6C63FF] text-white rounded-lg hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
