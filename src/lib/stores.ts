import { writable } from "svelte/store";

type ToastOptions={
    id:number
    type:'failure'|'success'|'loading'
    message:string
    timeout?:number
    dismissible:boolean

}
export const toastStore = (toast:ToastOptions|null)=>{

const {subscribe,set,update} =  writable<ToastOptions|null>(toast)
    function open(toast:ToastOptions){
        set(toast)
        if (toast?.timeout) {
            setTimeout(()=>close(),toast.timeout)
        }
    }
    function close() {
       update((toast)=>(toast=null)) 
    }

    return{
        open,
        close,
        subscribe
    }
}


export const Toast = toastStore(null)

export const toasts = writable([]);

