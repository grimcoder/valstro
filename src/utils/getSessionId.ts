import { useState, useEffect, useReducer } from "react";
import { Action } from "typesafe-actions";

const  getSessionId = function(){
    const [session, setSession] = useState(()=>{

        return Math.floor(Math.random() * 1000000).toString();

    });

    
   
    return session;
}

export default getSessionId;