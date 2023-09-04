import { FirstComeFirstServed, PriorityBasedScheduling, RoundRobin, ShortestJobNext } from "@/Algorithms/Algorithms";
import CPUFile from "@/components/CPUFile";
import ProcessRep from "@/components/ProcessRep";
import { useEffect, useState } from "react";
import AlgoDropdown from "@/components/AlgoDropdown";
import StartStopClearBar from "@/components/StartStopClearBar";
import CoolSideBar from "@/components/CoolSideBar";
import MenuToggle from "@/components/MenuToggle";
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
  const [renderBar, setRenderBar] = useState(true);
  const [selectedAlgo, setSelectedAlgo] = useState(0);
  const setRender = ()=>{
    setRenderBar(prev=> !prev);
  }
  const swapSelectedAlgo = (id) =>{
    setSelectedAlgo(id);
  }
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
    addProcess([]);
    setGlobalTimer(prev => 0);
    setNum(0);
    changeFinishedProcess(prev => 0);
    setSelectedSched(prev=>id)
    
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
    <div className="">
    <div className="bg-gray-500 border-black border">
      <CoolSideBar hide={renderBar} func={setRender} swapFunc ={swapSelectedAlgo}/>
      <div className="flex justify-between">
      <MenuToggle func={setRender}/>
      <div>
        <div className="text-center text-xl"><b>{listOfSchedulingBehaviours[selectedAlgo]}</b></div>
      </div>
        <div></div>
      </div>
      
      <div className="flex justify-between ">
      <div className="border-2 border-black">
        
        <div className="flex">
          <div className=" w-72">
            <div className="flex">
              <div className="pr-4 font-serif w-48">Priority of Process:</div>
              <input className="w-inpBox border-2 border-black " inputMode="number" type="text" value={curPri} onChange={(e)=>{
                setCurPrio(e.target.value)
              }}></input>
            </div>
        </div>
        <button className="px-2" onClick={()=>{
          addProcess((proc)=>[...proc, new processClass(parseInt(curLen),parseInt(curPri), num)]);
          setCurLen("");
          setCurPrio("");
          setNum(num+1);
        }}>Create Process!</button>
          
          </div>
            <div className="flex py-1 w-72">
              <div className=" font-serif w-48">Length of Process: </div>
              <input className="w-inpBox border-2 border-black" inputMode="number" type="text" value={curLen} onChange={(e)=>{
                setCurLen(e.target.value)
              }}></input>
            </div>
      </div>
      <div className=""></div>
      <div></div>
      <div></div>
      </div>
      <div className="font-serif">Time to complete processes: {globalTimer > 0 ? globalTimer-1 : 0}</div>
      <div className="font-serif"> Number of Completed Processes: {finishedProcess}</div>
      <div className="p-2"></div>
      <StartStopClearBar isStarted={isStarted} isPaused={isPaused} start={setStarted} pause={setPaused}/>
      
      <div className="p-2"></div>
      
      <div className="grid">
        
      </div>
    </div>
    <div className="flex-wrap flex w-full text-center justify-center">{processList.map((proc,id)=>{
          
          if(id == cycle){
            return<div key={proc.timeInserted} className="px-2"> <ProcessRep paused={isPaused} started={isStarted} proc={proc} select={true} listID={proc.timeInserted} onZero={deleteArrMember}/>
            <CPUFile paused={isPaused} started={isStarted}/>
            </div>
          }
          return <div key={proc.timeInserted} className="px-2"><ProcessRep paused={isPaused} started={isStarted} proc={proc} select={false} listID={proc.timeInserted} onZero={deleteArrMember}/>
          
          </div>
        })}</div>
    </div>
  )
}
