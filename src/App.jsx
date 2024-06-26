/* eslint-disable no-unused-vars */
import { ButtonPlayer } from "./components/ButtonPlayer";
import { MusicPlayer } from "./components/MusicPlayer";
import { PlaygorundPlayer } from "./components/PlaygorundPlayer";
import { Sprite } from "./components/Sprite";
import data from "./data/data.json";

function App() {
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-4 bg-[url('/img/bg2.jpg')] bg-center">
      {/* <Sprite /> */}
      {/* <ButtonPlayer /> */}
      <PlaygorundPlayer src={data.map((song) => song.url)} />
      {/* <MusicPlayer src={data.map((song) => song.url)} /> */}
    </div>
  );
}

export default App;
