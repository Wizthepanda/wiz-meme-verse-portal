
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Grid3X3, 
  GridIcon, 
  Image, 
  Heart, 
  MessageCircle, 
  Download, 
  Filter,
  TrendingUp,
  Clock,
  Star
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface GalleryItemProps {
  imageUrl: string;
  title: string;
  likes: number;
  comments: number;
  isHot?: boolean;
  isPremium?: boolean;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  imageUrl,
  title,
  likes,
  comments,
  isHot = false,
  isPremium = false
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square bg-gradient-to-br from-wiz-lavender/10 to-wiz-coral/10 overflow-hidden rounded-lg">
        {/* Hot indicator */}
        {isHot && (
          <div className="absolute top-2 left-2 z-10 bg-wiz-coral/90 px-2 py-0.5 rounded-md text-white text-xs font-bold flex items-center">
            <TrendingUp size={12} className="mr-1" /> HOT
          </div>
        )}
        
        {/* Premium indicator */}
        {isPremium && (
          <div className="absolute top-2 right-2 z-10">
            <Star size={16} className="fill-wiz-banana text-wiz-banana" />
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          <span className="transform transition-transform duration-300 group-hover:scale-125">{imageUrl}</span>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
          <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
          <div className="flex items-center space-x-3 text-white/90">
            <div className="flex items-center space-x-1">
              <Heart size={14} className="text-wiz-coral" />
              <span className="text-xs">{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={14} className="text-wiz-mint" />
              <span className="text-xs">{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WizGalleryProps {
  className?: string;
}

const WizGallery: React.FC<WizGalleryProps> = ({ className }) => {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  
  return (
    <div className={className}>
      <Tabs defaultValue="trending" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-white/50">
            <TabsTrigger value="trending" className="flex items-center gap-1 text-sm">
              <TrendingUp size={14} /> Trending
            </TabsTrigger>
            <TabsTrigger value="latest" className="flex items-center gap-1 text-sm">
              <Clock size={14} /> Latest
            </TabsTrigger>
            <TabsTrigger value="picks" className="flex items-center gap-1 text-sm">
              <Star size={14} /> WIZ Picks
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLayout("grid")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                layout === "grid" ? "bg-wiz-purple/20 text-wiz-purple" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Grid3X3 size={18} />
            </button>
            <button 
              onClick={() => setLayout("list")}
              className={cn(
                "p-1.5 rounded-md transition-colors", 
                layout === "list" ? "bg-wiz-purple/20 text-wiz-purple" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <GridIcon size={18} />
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600 px-3 py-1.5 rounded-md bg-white/50 hover:bg-white/80 transition-colors">
              <Filter size={14} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        <TabsContent value="trending">
          <div className={cn(
            "gap-4",
            layout === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "space-y-4"
          )}>
            <GalleryItem imageUrl="🌊" title="Wave Wizards" likes={128} comments={32} isHot={true} />
            <GalleryItem imageUrl="🚀" title="To The Moon" likes={96} comments={24} isPremium={true} />
            <GalleryItem imageUrl="🐼" title="Bamboo Bonanza" likes={64} comments={16} />
            <GalleryItem imageUrl="💎" title="Diamond Hands" likes={256} comments={64} isHot={true} isPremium={true} />
            <GalleryItem imageUrl="🧠" title="Genius Moves" likes={48} comments={12} />
            <GalleryItem imageUrl="🔮" title="Crystal Ball Prediction" likes={72} comments={18} />
            <GalleryItem imageUrl="🪄" title="Wizard Magic" likes={135} comments={42} isHot={true} />
            <GalleryItem imageUrl="🎭" title="Meme Theater" likes={89} comments={27} />
            <GalleryItem imageUrl="⚡" title="Lightning Strike" likes={112} comments={31} />
            <GalleryItem imageUrl="🌈" title="Rainbow Road" likes={104} comments={29} isPremium={true} />
          </div>
        </TabsContent>
        
        <TabsContent value="latest">
          <div className={cn(
            "gap-4",
            layout === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "space-y-4"
          )}>
            <GalleryItem imageUrl="🌈" title="Rainbow Wizdom" likes={42} comments={8} isPremium={true} />
            <GalleryItem imageUrl="🧪" title="Lab Experiment" likes={36} comments={9} />
            <GalleryItem imageUrl="🧩" title="Puzzle Pieces" likes={24} comments={6} />
            <GalleryItem imageUrl="🎡" title="Meme Carousel" likes={18} comments={4} />
            <GalleryItem imageUrl="🎪" title="Circus Act" likes={15} comments={3} />
          </div>
        </TabsContent>
        
        <TabsContent value="picks">
          <div className={cn(
            "gap-4",
            layout === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "space-y-4"
          )}>
            <GalleryItem imageUrl="⭐" title="Star Performer" likes={512} comments={128} isPremium={true} />
            <GalleryItem imageUrl="🏆" title="Trophy Collection" likes={384} comments={96} isHot={true} />
            <GalleryItem imageUrl="👑" title="Crown Jewels" likes={256} comments={64} isPremium={true} />
            <GalleryItem imageUrl="🔥" title="Fire Starter" likes={320} comments={80} isHot={true} />
            <GalleryItem imageUrl="💫" title="Stellar Performance" likes={290} comments={76} isPremium={true} />
          </div>
        </TabsContent>
        
        <div className="flex justify-center mt-6">
          <button className="px-4 py-2 bg-gradient-to-r from-wiz-purple/70 to-wiz-coral/70 hover:from-wiz-purple hover:to-wiz-coral text-white rounded-full transition-colors text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
            Load More Memes
          </button>
        </div>
      </Tabs>
    </div>
  );
};

export default WizGallery;
