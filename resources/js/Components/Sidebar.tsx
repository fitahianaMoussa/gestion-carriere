import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Settings, HelpCircle, LogOut, Users, TrendingUp, Briefcase, FileText, Shuffle, Archive, Layers, Building2, LineChart, ListChecks, ChevronLeft, ChevronRight } from 'lucide-react';
import NavLink from './NavLink';


const Sidebar = ({ className, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const SidebarItem = ({ icon: Icon, children, href }) => {
    return (
      <NavLink
        href={href}
        className={({ isActive }) =>
          cn("flex items-center justify-start w-full p-2 text-sm font-medium rounded-md",
            isCollapsed ? "px-2" : "px-4",
            isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200 text-gray-700"
          )
        }
      >
        <Icon className="w-4 h-4 mr-2" />
        {!isCollapsed && children}
      </NavLink>
    );
  };

  return (
    <div className={cn("relative pb-12 transition-all duration-300 ease-in-out", 
      isCollapsed ? "w-16" : "w-64", 
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute z-10 -right-3 top-2"
        onClick={toggleCollapse}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button>
      <ScrollArea className="h-full">
        <div className="py-4 space-y-4">
          {/* Avatar et nom d'utilisateur */}
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "px-4 space-x-2")}>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {!isCollapsed && <span className="font-semibold">{user.name}</span>}
          </div>

          {/* Menu Principal */}
          <div className="px-3 py-2">
            {!isCollapsed && <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">Menu</h2>}
            <div className="space-y-1">
              <SidebarItem icon={Home} href="/dashboard">Home</SidebarItem>
              <SidebarItem icon={Settings} href="/settings">Settings</SidebarItem>
            </div>
          </div>

          {/* Section Gestion de Carrière */}
          <div className="px-3 py-2">
            {!isCollapsed && <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">Gestion de Carrière</h2>}
            <div className="space-y-1">
              <SidebarItem icon={Users} href="/users">Employés</SidebarItem>
              <SidebarItem icon={TrendingUp} href="/promotions">Avancement</SidebarItem>
              <SidebarItem icon={Briefcase} href="/services">Service</SidebarItem>
              <SidebarItem icon={Shuffle} href="/reclassements">Reclassement</SidebarItem>
              <SidebarItem icon={FileText} href="/contrats">Contrats</SidebarItem>
              <SidebarItem icon={Archive} href="/retraites">Retraites</SidebarItem>
              <SidebarItem icon={Layers} href="/classes">Classes</SidebarItem>
              <SidebarItem icon={ListChecks} href="/postes">Postes</SidebarItem>
              <SidebarItem icon={LineChart} href="/echelons">Échelons</SidebarItem>
              <SidebarItem icon={Building2} href="/departements">Départements</SidebarItem>
            </div>
          </div>

          {/* Aide */}
          <div className="px-3 py-2">
            {!isCollapsed && <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">Help</h2>}
            <div className="space-y-1">
              <SidebarItem icon={HelpCircle} href="/faq">FAQ</SidebarItem>
            </div>
          </div>
        </div>

        {/* Déconnexion */}
        <div className="px-3 py-2 mt-auto">
          <SidebarItem icon={LogOut} href="/logout" className="text-red-500 hover:text-red-600 hover:bg-red-100">
            Log out
          </SidebarItem>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
