import type { Task } from "$lib";

export function progressCalc (tasks:Task[]):number{
    let completedTasks = tasks.filter((task)=>{
        return task.isComplete === true
    })

let percentage = (completedTasks.length/tasks.length)*100 

return Math.floor(percentage) 
}

export function dateFormatter(Year:number,month:number,dayOfTheMonth:number){
if(month<10){
return `${Year}-0${month}-${dayOfTheMonth}`
}else{
    return `${Year}-${month}-${dayOfTheMonth}`
}
}