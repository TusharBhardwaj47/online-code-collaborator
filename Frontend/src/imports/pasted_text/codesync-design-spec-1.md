Design a premium, modern, light-theme web application called 
"CodeSync" – an Online Code Collaboration Platform. The UI should 
feel like a fusion of Linear.app and Vercel's dashboard — clean, 
minimal, ultra-polished, and professional.

─────────────────────────────────────────
DESIGN SYSTEM
─────────────────────────────────────────
Primary Color: #6C63FF (soft violet-purple)
Accent Color: #00C896 (mint green for active/online states)
Background: #F8F9FC (off-white, not pure white)
Surface/Card: #FFFFFF with subtle box-shadow
Border: #E4E7EF (very light grey)
Text Primary: #0F1117
Text Secondary: #6B7280
Error: #EF4444
Font: "Inter" — weights 400, 500, 600, 700
Border Radius: 12px for cards, 8px for buttons/inputs
Spacing system: 4px base unit (8, 12, 16, 24, 32, 48)

─────────────────────────────────────────
SCREENS TO DESIGN (6 screens)
─────────────────────────────────────────

① LOGIN / REGISTER PAGE
- Split layout: left side has animated code snippets 
  floating on a soft gradient background (#EEF0FF to #F8F9FC)
- Right side has a clean card with logo at top
- "CodeSync" logo with a small lightning bolt icon in #6C63FF
- Toggle between Login and Register with smooth tab animation
- Input fields with floating labels, subtle border glow on focus
- Primary CTA button: filled #6C63FF with white text, 
  slight shadow, hover lifts slightly
- "Continue with GitHub" secondary button with GitHub icon
- Minimal footer with terms & privacy links

② DASHBOARD / HOME
- Top navbar: Logo left, search bar center (with / shortcut hint),
  avatar + notification bell right
- Left sidebar (240px wide): 
    - "My Rooms" section with room list items
    - Each room item shows language icon + room name + 
      green dot if active
    - "Create Room" button at bottom of sidebar 
      with + icon, filled #6C63FF
- Main content area:
    - "Welcome back, Tushar 👋" heading
    - Stats row: 3 cards showing "Active Rooms", 
      "Total Sessions", "Collaborators" with icons and numbers
    - "Recent Rooms" section: grid of room cards (2 columns)
    - Each room card: language badge (color coded), room name,
      participant avatars stacked, last edited time, 
      "Join" button on hover

③ CREATE ROOM MODAL
- Centered modal with soft overlay backdrop
- Clean card (480px wide), 24px padding
- "Create a New Room" heading, subtitle text
- Input: Room Name
- Dropdown: Select Language 
  (JS=yellow, Python=blue, Java=orange, C++=purple icons)
- Large "Create Room" CTA button
- Cancel link below button
- Subtle entrance animation (scale up from 0.95)

④ MAIN EDITOR PAGE (most important screen)
- Full viewport layout, no scrolling
- Top bar (56px): 
    - Room name + language badge (left)
    - Connected users avatars with green dot (center)  
    - "Save Snapshot" button + "Share Room ID" button (right)
    - Room ID shown as a copyable pill badge
- Left panel: Code editor area (dark editor inside light UI)
    - Editor itself uses a soft dark theme: #1E1E2E background
    - Syntax highlighting with vivid colors
    - Line numbers in #4B5563
    - Active line highlight: subtle #2A2A3E
    - Editor occupies ~65% of screen width
- Right panel (35% width):
    - Tabs at top: "Output" | "Chat" | "History"
    - OUTPUT tab: terminal-style output box, dark bg #1E1E2E,
      green text #00C896, monospace font
      "Run Code" button below in accent green
    - CHAT tab: bubble chat UI, user messages right-aligned 
      in #6C63FF bubbles, others left-aligned in #F1F3F9
      Input bar at bottom with send button
    - HISTORY tab: list of saved snapshots with timestamp,
      saved-by avatar, "Restore" button on each item
- Bottom status bar (32px): 
    - Language indicator left
    - Live cursor positions of collaborators 
      (colored dots with names)
    - Connection status: green pulsing dot + "Connected"

⑤ COLLABORATOR PRESENCE OVERLAY
- Show colored cursor labels floating over editor 
  (each user gets a unique color from palette: 
   coral, sky blue, amber, mint)
- Small name tag attached to each cursor
- User avatar list in top bar shows online status rings

⑥ PROFILE / SETTINGS PAGE
- Clean centered layout (max-width 680px)
- Avatar upload circle at top with edit icon overlay
- Form sections with subtle dividers:
    "Account Info" — name, email fields
    "Security" — change password section
    "Preferences" — default language selector, theme toggle
- Each section is a white card with section heading in 
  small caps grey
- Save button per section, not one giant save at bottom

─────────────────────────────────────────
MICRO-INTERACTIONS & DETAILS
─────────────────────────────────────────
- Skeleton loaders for room cards while fetching
- Toast notifications (bottom-right): success in mint green,
  error in soft red, info in purple — pill shaped with icon
- Hover states: cards lift with box-shadow transition 200ms
- Active sidebar item: #EEF0FF background + #6C63FF left border
- Buttons: 200ms ease transition on hover (slight lift + shadow)
- Input focus: border changes to #6C63FF with soft purple glow
- Empty state illustrations: minimal line-art style in #6C63FF

─────────────────────────────────────────
OVERALL FEEL
─────────────────────────────────────────
Think: Notion meets VS Code meets Linear.
Premium SaaS product feel. Every spacing intentional.
Light, airy, but with depth through subtle shadows.
The editor screen should feel powerful and focused.
No unnecessary decorations — let whitespace do the work.