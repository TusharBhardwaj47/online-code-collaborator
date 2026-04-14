import { useState, useEffect, useRef } from "react";
import api from "../../configs/api";
import socket from "../../configs/socket";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Copy, Share2, Save, Circle, Play } from "lucide-react";
import { EditorPanel, sampleCode } from "../components/EditorPanel";
import { RightPanel } from "../components/RightPanel";
import { toast } from "sonner";



export function Editor() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"output" | "chat" | "history">("output");
 const [code, setCode] = useState(sampleCode);
const [activeUsers, setActiveUsers] = useState<any[]>([]);
const [roomName, setRoomName] = useState("Loading...");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<"javascript" | "python">("javascript");
  const pyodideRef = useRef<any>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(false);
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const pendingExecutionRef = useRef(false);

  // Load Pyodide when switching to Python
  // ─── NAYA — Room + Socket ────────────────────────────────
useEffect(() => {
  socket.auth = {
    token: localStorage.getItem("token"),
    name: localStorage.getItem("userName"),
  };

  if (socket.connected) {
    socket.disconnect();
  }

  socket.connect();
  socket.emit("room:join", { roomId });

  api.get(`/rooms/${roomId}`).then((res) => {
    const room = res.data.data.room;
    setRoomName(room.name);
    setCode(room.code || sampleCode);
    setLanguage(room.language || "javascript");
  });

  socket.on("code:update", ({ code: incoming }: { code: string }) => {
    setCode(incoming);
  });

  socket.on("room:users", (users: any[]) => {
    setActiveUsers(users);
  });

  return () => {
    socket.off("code:update");
    socket.off("room:users");
    socket.emit("room:leave", { roomId });
    socket.disconnect();
  };
}, [roomId]);

// ─── PURANA — Pyodide ────────────────────────────────────
useEffect(() => {
  if (language === "python" && !pyodideRef.current && !isPyodideLoading) {
    setIsPyodideLoading(true);
    setOutput("⏳ Loading Python environment for the first time...\nThis may take 10-15 seconds.\n\nPlease wait...");
    loadPyodide();
  }
}, [language]);

  const loadPyodide = async () => {
    try {
      setOutput(prev => prev + "\n\n📦 Downloading Python runtime from CDN...");
      
      // Load Pyodide from CDN instead of npm package
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
      
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Script loading timeout (30s exceeded)'));
        }, 30000);
        
        script.onload = () => {
          clearTimeout(timeout);
          resolve();
        };
        script.onerror = () => {
          clearTimeout(timeout);
          reject(new Error('Failed to load Pyodide script'));
        };
        document.head.appendChild(script);
      });
      
      setOutput(prev => prev + "\n✓ Script loaded!\n\n🔧 Initializing Python environment...\n⏳ This may take 10-20 seconds...");
      
      // @ts-ignore - loadPyodide is loaded from CDN
      if (typeof window.loadPyodide !== 'function') {
        throw new Error('loadPyodide function not available');
      }
      
      // Add timeout for Pyodide initialization
     const pyodidePromise = (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
      });
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Pyodide initialization timeout (60s exceeded)')), 60000);
      });
      
      pyodideRef.current = await Promise.race([pyodidePromise, timeoutPromise]);
      
      setIsPyodideLoading(false);
      setIsPyodideReady(true);
      setOutput("✅ Python environment ready!\n\nYou can now run your Python code. Click 'Run Code' again.");
      
      // Auto-execute if there was a pending execution
      if (pendingExecutionRef.current) {
        pendingExecutionRef.current = false;
        setTimeout(() => executePython(), 500);
      }
    } catch (error) {
      console.error("Failed to load Pyodide:", error);
      setIsPyodideLoading(false);
      setOutput("❌ Failed to load Python environment.\n\n" + 
                "Error: " + (error as Error).message + 
                "\n\n💡 Troubleshooting:\n" +
                "1. Check your internet connection\n" +
                "2. Try refreshing the page\n" +
                "3. Check browser console for details\n" +
                "4. Try using JavaScript instead");
    }
  };
const copyRoomId = () => {
  navigator.clipboard.writeText(roomId || "");
  toast.success("Room ID copied to clipboard!");
};

