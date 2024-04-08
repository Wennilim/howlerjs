import PropTypes from "prop-types";
import usePlayer from "../hooks/usePlayer";

const PlaygorundPlayer = ({ src }) => {
  const {
    togglePlay,
    stop,
    playNextTrack,
    playPreviousTrack,
    upVolume,
    downVolume,
    toggleLoop,
  } = usePlayer(src);
  return (
    <>
      <button onClick={togglePlay}>play</button>
      <button onClick={stop}>stop</button>
      <button onClick={playPreviousTrack}>prev</button>
      <button onClick={playNextTrack}>next</button>
        <button onClick={toggleLoop}>loop</button>
      <div className="flex gap-2">
        <button onClick={upVolume}>+ Vol</button>
        <button onClick={downVolume}>- Vol</button>
      </div>
    </>
  );
};

PlaygorundPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export { PlaygorundPlayer };
