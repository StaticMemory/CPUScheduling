export default function MenuToggle(props){
    return <div className="m-0">
        <button className="m-0 " onClick={()=>{props.func()}}>
            <div className="border-2 w-8 h-8 border-black">
                <div className="w-4 border-black border-b-2  h-1 py-1 mx-1.5"></div>
                <div className="w-4 border-black border-b-2 h-1 py-1 mx-1.5"></div>
                
                
            </div>
        </button>

    </div>
}