export default function CoolSideBar(props){
    const listOfSchedulingBehaviours = ["First Come, First Served", "Shortest Job Next", "Shortest Remaining Job", "Round Robin", "Priority Based Scheduling"];
    if(props.hide){
        return <div className=""></div>
    }
    return <div className="fixed overflow-x-hidden bg-white h-full w-80 border-r-2 border-black duration-300 font-serif">
        <div className="text-center">Select An Algorithm!</div>
        <div className="px-3">
            {listOfSchedulingBehaviours.map((algo,id)=>{
                return <div key={id}>
                    <button className="border-y py-1" onClick={()=>{
                        props.swapFunc(id);
                        props.func();
                    }}>
                        <div className="flex justify-between py-1">
                            <div className="text-xl "><b>{id+1}.</b></div>
                            <div className="text-xl text-center"><b>{algo}</b></div>
                    
                    
                    
                    </div>
                    </button>
            
                </div>
            })}
        </div>
        <button onClick={()=>{props.func()}}>press</button>


    </div>
}