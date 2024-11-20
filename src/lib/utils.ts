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
export function arrayEquality(tasks: Task[], copytasks: Task[]) {
  if (tasks.length !== copytasks.length) {
    return false;
  } else {
    let areEqual = true;
    for (let index = 0; index < tasks.length; index++) {
      if (
        tasks[index].name !== copytasks[index].name ||
        tasks[index].isComplete !== copytasks[index].isComplete
      ) {
        areEqual = false;
        index = tasks.length;
      }
    }
    return areEqual;
  }
}

export function hasBeenEdited(project: Project, copyproject: Project) {
  if (
    project.description !== copyproject.description ||
    project.title !== copyproject.title ||
    arrayEquality(project.tasks, copyproject.tasks) === false ||
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