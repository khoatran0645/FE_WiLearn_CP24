import React, { useEffect, useRef, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BE_URL } from "../../../constants";
import { useParams } from "react-router-dom";
// import { RoomContext } from 'src/context/roomContext';

const WhiteBoard = (props) => {
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const colorRef = useRef(null);
  let drawings = []

  const { meetingId } = useParams();

  const clearMousePositions = () => {
    last_mousex = 0;
    last_mousey = 0;
  };
  const color = document.getElementById("color");
  const circle = document.getElementById('circle');
  const size = document.getElementById("size");
  const [canvasContext, setCanvasContext] = useState();
  const [textContext, setTextContext] = useState();
  // let textContext;
  const [canvasX, setCanvasX] = useState();
  const [canvasY, setCanvasY] = useState();

  const username = localStorage.getItem("userName");
  // const [meetHub, setMeetHub] = useState();
  let meetHub;
  var last_mousex = 0;
  var last_mousey = 0;
  var mousex = 0;
  var mousey = 0;
  var mousedown = false;

  const canvasMouseMove = (e) => {
    mousex = parseInt(e.clientX - canvasX + window.scrollX);
    mousey = parseInt(e.clientY - canvasY + window.scrollY);
    var clr = color.value;
    var brushSize = size.value;

    if (last_mousex > 0 && last_mousey > 0 && mousedown) {
      drawCanvas(mousex, mousey, last_mousex, last_mousey, clr, brushSize, username);
      meetHub.invoke(
        "draw",
        last_mousex,
        last_mousey,
        mousex,
        mousey,
        clr,
        parseInt(brushSize)
      );
    }
    last_mousex = mousex;
    last_mousey = mousey;
    showNames();
  };

  const drawCanvas = (prev_x, prev_y, x, y, clr, brushSize, username) => {
    const drawing = {
      x: prev_x,
      y: prev_y,
      r: brushSize,
      color: clr,
      uname: username
    }
    drawings.push(drawing)
    // console.log('draw')
    canvasContext.beginPath();
    // console.log(`PREV X: ${prev_x}, PREV Y: ${prev_y}`);
    // console.log(`X: ${x}, Y: ${y}`);
    canvasContext.globalCompositeOperation = "source-over";
    canvasContext.strokeStyle = clr;
    // canvasContext.lineWidth = 3;
    if (clr == "white") {
      brushSize = brushSize * 10;
    }
    canvasContext.lineWidth = brushSize;
    canvasContext.moveTo(prev_x, prev_y);
    canvasContext.lineTo(x, y);
    canvasContext.lineJoin = canvasContext.lineCap = "round";
    canvasContext.stroke();
    //yt
    canvasContext.closePath();
    canvasContext.save();

    // setOutput(`from: ${prev_x}, ${prev_y}<br/>last: ${x}, ${y}<br/>color: ${clr}`);
  };
  const canvasMouseUp = () => {
    mousedown = false;
    // circle.style.zIndex = null;
  };
  const canvasMouseDown = (e) => {
    last_mousex = parseInt(e.clientX - canvasX + window.scrollX);
    mousex = parseInt(e.clientX - canvasX + window.scrollX);
    last_mousey = parseInt(e.clientY - canvasY + window.scrollY);
    mousey = parseInt(e.clientY - canvasY + window.scrollY);

    mousedown = true;
  };

  const newConnection = () => {
    const accessTokenFactory = localStorage.getItem("token");
    // const urlParts = window.location.href.split("/");
    // const meetingId = urlParts[urlParts.length - 2];
    const hubConnection = new HubConnectionBuilder()
      .withUrl(
        BE_URL + "/hubs/drawhub?meetingId=" + meetingId,
        {
          accessTokenFactory: () => accessTokenFactory,
        }
      )
      .withAutomaticReconnect()
      .build();
    hubConnection.start().catch((err) => console.log(err));
    hubConnection.on("draw", (prev_x, prev_y, x, y, color, size, username) => {
      drawCanvas(prev_x, prev_y, x, y, color, size, username);
    });

    hubConnection.on("get-drawings", (drawings) => {
      // alert("get-drawings")
      console.log("get-drawings", drawings)
      drawings.forEach((d) => {
        drawCanvas(d.prevX, d.prevY, d.currentX, d.currentY, d.color, d.size, d.username);
      });
    });
    console.log('hubConnection', hubConnection);
    return hubConnection;
  };
  meetHub = newConnection();

  useEffect(() => {
    // toast.success('Đã vào bảng trắng');
    clearMousePositions();
    const canvas = canvasRef.current;

    var sizeWidth = 100 * window.innerWidth / 100 - 10 || 800;//-2 cái border
    var sizeHeight = 85 * window.innerHeight / 100 || 800;

    //Setting the canvas site and width to be responsive 
    canvas.width = sizeWidth;
    canvas.height = sizeHeight;
    canvas.style.width = sizeWidth;
    canvas.style.height = sizeHeight;

    const textVas = textRef.current;

    textVas.width = sizeWidth;
    textVas.height = sizeHeight;
    textVas.style.width = sizeWidth;
    textVas.style.height = sizeHeight;

    // textVas.top = canvas.offsetTop;
    // textVas.top = "10000px";
    textVas.style.top = canvas.offsetTop+"px";
    textVas.style.left = canvas.offsetLeft+"px";
    // textVas.style.top = "10000px";

    console.log("textVas", textVas)

    setCanvasX(canvas.offsetLeft);
    setCanvasY(canvas.offsetTop);

    setCanvasContext(canvas.getContext("2d"));
    // textContext=canvas.getContext("2d");
    setTextContext(textVas.getContext("2d"));
    // if(!meetHub){

    //   const meetHub = newConnection();
    //   setMeetHub(meetHub);
    // }
  }, [meetingId]);
  const moveCircle = (e) => {
    circle.style.left = `${e.clientX + window.scrollX - size.value / 2}px`;
    circle.style.top = `${e.clientY + window.scrollY - size.value / 2}px`;
    // circle.style.left = `${e.clientX }px`;
    // circle.style.top = `${e.clientY }px`;
    // circle.style.left = e.clientX - 48 + 'px';
    // circle.style.top = e.clientY - 48 + 'px';
  };
  const changeCircleSize = () => {
    circle.style.width = size.value + 'px';
    circle.style.height = size.value + 'px';
  };
  const changeCircleColor = () => {
    circle.style.backgroundColor = color.value;
  };

  function dist(x1, y1, x2, y2) {
    // console.log("dist", {x1, y1, x2, y2})
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  const showNames = ()=>{
      const goodDrawings = drawings.filter(d=>dist(d.x, d.y, mousex, mousey)<d.r).map(d=>({color: d.color, uname: d.uname}));
      const uniqueGoodDrawings = unique(goodDrawings,["color", "uname"])
      textContext.clearRect(0, 0, window.innerWidth, window.innerWidth);
      if(uniqueGoodDrawings.length>0) {
        console.log("goodDrawings", uniqueGoodDrawings)
        let names = uniqueGoodDrawings.map(d=>d.uname).join(", ")
        textContext.font = "15px Comic Sans MS";
        let startX = mousex+10

        // textContext.fillStyle = "black";
        // textContext.textAlign = "center";
        // textContext.fillText(names, startX, mousey+5)
        let backgroundLength = textContext.measureText(uniqueGoodDrawings.map(d=>d.uname).join(" ")).width;
        textContext.fillStyle = "rgba(255,255,255,.5)";
        textContext.fillRect(mousex+5, mousey-10, backgroundLength+10, 25);

        uniqueGoodDrawings.forEach(d => {
          textContext.fillStyle = d.color;
          textContext.fillText(d.uname+ " ", startX, mousey+5)
          startX += textContext.measureText(d.uname+" ").width;
        });
      }
  }
  function unique(arr, keyProps) {
    const kvArray = arr.map(entry => {
     const key = keyProps.map(k => entry[k]).join('|');
     return [key, entry];
    });
    const map = new Map(kvArray);
    return Array.from(map.values());
   }
  const genSizeOpt = () => {
    // const mult = color?.value==='white'? 10 : 1;
    return Array.from({ length: 100 }, (_, i) => i + 1).map(i => (
      // <option value={mult*i}>{mult*i}px</option>
      <option key={i} value={i}>{i}px</option>
    ))
  };
  return (
    <>
      {/* <h1>Bảng trắng</h1> */}
      <select id="color" onChange={changeCircleColor}>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="white">Eraser(x10 size)</option>
      </select>
      <select id="size" defaultValue={20} onChange={changeCircleSize}>
        {genSizeOpt()}
      </select>
      <div
        onMouseMove={moveCircle}
        style={{
          width: "100vw",
          // position: "relative"
          // alignItems: "center",
          // border: "3px solid blue",
        }}
      >
        <div id="circle"
          style={{
            width: '20px',
            height: '20px',
            opacity: 0.25,
            backgroundColor: 'black',
            borderRadius: '50%',
            border: '2px solid black',
            position: 'absolute',
            cursor: "crosshair",
            zIndex: -1
          }}
        //#region old code 
        // onMouseUp={()=>{
        //   circle.style.zIndex = 2;
        // }}
        // onMouseDown={()=>{
        //   circle.style.zIndex = -1;
        // }}
        // onMouseMove={canvasMouseMove}
        // onMouseUp={canvasMouseUp}
        // onMouseDown={canvasMouseDown}
        //#endregion
        />
        
        <canvas
          id="canvas"
          onMouseUp={canvasMouseUp}
          onMouseDown={canvasMouseDown}
          onMouseOut={clearMousePositions}
          onMouseMove={canvasMouseMove}
          ref={canvasRef}
          style={{
            cursor: "crosshair",
            border: "1px solid #000000",
          }}
        ></canvas>
        <canvas 
          id="text"
          onMouseUp={canvasMouseUp}
          onMouseDown={canvasMouseDown}
          onMouseOut={clearMousePositions}
          onMouseMove={canvasMouseMove}
          ref={textRef}
          style={{
            cursor: "crosshair",
            border: "2px solid red",
            position:"absolute",
            // zIndex:-5
          }}
        ></canvas>
      </div>
    </>
  );
};

export default WhiteBoard;
