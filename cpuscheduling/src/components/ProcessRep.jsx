import { useEffect, useState } from "react"

export default function ProcessRep(props){
    const [timeRemaining, setTimeRemaining] = useState(props.proc.timeRemaining);
    let timer = null;
    if(props.select === true){
        timer = setTimeout(()=>{
            setTimeRemaining(timeRemaining-1);
            props.proc.timeRemaining = timeRemaining;
        },1000);
        if(timeRemaining === 0){
            props.onZero(props.listID)
            clearTimeout(timer)
        }
        return<div> 
            <div className="px-10 w-8 text-center border-2 bg-red-300">{timeRemaining}</div>
            
        </div>
    }
    return <div>
        
        <div className="px-10 w-8 text-center border-2">{timeRemaining}</div>
        
    </div>
}