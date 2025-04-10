
/**
 * Sound utility for playing various UI and mission-related sound effects
 */

// Define sound effect URLs for different interactions
export const SOUND_EFFECTS = {
  // Mission completion sounds
  missionComplete: "https://assets.mixkit.co/active_storage/sfx/2022/complete-quest-sound.mp3",
  wizReward: "https://assets.mixkit.co/active_storage/sfx/2019/wizreward-whoosh.mp3",
  pandaGrowl: "https://assets.mixkit.co/active_storage/sfx/212/panda-growl.mp3",
  
  // UI interaction sounds
  tabClick: "https://assets.mixkit.co/active_storage/sfx/2566/mystic-click.mp3",
  memePost: "https://assets.mixkit.co/active_storage/sfx/3198/pen-scratch.mp3",
  startQuest: "https://assets.mixkit.co/active_storage/sfx/2022/start-quest-sound.mp3",
};

// Play sound effect helper
export const playSound = (soundType: keyof typeof SOUND_EFFECTS, volume = 0.5) => {
  try {
    const audio = new Audio(SOUND_EFFECTS[soundType]);
    audio.volume = volume;
    
    // Preload the audio
    audio.load();
    
    // Play the audio
    audio.play().catch(err => {
      console.log('Audio playback error:', err);
    });
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};
