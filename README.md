Frontend Take-Home Challenge Instructions

Overview
As a member of our UI Engineering team, you'll be building a multi-window & multi-process frontend application, which regularly interacts with event-driven APIs.

The purpose of this assessment is to show that you can build an extremely simple reactive application that shares its state across multiple windows through an event-based architecture using the Broadcast Channel API & the localStorage API.


Setup
Download the project attachment here.
Run 
yarn install
Followed by 
yarn dev
 to start the development server

The Challenge
Build a simple message board in 
ReactJS
 & 
TypeScript
, which allows you to post text-based messages to a list, with the capability to delete individual messages.


Requirements & rules
The list must persist when the page is refreshed using localStorage
The list must update in real-time across multiple windows/tabs using BroadcastChannel
Do not install new NPM packages, you can only work with what's in 
package.json

Bonus Points
Use a reducer (useReducer) & the flux pattern
Use typesafe & flux standard actions
Use react's native hooks & your own custom hooks
Implement simple & clean styles using CSS best practices

Expert Mode
Highlight in the list which messages are from the sender, and which are from a receiver
Think about a11y, dark mode & responsive-design
Use RxJS in some relevant way

Time
The project should take no longer than 3-4 hours to complete for someone who already has experience with the technologies mentioned above. If you've not had experience with some of the above and you'd like to spend more time, take as long as you need within the 7 day period.


Example
There's no requirement to copy the example's design/UI. Feel free to use your own flare.

YouTube Video: https://www.youtube.com/watch?v=dcfxyFoRMlU

