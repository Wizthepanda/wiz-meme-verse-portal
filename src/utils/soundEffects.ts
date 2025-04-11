
// Sound effect utility for the WIZ dashboard

// Play mission-related sound effects
export const playSoundEffect = (soundType: 'complete' | 'reward' | 'levelUp' | 'tabChange' | 'post' | 'squish' | 'poof') => {
  const audio = new Audio();
  audio.volume = 0.5;
  
  switch(soundType) {
    case 'complete':
      // Ding! ✨ – A sparkling chime when a user completes a mission
      audio.src = '/sounds/sparkle-chime.mp3';
      console.log("Playing sparkle chime sound!");
      break;
    case 'reward':
      // Whoosh! 🎩 – A magical swish when $WIZ rewards appear
      audio.src = '/sounds/magical-whoosh.mp3';
      console.log("Playing magic whoosh sound!");
      break;
    case 'levelUp':
      // Panda Growl! 🐼 – A cute yet powerful sound when leveling up
      audio.src = '/sounds/panda-growl.mp3';
      console.log("Playing panda growl sound!");
      break;
    case 'tabChange':
      // Click! 🔮 – A mystic pop when tapping mission tabs
      audio.src = '/sounds/mystic-pop.mp3';
      console.log("Playing mystic pop sound!");
      break;
    case 'post':
      // Scribble ✍️ – A pen-scratch sound when posting a meme
      audio.src = '/sounds/pen-scratch.mp3';
      console.log("Playing pen scratch sound!");
      break;
    case 'squish':
      // Squish! 💫 – A squishy sound when clicking the cloud button
      audio.src = '/sounds/squish.mp3';
      console.log("Playing squish sound!");
      break;
    case 'poof':
      // Poof! 💨 – A magical poof sound for transitions
      audio.src = '/sounds/poof.mp3';
      console.log("Playing poof sound!");
      break;
    default:
      return;
  }
  
  // Use fallback sounds if the main sounds fail to load
  audio.onerror = () => {
    const fallbackSound = new Audio();
    fallbackSound.volume = 0.5;
    
    switch(soundType) {
      case 'complete':
      case 'reward':
      case 'squish':
      case 'poof':
        console.log("Using fallback sparkle sound");
        fallbackSound.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzdFN0b3AuY29tIElEMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUSVQyAAAAFgAAAFNvdW5kIEVmZmVjdCBMaWJyYXJ5VFBFMQAAAB4AAABCaWdTb3VuZEJhbmsuY29tIC8gTGFzdFN0b3AuY29tVEFMQgAAABYAAABTb3VuZCBFZmZlY3QgTGlicmFyeQ==';
        break;
      case 'levelUp':
        console.log("Using fallback growl sound");
        fallbackSound.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzdFN0b3AuY29tIElEMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUSVQyAAAAFgAAAFNvdW5kIEVmZmVjdCBMaWJyYXJ5VFBFMQAAAB4AAABCaWdTb3VuZEJhbmsuY29tIC8gTGFzdFN0b3AuY29tVEFMQgAAABYAAABTb3VuZCBFZmZlY3QgTGlicmFyeQ==';
        break;
      case 'tabChange':
      case 'post':
        console.log("Using fallback click sound");
        fallbackSound.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzdFN0b3AuY29tIElEMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUSVQyAAAAFgAAAFNvdW5kIEVmZmVjdCBMaWJyYXJ5VFBFMQAAAB4AAABCaWdTb3VuZEJhbmsuY29tIC8gTGFzdFN0b3AuY29tVEFMQgAAABYAAABTb3VuZCBFZmZlY3QgTGlicmFyeQ==';
        break;
      default:
        return;
    }
    
    fallbackSound.play().catch(err => console.log('Audio playback error:', err));
  };
  
  audio.play().catch(err => console.log('Audio playback error:', err));
};
