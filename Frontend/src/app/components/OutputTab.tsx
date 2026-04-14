import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";

interface OutputTabProps {
  onRunCode?: (code: string) => void;
  externalOutput?: string;
}

export function OutputTab({ onRunCode, externalOutput }: OutputTabProps) {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Update output when external output changes
  useEffect(() => {
    if (externalOutput !== undefined) {
      setOutput(externalOutput);
    }
  }, [externalOutput]);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runCode = () => {
    if (onRunCode) {
      setIsRunning(true);
      onRunCode("");
      setTimeout(() => {
        setIsRunning(false);
      }, 100);
    }
  };

  const clearOutput = () => {
    setOutput("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="flex-1 bg-[#1E1E2E] p-4 overflow-auto"
      >
        {output ? (
          <pre className="text-[#E4E7EF] font-mono text-sm leading-6 whitespace-pre-wrap">
            {output}
          </pre>
        ) : (
          <div className="text-[#6B7280] text-sm">
            Click "Run Code" to execute your JavaScript code...
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-[#E4E7EF] flex gap-2">
        <button
          onClick={clearOutput}
          disabled={!output}
          className="px-4 py-2.5 bg-[#374151] text-white rounded-lg font-medium hover:bg-[#4B5563] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#00C896] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#00C896]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" fill="white" />
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>
    </div>
  );
}