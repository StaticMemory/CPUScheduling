import { useState } from "react";

export default function AlgoDropdown(props){
    const listOfSchedulingBehaviours = ["First Come, First Served", "Shortest Job Next", "Shortest Remaining Job", "Round Robin", "Priority Based Scheduling"];
    const [renderDropdown, setRenderDropdown] = useState(false);
    return <div>
        <ul onClick={()=>{
            setRenderDropdown(!renderDropdown);
        }}>Items:
            
        </ul>
        {listOfSchedulingBehaviours.map((names,id)=>{
                if(renderDropdown){
                return<li onClick={()=>{
                    props.func(id);
                }} key={id}>{names}</li>
            }
            })}

        
    </div>
}