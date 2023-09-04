import { useState } from "react";

export default function AlgoDropdown(props){
    const listOfSchedulingBehaviours = ["First Come, First Served", "Shortest Job Next", "Shortest Remaining Job", "Round Robin", "Priority Based Scheduling"];
    return <div>
        <select defaultValue={0} className="border-2 border-black font-serif">Items:
            {listOfSchedulingBehaviours.map((names,id)=>{
                return<option value={id} onClick={()=>{
                    props.func(id);
                }} key={id}>{names}</option>
            })}
        </select>
        

        
    </div>
}