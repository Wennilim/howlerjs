import PropTypes from "prop-types";

function ProgressBar({ currentTime, duration, onSeek }) {
  const progress = (currentTime / duration) * 100;

  const handleSeek = (e) => {
    const seekTime = (e.target.value * duration) / 100;
    onSeek(seekTime);
  };

  return (
    <input
      type="range"
      min="0"
      max="100"
      step="any"
      value={progress}
      className="h-2 cursor-pointer w-full"
      onChange={handleSeek}
      style={{ appearance: "none", "--progress": progress + "%" }}
    />
  );
}

ProgressBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onSeek: PropTypes.func.isRequired,
};

export { ProgressBar };
