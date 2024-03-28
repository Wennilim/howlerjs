import { useState, useEffect, memo } from "react";
import { Howl } from "howler";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { SOUND_MAP } from "../data/dataMap";

// Benefit: Reduces separate requests for multiple audio files, improves loading speed, allows multiple audio effects to be easily managed and played within the page
// Audio Sprite? Combine multiple audio clips into a single file and define the position of each clip by specifying a start point and duration

const Sprite = () => {
  const [spriteHowl, setSpriteHowl] = useState(null);

  useEffect(() => {
    const spriteHowlInstance = new Howl({
      src: [
        "http://www.erikscull.com/n520/2017/escull/media/audiospritedemo.mp3",
      ],
      sprite: {
        effect1: [0, 500], // 0 = start, 500 = end
        effect2: [1000, 1500], // 1000 = start, 1500 = end
        effect3: [3000, 500], // 3000 = start, 3500 = end
        effect4: [4000, 800], // 4000 = start, 4800 = end
        effect5: [5000, 1000], // 5000 = start, 6000 = end
      },
    });
    setSpriteHowl(spriteHowlInstance);

    return () => {
      spriteHowlInstance.unload();
    };
  }, []);

  const playEffectDebounced = debounce((effectName) => {
    if (spriteHowl) {
      spriteHowl.play(effectName);
    }
  }, 300);

  const playEffect = (effectName) => {
    playEffectDebounced(effectName);
  };

  const SoundButton = memo(({ sound, label }) => (
    <button
      className="border border-solid border-black px-2 py-1 rounded-md"
      onClick={() => playEffect(sound)}
    >
      {label}
    </button>
  ));

  SoundButton.displayName = "SoundButton";

  SoundButton.propTypes = {
    sound: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div>Audio Sprite Example</div>
      <div className="flex gap-4">
        {Object.entries(SOUND_MAP).map(([sound, label]) => (
          <SoundButton key={sound} sound={sound} label={label} />
        ))}
      </div>
    </div>
  );
};

export { Sprite };
