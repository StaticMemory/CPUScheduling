export default function StartStopClearBar(props){
    return <div>
        <div className="justify-center flex">
            <div className="flex gap-20 border-2 w-fit px-2">
                <button onClick={()=>props.start()} className="">{props.isStarted ? "Stop" : "Start"}</button>
                <button onClick={()=>props.pause()} className="">{props.isPaused ? "Play" : "Pause"}</button>
            </div>
        </div>


    </div>
}