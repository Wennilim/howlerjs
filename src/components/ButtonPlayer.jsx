/* eslint-disable no-unused-vars */
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { useClickSound } from "../hooks/useClickSound";
import { useState } from "react";

const ButtonPlayer = () => {
  const { play } = useClickSound();
  const [soundOn, setSoundOn] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <h1>Simple button with sound effect</h1>
      <button
      className="flex justify-center items-center"
        onClick={() => {
          setSoundOn(!soundOn); 
          play();
        }}
      >
        {soundOn ? (
          <HiMiniSpeakerWave className="w-10 h-10" />
        ) : (
          <HiMiniSpeakerXMark className="w-10 h-10" />
        )}
      </button>
    </div>
  );
};

export { ButtonPlayer };
