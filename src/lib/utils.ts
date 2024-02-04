import type { Task } from "$lib";
import { Project } from "$lib";
export function progressCalc(tasks: Task[]): number {
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
function arrayEquality(tasks: [], copytasks: []) {
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
    console.log(areEqual, "are equal");
    return areEqual;
  }
}

export function hasBeenEdited(project: {}, copyproject: {}) {
  if (
    project.description !== copyproject.description ||
    project.title !== copyproject.title ||
    arrayEquality(project.tasks, copyproject.tasks) === false ||
    project.duedate !== copyproject.duedate
  ) {

    return true;
  } else {
    return false;
  }
}

export function requestPermission(){
  
}