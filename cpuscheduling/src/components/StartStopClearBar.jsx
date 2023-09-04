export default function StartStopClearBar(props){
    return <div>
        <div className="justify-center flex border-t-2 border-black">
            <div className="flex gap-20  w-fit px-2 ">
                <button onClick={()=>props.start()} className={"border-2 font-serif px-1 rounded-md items-center " + (props.isStarted ? "bg-red-100 border-red-400" : "bg-green-100 border-green-400")}>{props.isStarted ? "Stop" : "Start"}</button>
                <button onClick={()=>props.pause()} className={"border-2 font-serif px-1 rounded-md border-black "}>{props.isPaused ? "Play" : "Pause"}</button>
            </div>
        </div>


    </div>
}