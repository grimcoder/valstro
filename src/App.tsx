import { useEffect, useState, useRef } from "react";
import React from "react";
import getSessionId from "./utils/getSessionId"
import styled from "styled-components";

import useLocalStorage, {Message} from "./utils/useLocalStorage";
import './App.css'

export const App = () => {

  const Row = styled.div`
      width: 100%;
      display: flex;
    `;

  const Cell = styled.div`
      display:block;
      padding: 5px;
    `;

 const [session] = getSessionId();
  const [storedMessages, addMessage, removeMessage] = useLocalStorage('messages', [], session)
 

  console.log(storedMessages)

  const input = useRef<HTMLInputElement>(null);
  const messages = storedMessages.map((m: Message, n: number) => {

    return <Row>
      <Cell className={`message ${m.id==session ? 'red' : ''}`}>
        {m.message}
      </Cell>
      <Cell className="remove_button">
      
      <i className="fa fa-times fa-lg" aria-hidden="true" onClick={() => {
        removeMessage(n.toString())
      }}></i>
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
          <input ref={input} className='input' ></input>
          <i className="fa fa-paper-plane fa-2x" aria-hidden="true"  onClick={() => {

            const newMessage = input?.current?.value;

            addMessage(newMessage || "")
            // setMe 
          }}></i>

        </div>
        <h2>Messages</h2>
        <div className="table">{messages}</div>
      </div>
    </div>
  );
};

export default App;
