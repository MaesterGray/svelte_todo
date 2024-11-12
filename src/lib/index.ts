export type Task={
    isComplete:boolean,
    name:string,
    index:number
  }
  
  export type Project ={
    description:string,
    duedate:string
    title:string
    tasks:Task[]
  }
  
  export type User= {
  projects:Project[],
  signinMethod:{},
  uid:string
  firstname:string
  lastname:string
  id:string
  }
  
  