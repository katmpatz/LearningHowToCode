import React from 'react';
import CodingView from './codingView';
import CommandModel from '../command/commandModel';
import useModelProperty from '../customHook';
import { LocalPrintshopSharp } from '@material-ui/icons';
import { DinnerDining } from '@mui/icons-material';



function CodingPresenter(props) {

  const blocks = useModelProperty(props.model, "levelBlocks");
  const windowVariables = useModelProperty(props.model, "windowVariables");
  const rocketPosition = useModelProperty(props.model, "rocketPosition");
  const commands = useModelProperty(props.model, "levelCommands");
  const checkPoints = useModelProperty(props.model, "checkPoints");
  const stepsStars = useModelProperty(props.model, "stepsStars");
  const stars = useModelProperty(props.model, "stars");
  const level = useModelProperty(props.model, "curentLevel");
  const levelTitle = useModelProperty(props.model, "levelTitle");
  const levelIstructions = useModelProperty(props.model, "levelIstructions");

  let repeat = 1; //value from select in for 

  let validCheckPoints = [];
  let itemsInsideFoor = [];

  let pandaCPos = [];
  let actionSequence = [];

  const heightB = 40; //the height of a block/command 
  const [id, setId] = React.useState(1);


  function onDragStart(ev, id) {
    ev.dataTransfer.setData("id", id);
  }

  function onDragOver(ev) {
    ev.preventDefault();
  }

  function onDragOverDelete(ev) {
    ev.preventDefault();
  }

  function onDragStartDelete(ev, id) {
    ev.dataTransfer.setData("id", id);
    console.log("onDragStartDelete", id)
  }

  function drawCommands() {
    let top = 150;
    commands.sort(function (a, b) { return a.order - b.order }).forEach((cm) => {
      cm.top = top;
      top = top + heightB;
    })
    return commands;
  }


  function moveOrderUp(index) {
    commands.sort(function (a, b) { return a.order - b.order }).slice(index - 1)
      .forEach((cm, i) => {
        cm.order = cm.order - 1;
        //console.log( cm.name + cm.id + ": " +  cm.order);
      });

    let cmd = commands;

    props.model.setCommands([...cmd])
  }

  function moveOrderDown(index) {
    //Interaction with 
    commands.sort(function (a, b) { return a.order - b.order }).slice(index - 1)
      .forEach((cm, i) => {
        cm.order = cm.order + 1;
        //console.log( cm.name + cm.id + ": " +  cm.order);
      });

    let cmd = commands;
    props.model.setCommands([...cmd])
  }

  function onDrop(ev) {
    let idc = 0, top = 0;
    console.log("dropY: " + ev.clientY);
    //position when the user drop the item
    const dropY = ev.clientY;
    let bname = ev.dataTransfer.getData("id");
    //get the selected block
    let bl = blocks.find(element => element.name === bname);
    console.log("bkl: " + JSON.stringify(bl));
    if (bl === null || bl === undefined) {
      let c1 = commands.find(element => element.id == bname);
      //find the element which includes the drop position
      for (let i = 1; i < commands.length; i++) {
        if (dropY >= commands[i - 1].top + 20 && dropY <= commands[i].top + 20) {
          //place the element in its position
          commands[c1.order].order = i - 1;
          // console.log("Order: " + (i - 1));
          //move up or down the rest elements 
          if (c1.top >= commands[i - 1].top) {
            let j = i - 1;
            commands.sort(function (a, b) { return a.order - b.order }).slice(i - 1)
              .forEach((cm) => { cm.order = j++ })
          } else {
            let k = 0;
            commands.sort(function (a, b) { return a.order - b.order }).slice(0, i - 1)
              .forEach((cm) => { cm.order = k++ })
          }
        }
      }
    } else {

      //set the name and the category of the command
      let name = bl.name;
      let category = bl.category;
      let select = bl.select;

      let index = commands.length;
      //console.log("Index1: " + index);
      //set the default position as the position after the last command
      let minDifferenceTop = commands.slice(-1)[0].top;

      //if the user drop the block between the first and the klast command
      if (dropY < minDifferenceTop && dropY > commands[0].top) {
        //console.log("dropY < minDifferenceTop && dropY > commands[0].top" );
        //find the closest command at the drop position
        for (let i = 1; i < commands.length; i++) {
          if (dropY >= commands[i - 1].top + heightB / 2 && dropY <= commands[i].top + heightB / 2) {
            minDifferenceTop = commands[i].top;
            //console.log("minDifferenceTop : " + minDifferenceTop );
            //add the item on the bottom of the current one
            index = i;
            //console.log("Index2: " + index);
          }
        }
        //place it on the bottom of the element that the user drop the block
        top = minDifferenceTop;
        //change the order of the commands after it 
        moveOrderDown(index + 1);
      } else {
        //place it on the bottom of the last element
        top = minDifferenceTop + heightB / 2;
      }

      idc = id;
      setId(idc += 1);
      //console.log("Top " + top);

      // create new command object 
      const c = new CommandModel(idc, index, name, category, top, select);

      //add command at the list
      commands.splice(index, 0, c);


    }
    //console.log(commands);
    //get the commands with the position based on their order
    let cmd = drawCommands();
    props.model.setCommands([...cmd])
  }

  function onDropDelete(ev) {
    let id = ev.dataTransfer.getData("id");
    //console.log("id:"+ id);
    const bl = commands.find(element => element.id == id);
    //console.log("bl.name:" + bl.name + bl.id);

    const index = commands.indexOf(bl);
    commands.splice(index, 1);
    moveOrderUp(index + 1)
    const cmd = drawCommands();

    //console.log(commands)

    props.model.setCommands([...cmd])
  }


  function insideCommand(c) {
    //check if the command is inside an if or loop block 
    let inside = false
    for (let i = 1; i < c.order; i++) {
      if (commands[i].name === 'If' || commands[i].name === 'Repeat') {
        inside = true;
      }
      if (commands[i].name === 'End If' || commands[i].name === 'End Repeat') {
        inside = false;
      }
    }
    if (c.name === 'End If' || c.name === 'End Repeat') {
      inside = false;
    }
    console.log(inside)
    return inside;
  }

  function setBgColor(category) {
    //set colors based on the category
    if (category === 'move') {
      return '#f55688';
    } else if (category === 'if' || category === 'ifEnd') {
      return '#FBBB40';
    } else if (category === 'loop' || category === 'loopEnd') {
      return '#51ceff';
    } else {
      return '#00B695';
    }
  }


  function setBrColor(category) {
    //set colors based on the category
    if (category === 'move') {
      return '#e02062';
    } else if (category === 'if' || category === 'ifEnd') {
      return '#CF931E';
    } else if (category === 'loop' || category === 'loopEnd') {
      return '#5a9cff';
    } else {
      return '#0f816c';
    }
  }

  function runCode() {
    // Gets the code and animate step by step
    //Starts with 1 because 0 is "When play"
    //var pos = [parseInt(rocketPosition.left),parseInt(rocketPosition.right)]//
    var pos = [rocketPosition.row, rocketPosition.column];

    console.log(" RUN CODE: ")
    var limits = [5, 5];
    commands.forEach((cm, i) => {
      console.log("Action: " + cm.name);
      switch (cm.name) {
        case "When play":
          //Reset values
          pandaCPos = [3, 5]; // update to panda position in model
          actionSequence = [];
          break;
        case "If":
          break;
        case "End If":
          break;
        case "Repeat":
          let endlist = [];
          let endPos = -1;
          const repeatTimes = repeat; // Katerina here the value from the combos box
          console.log("repeatTimes:" + repeatTimes);
          console.log("repeat:" + repeat);

          //Get all items from the list of commands that have the End Repeat block
          endlist = [commands.findIndex(o => o.name == "End Repeat")];//itemsInsideFoor.push(cm);

          if (endlist.length <= 0) { // if there is no "End Repeat"
            gameEvalution(); //End game
            break;
          }
          console.log("NOW THERE ARE:" + endlist.length + " and i is: " + i);

          endlist.forEach((m, l) => { //Get the next "End Repeat after the Start Repeat"
            if (m > i) {
              endPos = m;
            }
          });

          console.log("m = " + endPos);
          // Check if the position of "End Repeat" is invalid
          if (endPos == -1) {
            gameEvalution();//End game
            break;
          }

          //Do the Foor Loop
          for (let j = 0; j < (repeatTimes - 1); j++) {
            for (let k = i; k < endPos; k++) {
              console.log("DOING: " + commands[i + 1].name + " for " + k);
              commandMove(commands[k].name);
            }
          }
          i = i + endPos;//continue the flow with the next item
          break;
        case "End Repeat":
          break;
        case "Give Strawberry":
          break;
        case "Give Carrot":
          break;
        case "Give Banana":
          break;
        default:
          commandMove(cm.name);
      }
      // moveUp(1) 

    });

    gameEvalution();

  }


  function commandMove(direction) {
    switch (direction) {
      case "Move Up":
        pandaCPos = [pandaCPos[0], pandaCPos[1] - 1];
        actionSequence.push("bottom");//, pandaCPos);//["MoveUp", parseInt(pos[0]), parseInt(pos[1]) + 1]);
        break;
      case "Move Down":
        pandaCPos = [pandaCPos[0], pandaCPos[1] + 1];
        actionSequence.push("top");//, pandaCPos);//(["MoveDown", parseInt(pos[0]), parseInt(pos[1]) - 1]);
        break;
      case "Move Right":
        pandaCPos = [pandaCPos[0] + 1, pandaCPos[1]];
        actionSequence.push("left");//, pandaCPos);//["MoveRight", parseInt(pos[0]) + 1, parseInt(pos[1])]);
        break;
      case "Move Left":
        pandaCPos = [pandaCPos[0] - 1, pandaCPos[1]];
        actionSequence.push("right");//, pandaCPos);//["MoveLeft", parseInt(pos[0]) - 1, parseInt(pos[1])]);
        break;
    }
    evaluateCheckpoint();
    console.log("to " + pandaCPos);
  }

  function evaluateCheckpoint() {
    //var currentCP = checkPoints[0];//validCheckPoints.length];
    checkPoints.forEach((currentCP, i) => {


      console.log("Checkpoint" + currentCP)
      console.log("Current point " + pandaCPos);
      if (currentCP[0] == pandaCPos[0] && currentCP[1] == pandaCPos[1]) {
        console.log("Made it to a checkpoint");
        validCheckPoints.push("1");
      } else {
        // console.log("no");
      }
    });
  }

  function playAnimation() {

    let id = null;
    let elem = document.getElementById("rocket");
    if (elem == null) {
      elem = document.getElementById("rocket1");
    }
    if (elem == null) {
      elem = document.getElementById("rocket2");
    }
    let direction = null;
    let after, itemListAction = 0, d = 0;
    const initX = parseInt(rocketPosition.bottom);
    const initY = parseInt(rocketPosition.right);

    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (direction == null && d < actionSequence.length) {
        itemListAction = actionSequence[d];
        switch (itemListAction) {
          case "bottom":
            direction = parseInt(rocketPosition.bottom);
            after = parseInt(direction + windowVariables.sqh);
            break;
          case "top":
            direction = parseInt(rocketPosition.bottom);
            after = parseInt(direction - windowVariables.sqh);
            //direction = parseInt(rocketPosition.top);
            // after = parseInt(direction + windowVariables.sqh);
            break;
          case "right":
            direction = parseInt(rocketPosition.right);
            after = parseInt(direction + windowVariables.sqw);
            break;
          case "left":
            direction = parseInt(rocketPosition.right);
            after = parseInt(direction - windowVariables.sqw);
            break;
          default:

        }
      } else if (direction === after) {

        d++;
        direction = null;
      } else if (direction === null && d == actionSequence.length) {
        console.log("end of animation");
        //elem.style.bottom = initX + 'px';
       // elem.style.right = initY + 'px';
        clearInterval(id);

      } else {
        itemListAction = actionSequence[d];
        console.log("Animate : " + itemListAction);
        switch (itemListAction) {
          case "bottom":
            direction++;
            rocketPosition.bottom = direction;
            elem.style.bottom = direction + "px";
            break;
          case "top":
            direction--;
            rocketPosition.bottom = direction;
            elem.style.bottom = direction + "px";
            break;
          case "right":
            direction++;
            rocketPosition.right = direction;
            elem.style.right = direction + "px";
            break;
          case "left":
            direction--;
            rocketPosition.right = direction;
            elem.style.right = direction + "px";
            break;
          default:
        }
      }
    }
  }


  function gameEvalution() {
    playAnimation();
    console.log(checkPoints);
    //Evaluate if the amount of Valid checkpoints matches the level checkpoint
    if (validCheckPoints.length == checkPoints.length) {
      //Now that the user pas, we will check how many stars his program should get
      //There is no right or wrong way to do it, we just evaluate the lenght of code
      console.log(stepsStars);
      switch (commands.length - 1) {
        case stepsStars[0]:
          props.model.setStars(3);
          break;
        case stepsStars[1]:
          props.model.setStars(2);
          break;
        default:
          props.model.setStars(1);
      }
    } else {
      console.log("you didn't found all of the checkpoints, sorry, try again");
      props.model.setStars(0);
    }
    console.log("stars: " + stars);
  }

  function nextLevel() {
    props.model.setCurentLevel(level + 1);
  }

  function selectChange(e, category) {
    let { name, value } = e.target;
    console.log("name: " + name + "value: " + value);
    if (category = "loop") {
      repeat = parseInt(value);
    }
    //if value == null means that the user didn't change the defauklt vaklue which is 1
  }

  return (
    <CodingView
      model={props.model}
      levelTitle={levelTitle}
      levelIstructions={levelIstructions}
      blocks={blocks}
      commands={commands}
      onDragOverDelete={(e) => onDragOverDelete(e)} //command
      insideCommand={(c) => insideCommand(c)} //command
      setBgColor={(category) => setBgColor(category)} //command
      setBrColor={(category) => setBrColor(category)} //command
      onDrop={(e) => onDrop(e)}
      onDragOver={(e) => onDragOver(e)}
      onDropDelete={(e) => onDropDelete(e)}
      onDragStart={(ev, id) => onDragStart(ev, id)}
      onDragStartDelete={(ev, id) => onDragStartDelete(ev, id)}
      myMove={() => runCode()}
      stepsStars={stepsStars}
      stars={stars}
      level={level}
      selectChange={(e) => selectChange(e)}
    //openModal={() => handleClickOpen}
    />
  );


}

export default CodingPresenter;