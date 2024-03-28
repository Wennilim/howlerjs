/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Record = ({ currentSong, isPlaying, isStop }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId;
    if (isPlaying && !isStop) {
      const animate = () => {
        setRotation((prevRotation) => (prevRotation + 0.4) % 360);
        animationFrameId = requestAnimationFrame(animate);
      };
      animationFrameId = requestAnimationFrame(animate);
    } else if (isStop) {
      setRotation(0);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, isStop]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-80 h-80 bg-black rounded-full flex items-center justify-center">
        <div
          className={`w-36 h-36 bg-yellow-500 rounded-full flex justify-center items-center text-center`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="bg-white flex justify-center items-center w-2 h-2 rounded-full border border-black">
            <div className=" h-1/2 absolute top-9  left-10  text-start">
              {currentSong.name}
            </div>
            <div className="absolute bottom-9">{currentSong.artist}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Record };
