import React, { useEffect, useRef, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BE_URL } from "../../../constants";
import { useParams } from "react-router-dom";
// import { RoomContext } from 'src/context/roomContext';

const WhiteBoard = (props) => {
  const canvasRef = useRef(null);
  const colorRef = useRef(null);

  const { meetingId } = useParams();
  
  const clearMousePositions = () => {
    last_mousex = 0;
    last_mousey = 0;
  };
  const color = document.getElementById("color");
  const circle = document.getElementById('circle');
  const size = document.getElementById("size");
  const [canvasContext, setCanvasContext] = useState();
  const [canvasX, setCanvasX] = useState();
  const [canvasY, setCanvasY] = useState();
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
      drawCanvas(mousex, mousey, last_mousex, last_mousey, clr, brushSize);
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
  };

  const drawCanvas = (prev_x, prev_y, x, y, clr, brushSize) => {
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
      // .withUrl('http://localhost:8000/hubs/meetinghub?tempConnection=ok&meetingId=' + roomId, {
      .withUrl(
        // BE_URL + "/hubs/meetinghub?tempConnection=ok&meetingId=" + roomId,
        BE_URL + "/hubs/drawhub?meetingId=" + meetingId,
        {
          accessTokenFactory: () => accessTokenFactory,
        }
      )
      .withAutomaticReconnect()
      .build();
    hubConnection.start().catch((err) => console.log(err));
    hubConnection.on("draw", (prev_x, prev_y, x, y, color, size) => {
      drawCanvas(prev_x, prev_y, x, y, color, size);
    });

    hubConnection.on("get-drawings", (drawings) => {
      // alert("get-drawings")
      console.log("get-drawings", drawings)
      drawings.forEach((d) => {
        drawCanvas(d.prevX, d.prevY, d.currentX, d.currentY, d.color, d.size);
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
    setCanvasX(canvas.offsetLeft);
    setCanvasY(canvas.offsetTop);

    setCanvasContext(canvas.getContext("2d"));
    // if(!meetHub){

    //   const meetHub = newConnection();
    //   setMeetHub(meetHub);
    // }
  }, [meetingId]);
  const moveCircle = (e) => {
    circle.style.left = `${e.clientX + window.scrollX - size.value/2}px`;
    circle.style.top = `${e.clientY + window.scrollY - size.value/2}px`;
    // circle.style.left = `${e.clientX }px`;
    // circle.style.top = `${e.clientY }px`;
    // circle.style.left = e.clientX - 48 + 'px';
    // circle.style.top = e.clientY - 48 + 'px';
  };
  const changeCircleSize = () => {
    circle.style.width=size.value+'px';
    circle.style.height=size.value+'px';
  };
  const changeCircleColor = () => {
    circle.style.backgroundColor=color.value;
  };
  const genSizeOpt = () => {
    // const mult = color?.value==='white'? 10 : 1;
    return Array.from({length: 100}, (_, i) => i + 1).map(i => (
      // <option value={mult*i}>{mult*i}px</option>
      <option key={i} value={i}>{i}px</option>
    ))
  };
  return (
    <>
      <h1>Bảng trắng</h1>
      <select id="color" onChange={changeCircleColor}>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="white">Eraser(x10 size)</option>
      </select>
      <select id="size" defaultValue={20} onChange={changeCircleSize}>
        {/* <option value="1">1px</option>
        <option value="2">2px</option>
        <option value="3">3px</option>
        <option value="4">4px</option>
        <option value="5">5px</option>
        <option value="6">6px</option>
        <option value="7">7px</option>
        <option value="8">8px</option>
        <option value="9">9px</option>
        <option value="10">10px</option>
        <option value="11">11px</option>
        <option value="12">12px</option>
        <option value="13">13px</option>
        <option value="14">14px</option>
        <option value="15">15px</option>
        <option value="16">16px</option>
        <option value="17">17px</option>
        <option value="18">18px</option>
        <option value="19">19px</option>
        <option value="20">20px</option> */}
        {genSizeOpt()}
      </select>
      <div onMouseMove={moveCircle}>
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
          // onMouseUp={()=>{
          //   circle.style.zIndex = 2;
          // }}
          // onMouseDown={()=>{
          //   circle.style.zIndex = -1;
          // }}
          // onMouseMove={canvasMouseMove}
          // onMouseUp={canvasMouseUp}
          // onMouseDown={canvasMouseDown}
        />
        <canvas
          id="canvas"
          height="5000"
          width="5000"
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
      </div>
    </>
  );
};

export default WhiteBoard;
