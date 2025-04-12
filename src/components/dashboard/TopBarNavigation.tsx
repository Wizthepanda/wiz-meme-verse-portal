
import React from "react";
import { Link } from "react-router-dom";
import { Home, Laugh, Sparkles, Trophy, LogOut } from "lucide-react";

interface TopBarNavigationProps {
  onLogout: () => void;
  showLogoutButton: boolean;
}

const TopBarNavigation: React.FC<TopBarNavigationProps> = ({ 
  onLogout, 
  showLogoutButton 
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Link to="/dashboard" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
        <Home size={20} />
      </Link>
      <Link to="/meme-feed" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
        <Laugh size={20} />
      </Link>
      <Link to="/magic-missions" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
        <Sparkles size={20} />
      </Link>
      <Link to="/leaderboard" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
        <Trophy size={20} />
      </Link>
      {showLogoutButton && (
        <button 
          onClick={onLogout}
          className="p-2 rounded-full bg-wiz-coral/10 text-wiz-coral hover:bg-wiz-coral/20 transition-all"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      )}
    </div>
  );
};

export default TopBarNavigation;
