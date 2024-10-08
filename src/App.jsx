/*
* FILE : App.jsx
* PROJECT : Air Call
* PROGRAMMER : Jason S
* FIRST VERSION : 7/12/2024
* DESCRIPTION : Main file for building all app components together.
* 
*/

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from './Components/Header.jsx';
import Callbox from './Components/Callbox.jsx';
import Footer from './Components/Footer.jsx';

import { fetchCalls } from './utils/api.js';


const App = () => {

  //Which call page is being shown. Active call or archived calls
  const [view, setView] = useState('main');

  //which direction a call page needs to transition
  const [direction, setDirection] = useState('left');

  //Call information state variable
  const [callData, setCallData] = useState([]);

  /*
  * Funciton: fetchData
  * Description: Uses api helper file to fetch all call information
  * Comment parameters: N/A
  * 
  */
  const fetchData = async () => {
    const data = await fetchCalls();
    setCallData(data);
  };

  //initial fetching of call data
  useEffect(() => {
    fetchData();
  }, [view]);

  /*
  * Funciton: handleSetView
  * Description: Used to set the new call view when a button is press in the header component
  * Comment parameters
  *   newView : the call page that is being transitioned to
  * 
  */
  const handleSetView = (newView) => {
    setDirection(newView === 'main' ? 'right' : 'left');
    setView(newView);
  };


  return (
    <div className="container flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 border border-b-1">
        {/* Simple Mock window look */}
        <div className="flex items-center space-x-2">
          <div className="bg-red-300 hover:bg-red-600 rounded-full w-3 h-3"></div>
          <div className="bg-yellow-300 hover:bg-yellow-600 rounded-full w-3 h-3"></div>
          <div className="bg-green-300 hover:bg-green-600 rounded-full w-3 h-3"></div>
        </div>
        <span className="text-lg font-bold">Air Call</span>
        </div>
      <Header currentView={view} setView={handleSetView} />
      <TransitionGroup className="flex-grow relative">
        <CSSTransition
          key={view}
          timeout={300}
          classNames={direction === 'left' ? 'slide-left' : 'slide-right'}
          onExit={(node) => {
            node.style.visibility = 'hidden';
          }}
        >
          <div className="absolute inset-0 overflow-y-auto">
            {/* Show active calls or archived call depending on user selecton */}
            {view === 'main' ? <Callbox data={callData} fetchData={fetchData} isArchived={false} /> : <Callbox data={callData} fetchData={fetchData} isArchived={true} />}
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
};
ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
