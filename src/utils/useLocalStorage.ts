import { useState, useEffect, useReducer } from "react";
import { Action } from "typesafe-actions";
import getSessionId from "./getSessionId"

export class Message {
    constructor(m: string, i: string){
        this.message = m;
        this.id = i;
    }
    message: string;
    id: string;
}

var bc = new BroadcastChannel('messages');
const useLocalStorage = (key: string, defaultValue: Message[], session: string) : [m: Message[], a: (message: string)=>void, r: (message: string)=>void] => {
    
    function reducer(state: Message[], action: { type: string, payload?: string }): Message[] {
        // return state;
        switch (action.type) {
            case 'ADD_MESSAGE':
                const newMessage = new Message(action.payload || "", session)
                return [...state, newMessage]
                break;
            case 'REMOVE_MESSAGE':
                const newState = state.slice()
                newState.splice(Number(action.payload), 1);
                return newState;
                break;
                case 'MESSAGES_UPDATED':
                const mes = JSON.parse(localStorage.getItem(key) || String(defaultValue))
                return mes;
                break;
            default: return state;
        }
    }

    const [messages, dispatch] = useReducer(reducer, [], ()  => {
        let currentValue : Message[];
        try {
            currentValue = JSON.parse(
                localStorage.getItem(key) || String(defaultValue)
            );
        } catch (error) {
            currentValue = defaultValue;
        }
        return currentValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(messages));
        bc.onmessage = (messageEvent) => {
            dispatch({ type: 'MESSAGES_UPDATED'})
          }
    }, [messages, key]);

    function addMessage(message?: string) {
        
        dispatch({ type: 'ADD_MESSAGE', payload: message });
        bc.postMessage('MESSAGES_UPDATED');
    }

    function removeMessage(n: string) {
        
        dispatch({ type: 'REMOVE_MESSAGE', payload: n });
        bc.postMessage('MESSAGES_UPDATED');
    }

    return [messages, addMessage, removeMessage];
};

export default useLocalStorage;
