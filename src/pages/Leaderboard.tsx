
import React from "react";
import TopBar from "@/components/dashboard/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface LeaderboardUserProps {
  rank: number;
  username: string;
  sparkles: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const LeaderboardUser: React.FC<LeaderboardUserProps> = ({ 
  rank, 
  username, 
  sparkles, 
  avatar, 
  isCurrentUser = false 
}) => {
  const getIcon = () => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Award className="text-amber-700" size={24} />;
    return <span className="text-xl font-bold text-gray-500 ml-1">{rank}</span>;
  };

  return (
    <div className={cn(
      "flex items-center p-3 rounded-lg mb-3 transition-all hover:-translate-y-1",
      isCurrentUser 
        ? "bg-wiz-lavender/30 border-2 border-wiz-purple" 
        : "bg-white/80 border border-wiz-lavender/20",
      rank <= 3 ? "shadow-md" : ""
    )}>
      <div className="flex items-center justify-center w-10">
        {getIcon()}
      </div>
      <div className="flex items-center flex-1 ml-3">
        <div className="w-10 h-10 rounded-full bg-wiz-purple/20 flex items-center justify-center mr-3">
          <span className="text-lg">{avatar}</span>
        </div>
        <div>
          <p className={cn(
            "font-medium", 
            isCurrentUser ? "text-wiz-purple" : "text-wiz-dark"
          )}>
            {username}
          </p>
          <p className="text-xs text-gray-500">
            {rank === 1 ? "Meme Wizard" : rank === 2 ? "Meme Samurai" : rank === 3 ? "Meme Knight" : "Meme Explorer"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-1 bg-wiz-banana/20 px-3 py-1 rounded-full">
        <span>✨</span>
        <span className="font-bold">{sparkles}</span>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30">
      {/* Top navigation */}
      <TopBar />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bubblegum text-wiz-purple">Meme Leaderboard</h1>
          <p className="text-gray-600">The fiercest meme lords in the Memeverse</p>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm border-wiz-lavender/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl font-bubblegum text-wiz-purple">Top Meme Lords</span>
              <Trophy className="text-yellow-500" size={28} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily" className="w-full mb-6">
              <TabsList className="bg-white/50">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="all-time">All Time</TabsTrigger>
              </TabsList>
              <TabsContent value="daily" className="mt-4">
                <div className="space-y-1">
                  <LeaderboardUser rank={1} username="@meme_lord" sparkles={896} avatar="👑" />
                  <LeaderboardUser rank={2} username="@doge_fan" sparkles={712} avatar="🐶" />
                  <LeaderboardUser rank={3} username="@crypto_pepe" sparkles={654} avatar="🐸" />
                  <LeaderboardUser rank={4} username="@wizzy_bear" sparkles={511} avatar="🐻" />
                  <LeaderboardUser rank={5} username="@nft_collector" sparkles={482} avatar="🖼️" />
                  <LeaderboardUser rank={6} username="@moon_boi" sparkles={433} avatar="🌙" />
                  <LeaderboardUser rank={7} username="@wizuser" sparkles={247} avatar="🐦" isCurrentUser={true} />
                  <LeaderboardUser rank={8} username="@galaxy_girl" sparkles={215} avatar="🌠" />
                  <LeaderboardUser rank={9} username="@token_wizard" sparkles={189} avatar="🧙" />
                  <LeaderboardUser rank={10} username="@defi_panda" sparkles={154} avatar="🐼" />
                </div>
              </TabsContent>
              <TabsContent value="weekly" className="mt-4">
                <div className="space-y-1">
                  <LeaderboardUser rank={1} username="@crypto_pepe" sparkles={2345} avatar="🐸" />
                  <LeaderboardUser rank={2} username="@meme_lord" sparkles={2231} avatar="👑" />
                  <LeaderboardUser rank={3} username="@wizzy_bear" sparkles={1876} avatar="🐻" />
                  <LeaderboardUser rank={4} username="@doge_fan" sparkles={1543} avatar="🐶" />
                  <LeaderboardUser rank={5} username="@wizuser" sparkles={1247} avatar="🐦" isCurrentUser={true} />
                  <LeaderboardUser rank={6} username="@nft_collector" sparkles={987} avatar="🖼️" />
                  <LeaderboardUser rank={7} username="@moon_boi" sparkles={854} avatar="🌙" />
                  <LeaderboardUser rank={8} username="@galaxy_girl" sparkles={782} avatar="🌠" />
                  <LeaderboardUser rank={9} username="@token_wizard" sparkles={654} avatar="🧙" />
                  <LeaderboardUser rank={10} username="@defi_panda" sparkles={543} avatar="🐼" />
                </div>
              </TabsContent>
              <TabsContent value="all-time" className="mt-4">
                <div className="space-y-1">
                  <LeaderboardUser rank={1} username="@meme_lord" sparkles={15432} avatar="👑" />
                  <LeaderboardUser rank={2} username="@wizzy_bear" sparkles={12876} avatar="🐻" />
                  <LeaderboardUser rank={3} username="@crypto_pepe" sparkles={10543} avatar="🐸" />
                  <LeaderboardUser rank={4} username="@doge_fan" sparkles={8742} avatar="🐶" />
                  <LeaderboardUser rank={5} username="@moon_boi" sparkles={7654} avatar="🌙" />
                  <LeaderboardUser rank={6} username="@nft_collector" sparkles={6543} avatar="🖼️" />
                  <LeaderboardUser rank={7} username="@token_wizard" sparkles={5876} avatar="🧙" />
                  <LeaderboardUser rank={8} username="@galaxy_girl" sparkles={4987} avatar="🌠" />
                  <LeaderboardUser rank={9} username="@defi_panda" sparkles={3765} avatar="🐼" />
                  <LeaderboardUser rank={10} username="@wizuser" sparkles={3247} avatar="🐦" isCurrentUser={true} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
