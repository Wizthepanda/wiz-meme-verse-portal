
import React from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Home, Laugh, Sparkles, Trophy, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileNavMenuProps {
  onLogout: () => void;
  showLogoutButton: boolean;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ 
  onLogout, 
  showLogoutButton 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
          <Menu size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center gap-2 p-2">
            <Home size={18} /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/meme-feed" className="flex items-center gap-2 p-2">
            <Laugh size={18} /> Meme Feed
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/magic-missions" className="flex items-center gap-2 p-2">
            <Sparkles size={18} /> Missions
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/leaderboard" className="flex items-center gap-2 p-2">
            <Trophy size={18} /> Leaderboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 p-2 text-wiz-coral">
          <LogOut size={18} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavMenu;
