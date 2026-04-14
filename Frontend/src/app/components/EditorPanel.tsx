import { useState } from "react";

const sampleCode = `// Real-time collaborative code editor
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Name and email are required' 
    });
  }
  
  const newUser = await db.createUser({ name, email });
  res.status(201).json({ success: true, data: newUser });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;

interface EditorPanelProps {
  code: string;
  setCode: (code: string) => void;
}

export function EditorPanel({ code, setCode }: EditorPanelProps) {
  return (
    <div className="h-full bg-[#1E1E2E] rounded-xl overflow-hidden shadow-lg">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#2A2A3E]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
          <div className="w-3 h-3 rounded-full bg-[#00C896]"></div>
        </div>
        <span className="text-xs text-[#6B7280] ml-2">server.js</span>
      </div>
      <div className="relative h-[calc(100%-40px)] overflow-auto">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="absolute inset-0 w-full h-full p-4 pl-12 bg-transparent text-[#E4E7EF] font-mono text-sm leading-6 resize-none focus:outline-none"
          style={{ tabSize: 2 }}
          spellCheck={false}
        />
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 p-4 pr-3 text-right select-none pointer-events-none">
          {code.split('\n').map((_, index) => (
            <div
              key={index}
              className="text-[#4B5563] font-mono text-sm leading-6"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { sampleCode };