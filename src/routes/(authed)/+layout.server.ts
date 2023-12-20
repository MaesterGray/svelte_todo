import { getAuth,onAuthStateChanged } from "firebase/auth";
import { redirect } from "@sveltejs/kit";
const auth =getAuth()
let userState = {
    authsatate:false,
    uid:''
}
export async function load({url}){
onAuthStateChanged(auth,(user)=>{
    if (user) {
        userState={
            authsatate:true,
            uid:user.uid
        }
        return userState
    }else{
        throw redirect(303,`/login?redirectTo=${url.pathname}`)
    }
})
}