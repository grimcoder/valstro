import { useEffect, useState, useRef } from "react";
import React from "react";

import styled from "styled-components";

import useLocalStorage from "./utils/useLocalStorage";
import './App.css'

export const App = () => {

  const Row = styled.div`
      font-family: "Roboto";
      display: table-row;
    `;

  const Cell = styled.div`
      font-family: "Roboto";
      display:table-cell;
      padding: 5px;
    `;


  const [storedMessages, addMessage, removeMessage] = useLocalStorage('messages', [])

  console.log(storedMessages)

  const input = useRef<HTMLInputElement>(null);
  const messages = storedMessages.map((m: string, n: number) => {

    return <Row>
      <Cell>
        {m}
      </Cell>
      <Cell><button onClick={() => {
        removeMessage(n.toString())
      }}>Remove</button>
      </Cell>
    </Row>
  })

  return (
    <div className="App">
      <div className="Widget">
        <header className="Widget-header">
          <h1>Valstro Frontend Challenge:</h1>
          <p>
            Insert messages in a form below and see a list of messages (with the
            ability to remove) update across multiple tabs/windows in realtime
            using the <code>BroadcastChannel API</code>.
          </p>
          <p>
            Refresh the page and see the message list persisted using the{" "}
            <code>LocalStorage API</code>.
          </p>
        </header>

        <div className="form">
          <input ref={input} className='input' ></input><button onClick={() => {

            const newMessage = input?.current?.value;

            addMessage(newMessage || "")
            // setMe 
          }}>Add message</button>

        </div>
        <div className="table">{messages}</div>
      </div>
    </div>
  );
};

export default App;
