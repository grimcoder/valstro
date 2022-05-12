import { useState, useEffect, useReducer } from "react";
import { Action } from "typesafe-actions";

const useLocalStorage = (key: string, defaultValue: string[]) : [m: string[], a: (message: string)=>void, r: (message: string)=>void] => {
    var bc = new BroadcastChannel('messages');

    function reducer(state: string[], action: { type: string, payload?: string }): string[] {
        // return state;
        switch (action.type) {
            case 'ADD_MESSAGE':
                return [...state, action.payload || ""]
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

    const [messages, dispatch] = useReducer(reducer, [], () => {

        let currentValue : string[];

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
        bc.postMessage('MESSAGES_UPDATED');
        dispatch({ type: 'ADD_MESSAGE', payload: message })
    }

    function removeMessage(n: string) {
        bc.postMessage('MESSAGES_UPDATED');
        dispatch({ type: 'REMOVE_MESSAGE', payload: n })
    }

    return [messages, addMessage, removeMessage];
};

export default useLocalStorage;
