/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Howl } from "howler";
import { shuffle } from "../utils/shuffle";
import { formatTime } from "../utils/formatTime";

const useMusicPlayer = (soundSrc) => {
  const [isLoop, setIsLoop] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [soundTrack, setSoundTrack] = useState(soundSrc);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isStop, setIsStop] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (sound) {
      sound.stop();
      sound.unload();
    }
    const newSound = new Howl({
      src: soundTrack,
      loop: isLoop,
      volume: volume,
      onend: function () {
        if (!isLoop && soundTrack.length > 1) {
          setSoundTrack((prevSoundTrack) => {
            const currentIndex = prevSoundTrack.indexOf(sound && sound._src);
            const nextIndex = (currentIndex + 1) % prevSoundTrack.length;
            return [
              ...prevSoundTrack.slice(nextIndex),
              ...prevSoundTrack.slice(0, nextIndex),
            ];
          });
        } else {
          if (isLoop) {
            setTime(0);
            sound.loop(true);
            sound.play();
          }
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
  }, [soundTrack, isLoop]);

  useEffect(() => {
    if (sound) {
      sound.loop(isLoop);
    }
  }, [isLoop, sound]);

  useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [sound, volume]);

  useEffect(() => {
    if (isShuffle) {
      setSoundTrack(shuffle(soundTrack));
    }
  }, [isShuffle]);

  const togglePlay = () => {
    const action = isPlaying ? "pause" : "play";
    sound[action]();
    setIsPlaying(!isPlaying);
  };

  const stop = () => sound.stop();

  const setNewVolume = (newVolume) => {
    const clampedVolume = Math.min(1, Math.max(0, newVolume)); // make sure the range between 0 and 1
    sound.volume(clampedVolume);
    setVolume(clampedVolume);
  };

  const upVolume = () => {
    setNewVolume(volume + 0.1);
  };

  const downVolume = () => {
    setNewVolume(volume - 0.1);
  };

  const loop = () => {
    setIsLoop(!isLoop);
    setIsShuffle(false);
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
    setIsLoop(false);
  };

  useEffect(() => {
    let interval;
    if (isPlaying && !isStop) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    isStop && setTime(0);
    return () => clearInterval(interval);
  }, [isPlaying, soundTrack, isStop]);

  useEffect(() => {
    setTime(0);
  }, [soundTrack]);

  const currentTime = formatTime(time);

  const handleSeek = (newTime) => {
    setTime(newTime);
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
        loop: false, // Ensure loop is set to false initially
        volume: volume,
        onend: function () {
          if (!isLoop && soundTrack.length > 1) {
            setSoundTrack((prevSoundTrack) => {
              const currentIndex = prevSoundTrack.indexOf(sound && sound._src);
              const nextIndex = (currentIndex + 1) % prevSoundTrack.length;
              return [
                ...prevSoundTrack.slice(nextIndex),
                ...prevSoundTrack.slice(0, nextIndex),
              ];
            });
          } else {
            if (isLoop) {
              setTime(0);
              sound.loop(true);
              sound.play();
            }
          }
        },
      });
      setTime(0);
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
        loop: isLoop,
        volume: volume,
        onend: function () {
          if (!isLoop && soundTrack.length > 1) {
            setSoundTrack((prevSoundTrack) => {
              const currentIndex = prevSoundTrack.indexOf(sound && sound._src);
              const nextIndex = (currentIndex + 1) % prevSoundTrack.length;
              return [
                ...prevSoundTrack.slice(nextIndex),
                ...prevSoundTrack.slice(0, nextIndex),
              ];
            });
          } else {
            if (isLoop) {
              setTime(0);
              sound.loop(true);
              sound.play();
            } else {
              setIsPlaying(false);
            }
          }
        },
      });
      setTime(0);
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
    isLoop,
    isShuffle,
    isPlaying,
    volume,
    currentTrack,
    currentTime,
    isStop,
    time,
    upVolume,
    downVolume,
    togglePlay,
    stop,
    loop,
    setIsStop,
    handleShuffle,
    setIsPlaying,
    handleSeek,
    playNextTrack,
    playPreviousTrack,
    handleVolumeChange,
  };
};

useMusicPlayer.propTypes = {
  soundSrc: PropTypes.array.isRequired,
};

export default useMusicPlayer;
