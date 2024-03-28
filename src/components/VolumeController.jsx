/* eslint-disable react/prop-types */
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
const VolumeController = ({volume,handleVolumeChange}) => {
  const progress = volume*100;
  return (
    <div className="flex items-center gap-2">
      <HiMiniSpeakerXMark className="w-5 h-5" />
      <input
        type="range"
        min="0"
        max="100"
        step="any"
        value={progress}
        className="h-2 cursor-pointer w-full"
        onChange={handleVolumeChange}
        style={{ appearance: "none", "--progress": progress + "%" }}
      />
      <HiMiniSpeakerWave className="w-5 h-5" />
    </div>
  );
};

export { VolumeController };
