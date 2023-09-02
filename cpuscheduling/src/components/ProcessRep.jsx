import { useEffect, useState } from "react"

export default function ProcessRep(props){
    const [timeRemaining, setTimeRemaining] = useState(props.proc.timeRemaining);
    let timer = null;
    if(props.select === true){
        timer = setTimeout(()=>{
            if(props.started && !props.paused){
                setTimeRemaining(timeRemaining-1);
                props.proc.timeRemaining = timeRemaining;
            }
        },1000);
        if(timeRemaining === 0){
            props.onZero(props.listID)
            clearTimeout(timer)
        }
        return<div className="w-32 border-2 rounded-3xl border-gray-600 bg-red-300 animate-pulse"> 
                <div className="text-center justify-center">{timeRemaining - ( props.proc.wasVisted > 0)}</div>
                <div className="px-10"></div> 
            <div>Priority: {props.proc.priority}</div>
        </div>
    }
    return <div className="w-32 border-2 rounded-3xl border-gray-600">
        
        
                <div className="text-center">{timeRemaining - ( props.proc.wasVisted > 0)}</div>
            
            <div>Priority: {props.proc.priority}</div>
    </div>
}