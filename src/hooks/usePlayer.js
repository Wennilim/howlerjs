/* eslint-disable no-unused-vars */
import { Howl } from "howler";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const usePlayer = (soundSrc) => {
  const [soundTrack, setSoundTrack] = useState(soundSrc);
  const [isLoop, setIsLoop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isStop, setIsStop] = useState(false);

  useEffect(() => {
    if (sound) {
      sound.stop();
      sound.unload();
    }
    const newSound = new Howl({
      src: soundTrack,
      volume: volume,
      loop: isLoop,
      onend: function () {
        if (soundTrack.length > 1) {
          setSoundTrack((prevSoundTrack) => {
            const currentIndex = prevSoundTrack.indexOf(sound && sound._src);
            const nextIndex = (currentIndex + 1) % prevSoundTrack.length;
            return [
              ...prevSoundTrack.slice(nextIndex),
              ...prevSoundTrack.slice(0, nextIndex),
            ];
          });
        }
      },
    });

    setCurrentTrack(newSound && newSound._src);
    setSound(newSound);
    newSound.play();
    setIsPlaying(true);

    return () => {
      newSound.stop();
      newSound.unload();
    };
  }, [soundTrack]);

  useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [sound, volume]);

  const toggleLoop = () => {
    setIsLoop(!isLoop);
    console.log(isLoop);
    if (sound) {
      sound.loop(!isLoop);
    }
  };

  const togglePlay = () => {
    const action = isPlaying ? "pause" : "play";
    sound[action]();
    setIsPlaying(!isPlaying);
  };

  const stop = () => sound.stop();

  const setNewVolume = (newVolume) => {
    const clampedVolume = Math.min(1, Math.max(0, newVolume));
    sound.volume(clampedVolume);
    setVolume(clampedVolume);
  };

  const upVolume = () => {
    setNewVolume(volume + 0.1);
  };

  const downVolume = () => {
    setNewVolume(volume - 0.1);
  };

  const handleSeek = (newTime) => {
    sound.seek(newTime);
  };

  const playNextTrack = () => {
    const currentIndex = soundTrack.indexOf(currentTrack);
    const nextIndex = (currentIndex + 1) % soundTrack.length;
    const nextTrack = soundTrack[nextIndex];
    setCurrentTrack(nextTrack);
    if (sound) {
      sound.stop();
      sound.unload();
      const newSound = new Howl({
        src: nextTrack,
        loop: false,
        volume: volume,
        onend: function () {
          if (soundTrack.length > 1) {
            setSoundTrack((prevSoundTrack) => {
              const currentIndex = prevSoundTrack.indexOf(sound && sound._src);
              const nextIndex = (currentIndex + 1) % prevSoundTrack.length;
              return [
                ...prevSoundTrack.slice(nextIndex),
                ...prevSoundTrack.slice(0, nextIndex),
              ];
            });
          }
        },
      });
      setCurrentTrack(newSound && newSound._src);
      setSound(newSound);
      newSound.play();
      setIsPlaying(true);
    }
  };

  const playPreviousTrack = () => {
    const currentIndex = soundTrack.indexOf(currentTrack);
    const previousIndex =
      (currentIndex - 1 + soundTrack.length) % soundTrack.length;
    const previousTrack = soundTrack[previousIndex];
    setCurrentTrack(previousTrack);
    if (sound) {
      sound.stop();
      sound.unload();
      const newSound = new Howl({
        src: previousTrack,
        volume: volume,
        onend: function () {
          if (soundTrack.length > 1) {
            setSoundTrack((prevSoundTrack) => {
              const currentIndex = prevSoundTrack.indexOf(sound && sound._src);
              const nextIndex = (currentIndex + 1) % prevSoundTrack.length;
              return [
                ...prevSoundTrack.slice(nextIndex),
                ...prevSoundTrack.slice(0, nextIndex),
              ];
            });
          }
        },
      });
      setCurrentTrack(newSound && newSound._src);
      setSound(newSound);
      newSound.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    if (newVolume > volume) {
      upVolume();
    } else if (newVolume < volume) {
      downVolume();
    }
  };

  return {
    isPlaying,
    volume,
    currentTrack,
    isStop,
    isLoop,
    upVolume,
    downVolume,
    togglePlay,
    toggleLoop,
    stop,
    setIsStop,
    setIsPlaying,
    handleSeek,
    playNextTrack,
    playPreviousTrack,
    handleVolumeChange,
  };
};

usePlayer.propTypes = {
  soundSrc: PropTypes.array.isRequired,
};

export default usePlayer;
