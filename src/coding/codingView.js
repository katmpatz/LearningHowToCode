import '../Main.css';
import React, { Component } from 'react' ;
import Block from '../block/blockPresenter';
import Command from '../command/commandPresenter';
import SimpleDialog from '../dialog';
import {ReactComponent as HelpIcon} from '../help.svg';
import {ReactComponent as DeleteIcon} from '../delete.svg';
import {ReactComponent as PlayIcon} from '../play_arrow.svg';

function CodingView(props) {
  
    let blocks = []
    let commands = []

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
    };

  props.blocks.forEach ((b, i) => {
    blocks.push(
      <div key={b.name + i} style={{marginBottom: 15}}>
        <Block name={b.name} category={b.category} select={b.select}/>
      </div>
    );
  });

  props.commands.forEach ((c) => {
    commands.push(
      <div key={c.id} 
      style={{top: c.top,  position: 'absolute'}} 
      onDragOver={(e)=>props.onDragOverDelete(e)} 
      onDragStart={(e)=>props.onDragStartDelete(e, c.id)}>
        <div className={c.name === "If" || c.name === "loop" ? "command-select" : "command"} 
             id={props.insideCommand(c) ? "inside" : ""} 
             draggable
             style = {{backgroundColor: props.setBgColor(c.category), borderColor: props.setBrColor(c.category)}}>
                <span id="label">{c.name}</span>
                {c.select.length > 0 &&
                    <select id="select" onChange={(e) => props.selectChange(e, c.category)} defaultValue={'1'}>
                        {c.select.map((x,y) => 
                          <option key={y} value={x}>{x}</option>
                        )}
                     </select>
                }
            </div>
          </div>
      // <Command id={c.id} name={c.name} category={c.category} top={c.top} select={c.select} order={c.order}/>
    );
  });

  return (
    <div className="coding">
      <div className="sidebar">
        <h3>Actions</h3>
        <div className="wip">
          {blocks}
        </div>
      </div>
      <div className="coding-panel">
        <div className="description">
            <h3>Level {props.level}: {props.levelTitle}</h3>
            <p>{props.levelIstructions} </p>
            <p>Drag and drop the actions here:</p>
        </div>
        <div className="commands">
              <div className="droppable" 
                    onDrop={(e)=>props.onDrop(e)}>
                     {commands}
              </div>
        </div>
        <div className="buttons-panel">
          <div className="delete-panel" onDragOver={(e)=>props.onDragOver(e)} onDrop={(e)=>props.onDropDelete(e)}>
            <DeleteIcon id="delete"/>
          </div>
          <div className="action-panel">
            <button 
              onClick={handleClickOpen} 
              id="help-btn" 
              className="round-btn">
              <HelpIcon/>
            </button>
            <button onClick={props.myMove} id="play-btn" className="round-btn"><PlayIcon id="play-icon"/></button>
          </div>
        </div>
      </div>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        stars={props.stars}
        level={props.level}
        model = {props.model} 
      />
    </div>
  );
}

export default CodingView;
