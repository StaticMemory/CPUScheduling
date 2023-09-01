export function FirstComeFirstServed(arr){ // returns an Integer that will select the necessary process to be executed by the CPU
    let ind = 0;
    let min = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i].timeInserted > min){
            min = arr[i].timeInserted;
            ind = i;
        }
    }
    return ind;
}
export function ShortestJobNext(arr){
    let ind = 0;
    let min = 1000;
    for(let i = 0; i < arr.length; i++){
        if(min > arr[i].timeRemaining){
            min = arr[i].timeRemaining;
            ind = i;
        }
    }
    return ind;
}