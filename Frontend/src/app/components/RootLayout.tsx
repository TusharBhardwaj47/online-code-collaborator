import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Navbar />
      <Outlet />
    </div>
  );
}
