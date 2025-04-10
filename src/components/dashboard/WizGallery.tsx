import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Grid3X3, 
  GridIcon, 
  Image, 
  Heart, 
  MessageCircle, 
  Download, 
  Filter 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  imageUrl,
  title,
  likes,
  comments
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square bg-gradient-to-br from-wiz-lavender/20 to-wiz-coral/20 overflow-hidden rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">{imageUrl}</span>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
          <h3 className="text-white font-medium text-sm mb-2">{title}</h3>
          <div className="flex items-center space-x-3 text-white/90">
            <div className="flex items-center space-x-1">
              <Heart size={14} />
              <span className="text-xs">{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={14} />
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
    <Card className={cn(
      "bg-white/80 backdrop-blur-sm border border-wiz-lavender/30 shadow-lg",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bubblegum text-wiz-purple">Gallery</CardTitle>
        <div className="flex items-center space-x-2">
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
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trending" className="w-full mb-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-white/50">
              <TabsTrigger value="trending" className="flex items-center gap-1">
                🔥 Trending
              </TabsTrigger>
              <TabsTrigger value="latest" className="flex items-center gap-1">
                ✨ Latest
              </TabsTrigger>
              <TabsTrigger value="picks" className="flex items-center gap-1">
                🐼 WIZ Picks
              </TabsTrigger>
            </TabsList>
            <button className="flex items-center space-x-1 text-sm text-gray-600 px-3 py-1.5 rounded-md bg-white/50 hover:bg-white/80 transition-colors">
              <Filter size={14} />
              <span>Filter</span>
            </button>
          </div>
          
          <TabsContent value="trending">
            <div className={cn(
              "gap-4",
              layout === "grid" ? "grid grid-cols-2 md:grid-cols-3" : "space-y-4"
            )}>
              <GalleryItem imageUrl="🌊" title="Wave Wizards" likes={128} comments={32} />
              <GalleryItem imageUrl="🚀" title="To The Moon" likes={96} comments={24} />
              <GalleryItem imageUrl="🐼" title="Bamboo Bonanza" likes={64} comments={16} />
              <GalleryItem imageUrl="💎" title="Diamond Hands" likes={256} comments={64} />
              <GalleryItem imageUrl="🧠" title="Genius Moves" likes={48} comments={12} />
              <GalleryItem imageUrl="🔮" title="Crystal Ball Prediction" likes={72} comments={18} />
            </div>
          </TabsContent>
          
          <TabsContent value="latest">
            <div className={cn(
              "gap-4",
              layout === "grid" ? "grid grid-cols-2 md:grid-cols-3" : "space-y-4"
            )}>
              <GalleryItem imageUrl="🌈" title="Rainbow Wizdom" likes={42} comments={8} />
              <GalleryItem imageUrl="🧪" title="Lab Experiment" likes={36} comments={9} />
              <GalleryItem imageUrl="🧩" title="Puzzle Pieces" likes={24} comments={6} />
            </div>
          </TabsContent>
          
          <TabsContent value="picks">
            <div className={cn(
              "gap-4",
              layout === "grid" ? "grid grid-cols-2 md:grid-cols-3" : "space-y-4"
            )}>
              <GalleryItem imageUrl="⭐" title="Star Performer" likes={512} comments={128} />
              <GalleryItem imageUrl="🏆" title="Trophy Collection" likes={384} comments={96} />
              <GalleryItem imageUrl="👑" title="Crown Jewels" likes={256} comments={64} />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <button className="px-4 py-2 bg-wiz-purple/10 hover:bg-wiz-purple/20 text-wiz-purple rounded-full transition-colors text-sm font-medium">
            Load More Content
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WizGallery;
