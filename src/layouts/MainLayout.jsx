import { Outlet, Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar UI */}
      <Navbar />

      {/* Main Content */}
      <main className="grow container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer UI */}
      <Footer />
    </div>
  );
}
