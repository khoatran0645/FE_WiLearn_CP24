import React, { useEffect, useRef, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BE_URL } from "../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadMeetingCanvas } from "../../../app/reducer/studyGroupReducer/studyGroupActions";
import { toast } from "react-toastify";
// import { RoomContext } from 'src/context/roomContext';

const WhiteBoard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const colorRef = useRef(null);
  let drawings = []

  const { groupId, meetingId } = useParams();
  let isLead = false;
  const { userInfo } = useSelector((state) => state.user);
  try{
    let leadGroups = [];
    if (userInfo) {
      leadGroups = userInfo.leadGroups ? userInfo.leadGroups : [];
    }
    isLead = leadGroups.some((g) => g.id == parseInt(groupId));
    }
  catch(ex){
    alert(ex)
  }

  const color = document.getElementById("color");
  const circle = document.getElementById('circle');
  const size = document.getElementById("size");
  const [canvasContext, setCanvasContext] = useState();
  const [textContext, setTextContext] = useState();
  const [canvasX, setCanvasX] = useState();
  const [canvasY, setCanvasY] = useState();
  
  const clearMousePositions = () => {
    last_mousex = 0;
    last_mousey = 0;
    if(circle){circle.style.display='none'}
  };
  const username = localStorage.getItem("userName");
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
    if(clr=="white"){
      for (var i = 0; i < drawings.length; i++) {
        if(dist(drawings[i].x, drawings[i].y, prev_x, prev_y)<brushSize*5){
          drawings.splice(i,1);
          // console.log(`Eraser remove`, {prev_x, prev_y})
        }
      }
    }else{
      drawings.push(drawing)
    }
    canvasContext.beginPath();
    canvasContext.globalCompositeOperation = "source-over";
    canvasContext.strokeStyle = clr;
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

  };
  const canvasMouseUp = () => {
    mousedown = false;
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
    const userName = localStorage.getItem("userName")
    const hubConnection = new HubConnectionBuilder()
      .withUrl(
        "https://www.groupstudy.somee.com/hubs/drawhub?meetingId=" + meetingId+"&username="+userName,
        {
          accessTokenFactory: () => accessTokenFactory,
        }
      )
      .withAutomaticReconnect()
      .build();
    hubConnection.start().catch((err) => console.log(err));
    hubConnection.on("MeetingEnd", () => {
      // toast.info("Meeting ended")
      navigate("/groups/"+groupId);
    })
    hubConnection.on("draw", (prev_x, prev_y, x, y, color, size, username) => {
      drawCanvas(prev_x, prev_y, x, y, color, size, username);
    });

    hubConnection.on("get-drawings", (drawings) => {
      // alert("get-drawings")
      textRef.current.style.borderColor = "green"
      // canvasRef.current.style.borderColor = "green"
      // toast.info("Connected to meeting white board")
      console.log("get-drawings", drawings)
      drawings.forEach((d) => {
        drawCanvas(d.prevX, d.prevY, d.currentX, d.currentY, d.color, d.size, d.username);
      });
    });
    console.log('hubConnection', hubConnection);
    return hubConnection;
  };
  meetHub = newConnection();

  window.onresize=()=>{
    clearMousePositions();
    const canvas = canvasRef.current;

    var sizeWidth = 100 * window.innerWidth / 100 - 15 || 800;//-2 cái border
    var sizeHeight = 85 * window.innerHeight / 100 || 800;

    // Setting the canvas site and width to be responsive 
    canvas.width = sizeWidth;
    canvas.height = sizeHeight;
    canvas.style.width = sizeWidth;
    canvas.style.height = sizeHeight;

    const textVas = textRef.current;

    textVas.width = sizeWidth;
    textVas.height = sizeHeight;
    textVas.style.width = sizeWidth;
    textVas.style.height = sizeHeight;
  }

  useEffect(() => {
    // toast.success('Đã vào bảng trắng');
    clearMousePositions();
    const canvas = canvasRef.current;

    var sizeWidth = 100 * window.innerWidth / 100 - 15 || 800;//-2 cái border
    var sizeHeight = 85 * window.innerHeight / 100 || 800;

    // Setting the canvas site and width to be responsive 
    canvas.width = sizeWidth;
    canvas.height = sizeHeight;
    canvas.style.width = sizeWidth;
    canvas.style.height = sizeHeight;

    const textVas = textRef.current;

    textVas.width = sizeWidth;
    textVas.height = sizeHeight;
    textVas.style.width = sizeWidth;
    textVas.style.height = sizeHeight;

    textVas.style.top = canvas.offsetTop+"px";
    textVas.style.left = canvas.offsetLeft+"px";

    console.log("textVas", textVas)

    setCanvasX(canvas.offsetLeft);
    setCanvasY(canvas.offsetTop);

    setCanvasContext(canvas.getContext("2d"));
    setTextContext(textVas.getContext("2d"));
  }, [meetingId]);
  const moveCircle = (e) => {
    if(color.value!="white"){
      circle.style.left = `${e.clientX + window.scrollX - size.value / 2}px`;
      circle.style.top = `${e.clientY + window.scrollY - size.value / 2}px`;
     
    }else{
      circle.style.left = `${e.clientX + window.scrollX - size.value * 5}px`;
      circle.style.top = `${e.clientY + window.scrollY - size.value * 5}px`;
    }
  };
  const changeCircleSize = () => {
    if(color.value!="white"){
      circle.style.width = size.value + 'px';
      circle.style.height = size.value + 'px';
    }else{
      circle.style.width = size.value*10 + 'px';
      circle.style.height = size.value*10 + 'px';
    }
  };
  const changeCircleColor = () => {
    if(color.value!="white"){
      circle.style.backgroundColor = color.value;
    }else {
      circle.style.backgroundColor = "black"
    }
    changeCircleSize();
  };

  function dist(x1, y1, x2, y2) {
    // console.log("dist", {x1, y1, x2, y2})
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  const showNames = ()=>{
      // const goodDrawings = drawings.filter(d=>dist(d.x, d.y, mousex, mousey)<d.r/1.5).map(d=>({color: d.color, uname: d.uname}));
      const goodDrawings = drawings.filter(d=>dist(d.x, d.y, mousex, mousey)<d.r/2+3).map(d=>({color: d.color, uname: d.uname}));
      const uniqueGoodDrawings = unique(goodDrawings,["color", "uname"])
      textContext.clearRect(0, 0, window.innerWidth, window.innerWidth);
      if(uniqueGoodDrawings.length>0) {
        let names = uniqueGoodDrawings.map(d=>d.uname).join(", ")
        textContext.font = "15px Comic Sans MS";
        let startX = mousex+10

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
   const SaveToComputer = ()=>{
    alert("SaveToComputer")
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = canvasRef.current;
    canvas.toBlob(function(blob){
      console.log("blob", blob);
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    }); 
   }
   const SaveToGroup = async()=>{
    alert("SaveToGroup")
    let canvas = canvasRef.current;
    canvas.toBlob(async function(blob){
      console.log("blob", blob);
      var response = await dispatch(uploadMeetingCanvas({id: meetingId, file: blob}));
      if(response.type===uploadMeetingCanvas.fulfilled.type){
        toast.success("Save whiteboard successfully");
      }else {
        toast.error("Something went wrong with saving whiteboard")
        alert(response.payload.type)
        console.log("uploadMeetingCanvas res", response)
        toast.error(response.payload)
        response.payload.failures.forEach(fail => {
          toast.error(fail)
        });
      }
      let url = URL.createObjectURL(blob);
    }); 
   }
  //  const
  return (
    <div style={{
      marginLeft: 5
    }}>
      {/* <h1>Bảng trắng</h1> */}
      <div style={{marginBottom: 5}}>
      <select id="color" onChange={changeCircleColor} style={{marginRight: 5, zIndex: 100}}>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="white">Eraser(x10 size)</option>
      </select>
      <select id="size" defaultValue={20} onChange={changeCircleSize} style={{marginRight: 5, zIndex: 100}}>
        {genSizeOpt()}
      </select>
      {isLead && (<button onClick={SaveToGroup} style={{marginRight: 5, zIndex: 100}}>Save to group</button>)}
      <button onClick={SaveToComputer} style={{marginRight: 5, zIndex: 100}}>Save to computer</button>
      </div>
      <div
        onMouseMove={moveCircle}
        style={{
          width: "95vw",
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
            // zIndex: -1
          }}
        />
        
        <canvas
          id="canvas"
          onMouseUp={canvasMouseUp}
          onMouseDown={canvasMouseDown}
          onMouseOut={clearMousePositions}
          onMouseEnter={()=>{circle.style.display="block"}}
          onMouseMove={canvasMouseMove}
          ref={canvasRef}
          // width="calc(100 * window.innerWidth / 100 - 15 || 800)"
          // height="calc(85 * window.innerHeight / 100 || 800)"
          style={{
            cursor: "crosshair",
            // border: "1px solid #000000",
          }}
        ></canvas>
        <canvas 
          id="text"
          onMouseUp={canvasMouseUp}
          onMouseDown={canvasMouseDown}
          onMouseOut={clearMousePositions}
          onMouseMove={canvasMouseMove}
          onMouseEnter={()=>{circle.style.display="block"}}
          ref={textRef}
          // width="calc(100 * window.innerWidth / 100 - 15 || 800)"
          // height="calc(85 * window.innerHeight / 100 || 800)"
          style={{
            cursor: "crosshair",
            border: "2px solid red",
            position:"absolute",
            // zIndex:-5
          }}
        ></canvas>
      </div>
    </div>
  );
};

export default WhiteBoard;