const saveSnapshot = async () => {
  try {
    await api.post(`/rooms/${roomId}/snapshot`, { code, language });
    toast.success("Snapshot saved!");
  } catch {
    toast.error("Failed to save snapshot");
  }
};
  const detectLanguage = (code: string): "javascript" | "python" => {
    // Simple language detection
    const pythonKeywords = /\b(print|def|import|from|class|if __name__|elif)\b/;
    const hasPythonSyntax = pythonKeywords.test(code);
    
    if (hasPythonSyntax) {
      return "python";
    }
    return "javascript";
  };

  const executePython = async () => {
    if (!pyodideRef.current) {
      if (isPyodideLoading) {
        setOutput("⏳ Loading Python environment... Please wait and try again.");
        return;
      }
      setOutput("⚠️ Python environment not loaded. Switching to Python...");
      setLanguage("python");
      return;
    }

    try {
      // Capture stdout
      const logs: string[] = [];
      logs.push(`[${new Date().toLocaleTimeString()}] Running Python code...\n`);

      // Redirect Python's stdout to capture print statements
      await pyodideRef.current.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      // Run the user's code
      try {
        await pyodideRef.current.runPythonAsync(code);
        
        // Get the captured output
        const pythonOutput = await pyodideRef.current.runPythonAsync(`
sys.stdout.getvalue()
        `);

        if (pythonOutput) {
          logs.push(pythonOutput);
        } else {
          logs.push("✓ Code executed successfully (no output)");
        }
        
        logs.push("\n✓ Execution completed");
      } catch (error: any) {
        logs.push("\n❌ Python Error:");
        logs.push(error.message);
      }

      setOutput(logs.join("\n"));
    } catch (error: any) {
      setOutput(`❌ Error:\n${error.message}`);
    }
  };

  const executeJavaScript = () => {
    try {
      setOutput("");
      
      const logs: string[] = [];
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };
      
      console.error = (...args) => {
        logs.push('❌ Error: ' + args.map(arg => String(arg)).join(' '));
      };
      
      console.warn = (...args) => {
        logs.push('⚠️ Warning: ' + args.map(arg => String(arg)).join(' '));
      };

      logs.push(`[${new Date().toLocaleTimeString()}] Executing JavaScript code...\n`);

      try {
        const func = new Function(code);
        const result = func();
        
        if (result !== undefined) {
          logs.push('\n→ Return value:');
          logs.push(typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result));
        }
        
        if (logs.length === 1) {
          logs.push('✓ Code executed successfully (no output)');
        } else {
          logs.push('\n✓ Execution completed');
        }
      } catch (error: any) {
        logs.push('\n❌ Runtime Error:');
        logs.push(error.message);
        if (error.stack) {
          logs.push('\n' + error.stack);
        }
      }
      
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      
      setOutput(logs.join('\n'));
      
    } catch (error: any) {
      setOutput(`❌ Syntax Error:\n${error.message}`);
    }
  };

  const executeCode = async () => {
    const detectedLang = detectLanguage(code);
    
    if (detectedLang !== language) {
      setLanguage(detectedLang);
    }

    if (detectedLang === "python") {
      if (!isPyodideReady) {
        pendingExecutionRef.current = true;
      } else {
        await executePython();
      }
    } else {
      executeJavaScript();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FC]">
      {/* Top Bar */}
      <div className="h-14 bg-white border-b border-[#E4E7EF] flex items-center justify-between px-6">
        {/* Left - Room Info */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/app")}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8F9FC] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-[#0F1117]">
                   {roomName}
                </h1>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
              language === "python" 
                ? "bg-[#3776AB] text-white" 
                : "bg-[#F7DF1E] text-black"
            }`}>
              {language === "python" ? "PYTHON" : "JAVASCRIPT"}
            </span>
          </div>
        </div>

        {/* Center - Connected Users */}
        <div className="flex items-center gap-2">
          {activeUsers.map((user: any) => (
          <div
            key={user.userId}
              className="relative group"
              title={`${user.name} - ${user.position}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm"
              style={{ backgroundColor: "#6C63FF" }}
          >
              {user.name[0].toUpperCase()}
              </div>
              <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-[#00C896] fill-[#00C896] border-2 border-white rounded-full" />
            </div>
          ))}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={copyRoomId}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#F8F9FC] border border-[#E4E7EF] text-[#6B7280] rounded-lg text-sm font-medium hover:bg-[#EEF0FF] hover:text-[#6C63FF] hover:border-[#6C63FF] transition-all"
          >
            <Copy className="w-4 h-4" />
            <span className="font-mono text-xs">{roomId}</span>
          </button>
          <button 
          onClick={saveSnapshot}
          className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#E4E7EF] text-[#0F1117] rounded-lg text-sm font-medium hover:bg-[#F8F9FC] transition-all">
          <Save className="w-4 h-4" />
           Save Snapshot
      </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-[#6C63FF] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left - Code Editor */}
        <div className="flex-1 p-4">
         <EditorPanel 
  code={code} 
  setCode={(newCode: string) => {
    setCode(newCode);
    socket.emit("code:change", { roomId, code: newCode, language });
  }} 
/>
        </div>

        {/* Right - Output/Chat/History */}
        <div className="w-[35%] border-l border-[#E4E7EF] bg-white">
          <RightPanel 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            onRunCode={executeCode}
            outputContent={output}
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-8 bg-white border-t border-[#E4E7EF] flex items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-4">
          <span className="text-[#6B7280]">{language === "python" ? "Python" : "JavaScript"}</span>
          <div className="h-3 w-px bg-[#E4E7EF]" />
         {activeUsers.map((user: any) => (
       <div key={user.userId} className="flex items-center gap-1.5">
         <Circle
      className="w-2 h-2"
      style={{ color: "#6C63FF", fill: "#6C63FF" }}
    />
    <span className="text-[#6B7280]">
      {user.name}
        </span>
         </div>
    ))}
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-2 h-2 text-[#00C896] fill-[#00C896] animate-pulse" />
          <span className="text-[#00C896] font-medium">Connected</span>
        </div>
      </div>
    </div>
  );
}