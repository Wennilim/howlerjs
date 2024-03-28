/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import data from "../data/data.json";
import useMusicPlayer from "../hooks/useMusicPlayer";
import { Controller } from "./Controller";
import { Record } from "./Record";
import { useEffect } from "react";

const MusicPlayer = ({ src }) => {
  const {
    isPlaying,
    volume,
    time,
    isLoop,
    isShuffle,
    currentTrack,
    currentTime,
    isStop,
    handleShuffle,
    handleVolumeChange,
    handleSeek,
    togglePlay,
    playNextTrack,
    playPreviousTrack,
    setIsStop,
    loop,
    stop,
  } = useMusicPlayer(src);

  const currentSong = data.find((song) => song.url === currentTrack) || {}; // show the song details on the record

  const handlePlayBtn = () => {
    setIsStop(false);
    togglePlay();
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-center">Simple Music Player</h1>
      <Record currentSong={currentSong} isPlaying={isPlaying} isStop={isStop} />
      <Controller
        handleSeek={handleSeek}
        currentSong={currentSong}
        currentTime={currentTime}
        handleShuffle={handleShuffle}
        handlePlayBtn={handlePlayBtn}
        isLoop={isLoop}
        time={time}
        loop={loop}
        stop={stop}
        isStop={isStop}
        isPlaying={isPlaying}
        isShuffle={isShuffle}
        playNextTrack={playNextTrack}
        playPreviousTrack={playPreviousTrack}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
      />
    </div>
  );
};

MusicPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export { MusicPlayer };
