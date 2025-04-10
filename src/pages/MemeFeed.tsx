
import React from "react";
import TopBar from "@/components/dashboard/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Repeat, Share2, Flame, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MemePostProps {
  username: string;
  content: string;
  emoji: string;
  likes: number;
  comments: number;
  reposts: number;
  timeAgo: string;
}

const MemePost: React.FC<MemePostProps> = ({
  username,
  content,
  emoji,
  likes,
  comments,
  reposts,
  timeAgo,
}) => {
  return (
    <div className="bg-white/90 rounded-lg p-4 mb-4 border border-wiz-lavender/30 hover:shadow-md transition-all hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-wiz-purple/20 flex items-center justify-center mr-2">
          {/* Placeholder avatar */}
          <span>{emoji}</span>
        </div>
        <div>
          <p className="font-bold text-sm text-wiz-dark">{username}</p>
          <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>
      </div>
      
      {/* Content */}
      <p className="text-sm mb-4">{content}</p>
      
      {/* Meme content placeholder */}
      <div className="bg-gray-100 rounded-lg h-48 mb-3 flex items-center justify-center">
        <p className="text-gray-400 text-sm font-medium">Meme content would be here</p>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between text-sm text-gray-500">
        <button className="flex items-center space-x-1 hover:text-wiz-coral transition-colors">
          <Heart size={16} />
          <span>{likes}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-wiz-purple transition-colors">
          <MessageCircle size={16} />
          <span>{comments}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-wiz-mint transition-colors">
          <Repeat size={16} />
          <span>{reposts}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-wiz-banana transition-colors">
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
};

const MemeFeedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30">
      {/* Top navigation */}
      <TopBar />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bubblegum text-wiz-purple">Meme Feed</h1>
          <p className="text-gray-600">Latest chaos from the Memeverse</p>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm border-wiz-lavender/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bubblegum text-wiz-purple">Live Chaos</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="trending" className="w-full mb-6">
              <TabsList className="bg-white/50">
                <TabsTrigger value="trending" className="flex items-center gap-1">
                  <Flame size={16} className="text-wiz-coral" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="latest" className="flex items-center gap-1">
                  <Sparkles size={16} className="text-wiz-purple" />
                  Latest
                </TabsTrigger>
                <TabsTrigger value="picks" className="flex items-center gap-1">
                  🐼 WIZ Picks
                </TabsTrigger>
              </TabsList>
              <TabsContent value="trending" className="mt-4">
                <div className="max-h-[600px] overflow-y-auto pr-2">
                  <MemePost
                    username="@doge_lover"
                    content="When the market dips but you're still HODLing $WIZ"
                    emoji="🐶"
                    likes={42}
                    comments={7}
                    reposts={12}
                    timeAgo="5m ago"
                  />
                  <MemePost
                    username="@memeking"
                    content="How it started vs how it's going #WIZgang"
                    emoji="👑"
                    likes={128}
                    comments={24}
                    reposts={35}
                    timeAgo="27m ago"
                  />
                  <MemePost
                    username="@crypto_pepe"
                    content="POV: You just found out about $WIZ"
                    emoji="🐸"
                    likes={69}
                    comments={13}
                    reposts={21}
                    timeAgo="1h ago"
                  />
                  <MemePost
                    username="@wizzy_bear"
                    content="My face when someone says memes aren't valuable"
                    emoji="🐻"
                    likes={87}
                    comments={19}
                    reposts={14}
                    timeAgo="3h ago"
                  />
                  <MemePost
                    username="@galaxy_girl"
                    content="Diamond hands be like... #HODL #WIZ #ToTheMoon"
                    emoji="🌠"
                    likes={56}
                    comments={8}
                    reposts={12}
                    timeAgo="4h ago"
                  />
                </div>
              </TabsContent>
              <TabsContent value="latest" className="mt-4">
                <div className="max-h-[600px] overflow-y-auto pr-2">
                  <MemePost
                    username="@token_wizard"
                    content="Just woke up to see $WIZ pumping again! LFG!"
                    emoji="🧙"
                    likes={23}
                    comments={5}
                    reposts={7}
                    timeAgo="2m ago"
                  />
                  <MemePost
                    username="@defi_panda"
                    content="New to the Memeverse, but ready to create some magic ✨"
                    emoji="🐼"
                    likes={18}
                    comments={11}
                    reposts={3}
                    timeAgo="15m ago"
                  />
                  <MemePost
                    username="@moon_boi"
                    content="The face you make when your memes are fire but nobody notices"
                    emoji="🌙"
                    likes={9}
                    comments={3}
                    reposts={1}
                    timeAgo="32m ago"
                  />
                </div>
              </TabsContent>
              <TabsContent value="picks" className="mt-4">
                <div className="max-h-[600px] overflow-y-auto pr-2">
                  <MemePost
                    username="@meme_lord"
                    content="The ultimate $WIZ evolution timeline - from meme to dream!"
                    emoji="👑"
                    likes={312}
                    comments={47}
                    reposts={89}
                    timeAgo="1d ago"
                  />
                  <MemePost
                    username="@doge_fan"
                    content="POV: Explaining $WIZ to your normie friends"
                    emoji="🐶"
                    likes={276}
                    comments={32}
                    reposts={54}
                    timeAgo="2d ago"
                  />
                  <MemePost
                    username="@crypto_pepe"
                    content="When $WIZ pumps while the rest of the market dumps"
                    emoji="🐸"
                    likes={421}
                    comments={63}
                    reposts={98}
                    timeAgo="3d ago"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemeFeedPage;
