
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Mission = Tables<"missions">;
export type CompletedMission = Tables<"completed_missions">;
export type SparkleTransaction = Tables<"sparkle_transactions">;
export type Profile = Tables<"profiles">;

// Fetch all available missions
export const fetchMissions = async (type?: "daily" | "weekly" | "special") => {
  let query = supabase
    .from("missions")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching missions:", error);
    throw error;
  }

  return data as Mission[];
};

// Fetch user's completed missions
export const fetchCompletedMissions = async (userId: string) => {
  const { data, error } = await supabase
    .from("completed_missions")
    .select("*, mission_id(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching completed missions:", error);
    throw error;
  }

  return data;
};

// Complete a mission
export const completeMission = async (missionId: string, userId: string) => {
  const { data, error } = await supabase.rpc("complete_mission", {
    mission_id: missionId,
    user_id: userId,
  });

  if (error) {
    console.error("Error completing mission:", error);
    throw error;
  }

  return data;
};

// Fetch user profile
export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }

  return data as Profile;
};

// Fetch user's sparkle transactions
export const fetchSparkleTransactions = async (userId: string, limit = 5) => {
  const { data, error } = await supabase
    .from("sparkle_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching sparkle transactions:", error);
    throw error;
  }

  return data as SparkleTransaction[];
};

// Get human-readable rank name
export const getRankDisplayName = (rank: string): string => {
  switch (rank) {
    case "meme_peasant": return "Meme Peasant";
    case "sparkling_newbie": return "Sparkling Newbie";
    case "potion_poster": return "Potion Poster";
    case "chaos_slinger": return "Chaos Slinger";
    case "meme_lord": return "Meme Lord";
    case "cloud_sorcerer": return "Cloud Sorcerer";
    default: return "Unknown Rank";
  }
};

// Get rank emoji
export const getRankEmoji = (rank: string): string => {
  switch (rank) {
    case "meme_peasant": return "😐";
    case "sparkling_newbie": return "✨";
    case "potion_poster": return "🧪";
    case "chaos_slinger": return "💥";
    case "meme_lord": return "👑";
    case "cloud_sorcerer": return "🌪️";
    default: return "❓";
  }
};

// Get next rank information
export const getNextRankInfo = (currentSparkles: number): { name: string, sparklesNeeded: number, emoji: string } => {
  if (currentSparkles < 300) {
    return { name: "Sparkling Newbie", sparklesNeeded: 300 - currentSparkles, emoji: "✨" };
  } else if (currentSparkles < 800) {
    return { name: "Potion Poster", sparklesNeeded: 800 - currentSparkles, emoji: "🧪" };
  } else if (currentSparkles < 1500) {
    return { name: "Chaos Slinger", sparklesNeeded: 1500 - currentSparkles, emoji: "💥" };
  } else if (currentSparkles < 3000) {
    return { name: "Meme Lord", sparklesNeeded: 3000 - currentSparkles, emoji: "👑" };
  } else if (currentSparkles < 5000) {
    return { name: "Cloud Sorcerer", sparklesNeeded: 5000 - currentSparkles, emoji: "🌪️" };
  } else {
    return { name: "Max Rank", sparklesNeeded: 0, emoji: "🌟" };
  }
};

// Get time since a date in human-readable format
export const getTimeSince = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  
  const years = Math.floor(months / 12);
  return `${years}y ago`;
};
