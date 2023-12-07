import {useEffect, useRef, useState} from 'react'
import './App.css'

function App({socket}) {
  const [time, setTime] = useState("");
  const p2 = useRef(null);

  useEffect(() => {
      socket.on('connect', () => {
      });

      socket.on('time', (timeFromSrv)=>{
          setTime(new Date(timeFromSrv).toLocaleTimeString('PL-pl'));
      });

      socket.on('position', (pos)=>{
          if(pos.id === socket.id) return;
          p2.current.style.transform = `translate( ${pos.x}px , ${pos.y}px)`;
      });
    }, [])

  const handleMouseMove = (e) => {
    socket.emit('position', {x: e.pageX, y: e.pageY});
  }

  return (
    <div style={{width: '100vw', height: '100vh'}} onMouseMove={handleMouseMove}>
      <div style={{width: 50, height:50, transition: '10ms', background: 'red', position: 'fixed'}} ref={p2}>

      </div>
      <h1>{time}</h1>
    </div>
  )
}

export default App
