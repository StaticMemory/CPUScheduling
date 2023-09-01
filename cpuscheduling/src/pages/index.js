import { FirstComeFirstServed, ShortestJobNext } from "@/Algorithms/Algorithms";
import ProcessRep from "@/components/ProcessRep";
import { useEffect, useState } from "react";

function processClass(timeRemaining, priority, timeInserted){
  this.timeRemaining = timeRemaining;
  this.priority = priority;
  this.timeInserted = timeInserted
}

export default function Home() {
  const[processList, addProcess] = useState([]);
  const [num, setNum] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [curPri, setCurPrio] = useState("");
  const [curLen, setCurLen] = useState("");
  const [globalTimer, setGlobalTimer] = useState(0);
  useEffect(()=>{
  },[globalTimer]);
  const deleteArrMember = timeInserted =>{
    addProcess(processList.filter(proc=>proc.timeInserted !== timeInserted));
    setCycle(ShortestJobNext(processList));
  };
  if(processList.length !=0){
    setTimeout(()=>{setGlobalTimer(globalTimer+1)},1000);
  }
  return (
    <div>
      <div>
        <div className="flex">
        <div className="border-2 w-64">
            <div className="flex">
              <div className="pr-4">Priority of Process:</div>
              <input className="w-inpBox" inputMode="number" type="text" value={curPri} onChange={(e)=>{
                setCurPrio(e.target.value)
              }}></input>
            </div>
        </div>
        <button onClick={()=>{
          addProcess((proc)=>[...proc, new processClass(parseInt(curLen),parseInt(curPri), num)]);
          setCurLen("");
          setCurPrio("");
          setNum(num+1);
        }}>Create Process!</button>
          
            <div></div>
          </div>
            <div className="flex">
              <div className="pr-4">Length of Process:</div>
              <input className="w-inpBox2" inputMode="number" type="text" value={curLen} onChange={(e)=>{
                setCurLen(e.target.value)
              }}></input>
            </div>
      </div>
      <div>Time to complete processes: {globalTimer > 0 ? globalTimer-1 : 0}</div>
      <button onClick={()=>{
        setCycle((cycle +1) % processList.length);
      }}>Start</button>
      <button className="px-4" onClick={()=>{
        addProcess([]);
        setGlobalTimer(0);
        setNum(0);
      }}>Clear</button>
      <div className="grid">
        <div className="flex-wrap flex w-full text-center">{processList.map((proc,id)=>{
          
          if(id == cycle){
            return<div key={proc.timeInserted}> <ProcessRep  proc={proc} select={true} listID={proc.timeInserted} onZero={deleteArrMember}/>
              <div>{proc.timeInserted}</div>
            </div>
          }
          
          return <div key={proc.timeInserted}><ProcessRep proc={proc} select={false} listID={proc.timeInserted} onZero={deleteArrMember}/>
          <div>{proc.timeInserted}</div></div>
        })}</div>
      </div>
      
      
    </div>
  )
}
