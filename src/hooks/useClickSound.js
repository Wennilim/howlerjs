// import { Howl } from "howler";
// import { useCallback, useEffect, useRef } from "react";

// const preloadSound = async () => {
//   const clickSound = new Howl({
//     src: "/sound/click.wav",
//     loop: false,
//     volume: 0.5,
//   });
//   clickSound.load();
//   return clickSound;
// };

// const globalClickGameSound = preloadSound(); // To ensure that the audio is loaded before first use

// const useClickSound = () => {
//   //why useRef? 为了确保在component重新render时，不会因为重新load音频而导致performance问题，而是可以重复使用preload的音频实例。
//   const clickSoundRef = useRef(null); // To store preloaded click audio instances

//   useEffect(() => {
//     const initializeClickSound = async () => {
//       clickSoundRef.current = await globalClickGameSound; // Ensure that after the component is mounted, the click audio has been successfully loaded.
//     };
//     initializeClickSound();
//   }, []);

//   const play = useCallback(() => {
//     const clickSound = clickSoundRef.current;

//     if (clickSound) {
//       document.addEventListener(
//         "click",
//         () => {
//           clickSound.stop();
//           clickSound.play();
//         },
//         { once: true } // To ensure the audio only plays once per click
//       );
//     }
//   }, []);

//   return { play };
// };

// export { useClickSound };



import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

let clickSoundInstance = null;

const createClickSoundInstance = async (src, loop, volume) => {
  if (!clickSoundInstance) {
    clickSoundInstance = new Howl({
      src: src,
      loop: loop,
      volume: volume,
    });
    await clickSoundInstance.load();
  }
  return clickSoundInstance;
};

const useClickSound = ({ soundSrc, isLoop = false, volume = 0.5 }) => {
  const clickSoundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const initializeClickSound = async () => {
      clickSoundRef.current = await createClickSoundInstance(
        soundSrc,
        isLoop,
        volume
      );
    };
    initializeClickSound();
  }, [soundSrc, isLoop, volume]);

  const play = useCallback(() => {
    const clickSound = clickSoundRef.current;
    if (clickSound) {
      if (!isPlaying) {
        clickSound.play();
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    const clickSound = clickSoundRef.current;
    if (clickSound) {
      clickSound.stop();
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    const clickSound = clickSoundRef.current;
    if (clickSound && isPlaying) {
      clickSound.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return { play, stop, pause, isPlaying };
};

export { useClickSound };
