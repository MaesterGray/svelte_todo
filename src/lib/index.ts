import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
export const firebaseConfig = {
  apiKey: "AIzaSyBNoZpl8cbZYl8Vr_zeNtwjlvw5PdB3-aY",
  authDomain: "svelte-todo-38b7c.firebaseapp.com",
  projectId: "svelte-todo-38b7c",
  storageBucket: "svelte-todo-38b7c.appspot.com",
  messagingSenderId: "847348257887",
  appId: "1:847348257887:web:12a52489e6a37f9e6637ea"
};

// Initialize Firebase

export type Task={
  isComplete:boolean,
  name:string,
  index:number
}

// export type Project ={
//   description:string,
//   duedate?:EpochTimeStamp
//   title:string
//   tasks:Task[]
//   isComplete:boolean
// }

export type User= {
projects:Project[],
signinMethod:{},
uid:string
firstname:string
lastname:string
id:string
}


export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const auth = getAuth(app)

class City {
  name:string
  state:string
  country?:string
  constructor (name:string, state:string, country:string ) {
      this.name = name;
      this.state = state;
      this.country = country;
  }
  toString() {
      return this.name + ', ' + this.state + ', ' + this.country;
  }
}

// Firestore data converter
export const cityConverter = {
  toFirestore: (city:City) => {
      return {
          name: city.name,
          state: city.state,
          country: city.country
          };
  },
  fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new City(data.name, data.state, data.country);
  }
};


export class Project{
  isComplete:boolean
  tasks:Task[]
  duedate?:string
  description:string
  title:string
  reminder?:string
constructor(isComplete:boolean,tasks:Task[],description:string,title:string,reminder?:string|undefined,duedate?:string){
  this.isComplete=isComplete
  this.tasks = tasks
  this.duedate=duedate
  this.description=description
  this.title=title
  if (reminder !== undefined) {
    this.reminder= reminder
  }
  if (duedate !== undefined) {
    this.reminder= reminder
  }
}

toFirestore(){
  return {
    title:this.title,
    description:this.description,
    duedate:this.duedate,
    isComplete:this.isComplete,
    reminder: this.reminder,
    tasks:this.tasks,
    
  }
}
}

 const VAPIDKEY = 'BCBzutOBCTTC3CdWIOWHRZf5G9eq9gjbd_SXc9aFwaG2pnlwrGymhUKvaplA8T9qrVt8NwQZ6kZXBK4FNK9D-jo'