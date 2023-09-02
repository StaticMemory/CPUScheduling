export function FirstComeFirstServed(arr){ // returns an Integer that will select the necessary process to be executed by the CPU
    let ind = 0;
    let min = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i].timeInserted < min){
            min = arr[i].timeInserted;
            ind = i;
        }
    }
    return ind;
}
export function ShortestJobNext(arr){
    let ind = 0;
    let min = 100000;
    for(let i = 0; i < arr.length; i++){
        if(min > arr[i].timeRemaining){
            min = arr[i].timeRemaining;
            ind = i;
            console.log(ind);
        }
    }
    return ind;
}
export function PriorityBasedScheduling(arr){
    let ind = 0;
    let minPrio = -1;
    for(let i = 0; i < arr.length; i++){
        if(arr[i].priority > minPrio){
            minPrio = arr[i].priority;
            ind = i;
        }
    }
    return ind;
}
export function RoundRobin(arr,num){
    let ind = 0;
    for(let i = 0; i< arr.length; i++){
        if(arr[i].wasVisited != num){
            ind = i;
            arr[i].wasVisited += 1;
            console.log(arr[i].wasVisited);
            return ind;
        }
    }
    for(let i = 0; i < arr.length; i++){
        arr[i].wasVisited = 0;
    }
    return 0;
}