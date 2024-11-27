import type { Task,Project } from "$lib";
export function progressCalc(tasks: Task[]): number {
  if(tasks.length===0){
    return 0
  }
  let completedTasks = tasks.filter((task) => {
    return task.isComplete === true;
  });
  let percentage = (completedTasks.length / tasks.length) * 100;
  return Math.floor(percentage);
}

export function dateFormatter(
  Year: number,
  month: number,
  dayOfTheMonth: number
) {
  if (month < 10) {
    return `${Year}-0${month}-${dayOfTheMonth}`;
  } else {
    return `${Year}-${month}-${dayOfTheMonth}`;
  }
}
export function arrayEquality(project: Project, copyProject: Project): boolean {
  if (project.tasks.length !== copyProject.tasks.length) {
    return false; 
  }

  for (let index = 0; index < project.tasks.length; index++) {
    console.log(index)
    if (
      project.tasks[index].name !== copyProject.tasks[index].name ||
      project.tasks[index].isComplete !== copyProject.tasks[index].isComplete
    ) {
      return false; 
    }
  }

  return true; 
}

export function hasBeenEdited(project: Project, copyproject: Project) {
  if (
    project.description !== copyproject.description ||
    project.title !== copyproject.title ||
    project.dueDate !== copyproject.dueDate 
  ) {

    return true;
  } else {
    return false;
  }
}


export function projectIsComplete(tasks:Task[]){
    let result = true
  for (let index = 0; index < tasks.length; index++) {
          if (tasks[index].isComplete===false) {
              result = false
              index = tasks.length
          }
  }
  return result
}