/* eslint-disable react/prop-types */
import {
  IoPlay,
  IoPause,
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoShuffle,
  // IoRepeat,
  IoOptions,
  // IoStopCircleOutline,
} from "react-icons/io5";
import { ProgressBar } from "./ProgressBar";
import { VolumeController } from "./VolumeController";

const Controller = ({
  currentTime,
  currentSong,
  time,
  handleSeek,
  // isLoop,
  // loop,
  // stop,
  playNextTrack,
  playPreviousTrack,
  handlePlayBtn,
  handleShuffle,
  isShuffle,
  isPlaying,
  isStop,
  volume,
  handleVolumeChange,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full p-2 rounded-md shadow-inner">
      <div className="flex justify-between text-sm">
        <div>{currentTime}</div>
        <div>
          {Math.floor(currentSong.duration / 60)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor(currentSong.duration % 60)
            .toString()
            .padStart(2, "0")}
        </div>
      </div>
      <ProgressBar
        currentTime={time}
        duration={currentSong.duration}
        onSeek={handleSeek}
      />
      <div className="flex gap-6 w-full justify-around">
        <button onClick={handleShuffle}>
          <IoShuffle
            className={
              isShuffle &&
              " rounded-full shadow-inner border solid border-yellow-500"
            }
          />
        </button>
        <button onClick={playPreviousTrack}>{<IoPlaySkipBack />}</button>
        <button onClick={handlePlayBtn}>
          {isPlaying && !isStop ? <IoPause /> : <IoPlay />}
        </button>
        <button onClick={playNextTrack}>{<IoPlaySkipForward />}</button>
        <button onClick={() =>{}}>
        {/*further feature: more option button for save, download song */}
          <IoOptions />
          {/* <IoRepeat
            className={
              isLoop &&
              " rounded-full shadow-inner border solid border-yellow-500"
            }
          /> */}
          {/* <IoStopCircleOutline
            className={
              isStop &&
              " rounded-full shadow-inner border solid border-yellow-500"
            }
          /> */}
        </button>
      </div>
      <VolumeController
        handleVolumeChange={handleVolumeChange}
        volume={volume}
      />
    </div>
  );
};

export { Controller };
