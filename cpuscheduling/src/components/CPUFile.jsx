export default function CPUFile(props){
    if(props.started){
        return <div>
            <div>{props.paused ? "Paused!" : ""}</div>
        </div>
    }
    return <div>
        <div>Hasn't Started Yet!</div>
    </div>
}