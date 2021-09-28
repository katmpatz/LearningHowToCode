import './Main.css';
import {ReactComponent as HelpIcon} from './help.svg';
import {ReactComponent as PlayIcon} from './play_arrow.svg';

function Main() {

  return (
    <div className="main-grid">
      <div className="sidebar">
        <div className="block">
          <span>Move left</span>
        </div>
      </div>
      <div className="coding-panel">
        <div className="description">
            <h3>Level 1: Visit the planet</h3>
            <p>Help the little panda to go to the supermarket planet, to start his work. </p>
            <p>Drag and drop the actions here:</p>
        </div>
        <div className="commands">

        </div>
        <div className="buttons-panel">
            <button id="help-btn" className="round-btn"><HelpIcon/></button>
            <button id="play-btn" className="round-btn"><PlayIcon id="play-icon"/></button>
        </div>
      </div>
      <div className="output">

      </div>
    </div>
  );
}

export default Main;