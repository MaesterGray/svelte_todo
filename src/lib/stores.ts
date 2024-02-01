import { writable } from "svelte/store";

export const ongoing = writable({
    presentState:{},
    pastState:{}
})
export const completed = writable({
    presentState:{},
    pastState:{}
})

export const mutationOccured =writable(false)

