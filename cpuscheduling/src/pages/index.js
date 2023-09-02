import { FirstComeFirstServed, PriorityBasedScheduling, RoundRobin, ShortestJobNext } from "@/Algorithms/Algorithms";
import CPUFile from "@/components/CPUFile";
import ProcessRep from "@/components/ProcessRep";
import { useEffect, useState } from "react";
import AlgoDropdown from "@/components/AlgoDropdown";
import StartStopClearBar from "@/components/StartStopClearBar";
function processClass(timeRemaining, priority, timeInserted){
  this.timeRemaining = timeRemaining;
  this.priority = priority;
  this.timeInserted = timeInserted;
  this.wasVisited = 0;
}

export default function Home() {
  const listOfSchedulingBehaviours = ["First Come, First Served", "Shortest Job Next", "Shortest Remaining Job", "Round Robin", "Priority Based Scheduling"];
  const [selectedSched, setSelectedSched] = useState(1);
  const[processList, addProcess] = useState([]);
  const [num, setNum] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [curPri, setCurPrio] = useState("");
  const [curLen, setCurLen] = useState("");
  const [globalTimer, setGlobalTimer] = useState(0);
  const [finishedProcess, changeFinishedProcess] = useState(0);
  const [setNewProcess, setSetNewProcess] = useState(false);
  const [redRobinCounter, setRedRobinCounter] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const setStarted = ()=>{
    if(isStarted){
      addProcess([]);
      setGlobalTimer(prev => 0);
      setNum(0);
      changeFinishedProcess(prev => 0);
    }
    setIsStarted(prev => !prev);
  }
  const setPaused = ()=>{
    setIsPaused(prev =>!prev)
  }
  
  useEffect(()=>{
    handleAlgos(true,setNewProcess);
  },[globalTimer]);
  const deleteArrMember = timeInserted =>{
    addProcess(processList.filter(proc=>proc.timeInserted !== timeInserted));
    changeFinishedProcess(finishedProcess+1);
    setSetNewProcess(true);
  };
  const setAlgo = (id)=>{
    setSelectedSched(id)
  };
  const handleAlgos = (inUseEffect, updateProcess)=>{
    if(inUseEffect){
      if(selectedSched == 0){
        setCycle(FirstComeFirstServed(processList));
      }
      else if(selectedSched == 1 && updateProcess){ //ShortestJobNext
        setCycle(ShortestJobNext(processList));
        setSetNewProcess(false);
      } 
      else if(selectedSched == 2){ //Shortest Remaining Time
        
        setCycle(ShortestJobNext(processList)); //Scans after each second checking if there is another process that has a smaller time remaining 
      }
      else if(selectedSched ==3){
        setCycle(RoundRobin(processList, redRobinCounter));
      }
      else if(selectedSched == 4){
        setCycle(PriorityBasedScheduling(processList));
      }

    }
    
  }

  if(processList.length !=0 && isStarted && !isPaused){
    setTimeout(()=>{setGlobalTimer(globalTimer+1)},1000);
  }
  return (
    <div>
      <AlgoDropdown func={setAlgo}/>
      <div>Currently Selected: {listOfSchedulingBehaviours[selectedSched]}</div>
      <div className="py-1">Set Red Robin Counter: <input value={redRobinCounter} onChange={(e)=>{
        setRedRobinCounter(e.target.value);
      }}></input></div>
      <div>
        <div></div>
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
      <div> Number of Completed Processes: {finishedProcess}</div>
      <StartStopClearBar isStarted={isStarted} isPaused={isPaused} start={setStarted} pause={setPaused}/>
      <hr className="" height={22}></hr>
      <hr/><hr/><hr/>
      <hr/><hr/><hr/>
      <div className="p-2"></div>
      
      <div className="grid">
        <div className="flex-wrap flex w-full text-center">{processList.map((proc,id)=>{
          
          if(id == cycle){
            return<div key={proc.timeInserted} className="px-2"> <ProcessRep paused={isPaused} started={isStarted} proc={proc} select={true} listID={proc.timeInserted} onZero={deleteArrMember}/>
            <CPUFile paused={isPaused} started={isStarted}/>
            </div>
          }
          
          return <div key={proc.timeInserted} className="px-2"><ProcessRep paused={isPaused} started={isStarted} proc={proc} select={false} listID={proc.timeInserted} onZero={deleteArrMember}/>
          
          </div>
        })}</div>
      </div>
      
      
    </div>
  )
}
