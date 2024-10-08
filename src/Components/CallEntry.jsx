/*
* FILE : CallEntry.jsx
* PROJECT : Air Call
* PROGRAMMER : Jason S
* FIRST VERSION : 7/12/2024
* DESCRIPTION :
* Component that displays information about a call. Used to build the call list and the archived call list.
* Includes a button to archive or unarchive a given call
*/
import React, { useState, useEffect, useRef } from 'react';


import { updateCall } from '../utils/api.js';

const CallEntry = ({ call, fetchData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);

    /*
    * Funciton: toggleExpand
    * Description: function that is used to update our state variable
    * Comment parameters: N/A
    * 
    */
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

   /*
    * Funciton: handleArchive
    * Description: updates the call data with a PATCH call to the calls api to either archive or unarchive
    * Comment parameters: N/A
    * 
    */
    const handleArchive = async () => {
        try{
            const success = await updateCall(call.id, !call.is_archived);
            if(success){
                fetchData();
            }
        } catch (error) {
            console.log('Error:' , error);
        }
      };
   /*
    * Funciton: formatTime
    * Description: takes a total number of seconds and displays it in a more readable format
    * Comment parameters:
    *   totalSeconds : the total number of seconds to format
    * Returns: string : A formatted call duration time
    */
    const formatTime = (totalSeconds) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const minuteStr = minutes === 1 ? 'minute' : 'minutes';
      const secondStr = seconds === 1 ? 'second' : 'seconds';

      if (minutes === 0) {
        return `${seconds} ${secondStr}`;
      }
      
      return `${minutes} ${minuteStr} and ${seconds} ${secondStr}`;
    };
   /*
    * Funciton: formatPhoneNumber
    * Description: takes a phone number an formats it into a more readable format ex: +1 123-456-7890
    * Comment parameters:
    *   phoneNumber : number to be formated
    * Returns : string : If the phone number meets the formatting criteria the formatted number is returned. Otherwise the original number is returned
    */
    const formatPhoneNumber = (phoneNumber) => {
      // Remove any non-digit characters
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');

      // Check if the cleaned number has 11 digits and starts with '1'
      const match = cleaned.match(/^1(\d{3})(\d{3})(\d{4})$/);

      if (match) {
        return `+1 ${match[1]}-${match[2]}-${match[3]}`;
      }

      return phoneNumber;
    };

    useEffect(() => {
    if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
    }
    }, [isExpanded]);


    //shows in green if the call was answered or red if call was missed/not answered
    const fillColour = call.call_type === 'answered' ? 'green' : 'red';


  
    return (
      <div className="pt-3">
        {/* date the call was made */}
        <div className="divider divider-neutra text-gray-500">{new Date(call.created_at).toLocaleDateString()}</div>
        <div
          className={`container-view rounded-md mr-3 ml-3 mt-3 flex flex-col border-2 hover:bg-gray-200 cursor-pointer ${isExpanded ? 'p-4' : 'p-2'}`}
          onClick={toggleExpand}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Change the phone icon based on if it is an incoming or outgoing call */}
            {call.direction === 'outbound' ? (
              <svg version="1.1" id="Phone-20" xmlns="http://www.w3.org/2000/svg" height="24" width="24"  x="0px" y="0px"
              viewBox="0 0 28.879 28.888" fill={fillColour} >
         <g>
             <path d="M23.486,16.708c-0.377-0.378-0.879-0.586-1.413-0.586c0,0-0.001,0-0.002,0c-0.534,0-1.036,0.209-1.413,0.586l-2.828,2.828
                 l-8.485-8.485l2.828-2.828c0.78-0.78,0.78-2.05-0.001-2.83L7.929,1.15C7.552,0.773,7.05,0.565,6.516,0.565H6.515
                 c-0.535,0-1.037,0.209-1.414,0.587L0.858,5.395C0.729,5.523-0.389,6.733,0.142,9.392c0.626,3.129,3.246,7.019,7.787,11.56
                 c6.499,6.499,10.598,7.937,12.953,7.937c1.63,0,2.426-0.689,2.604-0.867l4.242-4.242c0.378-0.378,0.587-0.881,0.586-1.416
                 c0-0.535-0.208-1.037-0.586-1.415L23.486,16.708z M22.072,26.607c-0.028,0.029-3.409,2.249-12.729-7.07
                 c-9.521-9.52-7.067-12.729-7.071-12.729l4.243-4.244l4.243,4.244l-3.535,3.535c-0.391,0.391-0.391,1.023,0,1.414l9.899,9.899
                 c0.391,0.391,1.023,0.391,1.414,0l3.535-3.536l4.243,4.244L22.072,26.607z"/>
             <path d="M27.879,0h-7v2h4.586L15.172,12.293l1.414,1.414L26.879,3.414V8h2V1C28.879,0.448,28.431,0,27.879,0z"/>
         </g>
         </svg>
         
            ) : (
                <svg version="1.1" id="Phone-21" xmlns="http://www.w3.org/2000/svg" height="24" width="24" x="0px" y="0px"
                viewBox="0 0 29.586 29.595" fill={fillColour}>
                    <g>
                        <path d="M23.486,17.415c-0.377-0.378-0.879-0.586-1.413-0.586c0,0-0.001,0-0.002,0c-0.534,0-1.036,0.209-1.413,0.586l-2.828,2.828
                            l-8.485-8.485l2.828-2.828c0.78-0.78,0.78-2.05-0.001-2.83L7.929,1.857C7.552,1.48,7.05,1.272,6.516,1.272H6.515
                            c-0.535,0-1.037,0.209-1.414,0.587L0.858,6.102C0.729,6.23-0.389,7.44,0.142,10.099c0.626,3.129,3.246,7.019,7.787,11.56
                            c6.499,6.499,10.598,7.937,12.953,7.937c1.63,0,2.426-0.689,2.604-0.867l4.242-4.242c0.378-0.378,0.587-0.881,0.586-1.416
                            c0-0.535-0.208-1.037-0.586-1.415L23.486,17.415z M22.072,27.314c-0.029,0.029-3.409,2.249-12.729-7.07
                            c-9.521-9.52-7.067-12.729-7.071-12.729l4.243-4.244l4.243,4.244l-3.535,3.535c-0.391,0.391-0.391,1.023,0,1.414l9.899,9.899
                            c0.391,0.391,1.023,0.391,1.414,0l3.535-3.536l4.243,4.244L22.072,27.314z"/>
                        <path d="M16.879,13.707h7v-2h-4.586L29.586,1.414L28.172,0L17.879,10.293V5.707h-2v7C15.879,13.259,16.327,13.707,16.879,13.707z"
                            />
                    </g>
                </svg>
            )}
              <div className="font-bold ml-2">
              {call.direction === 'outbound' ? (
                <>
                                <p>{formatPhoneNumber(call.to)}</p>
                                <p className="text-xs text-gray-500 whitespace-nowrap">called from {formatPhoneNumber(call.from)}</p>
                </>
                ) : (
                  <>
                                  <p>{formatPhoneNumber(call.from)}</p>
                                  <p className="text-xs text-gray-500 whitespace-nowrap">tried to call {formatPhoneNumber(call.to)}</p>
                  </>)}

              </div>
            </div>
            <div className="divider divider-vertical"></div>
            <div className="flex items-center">
              {/*time the call was made*/}
              {new Date(call.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
          <div
          className={`expandable-content ${isExpanded ? 'expanded' : ''}`}
          style={{ maxHeight: isExpanded ? `${contentHeight}px` : '0' }}
          ref={contentRef}
            >
              <div className='pt-5'>
                Call lasted { formatTime(call.duration)}
              </div>
            <div className="flex justify-center mt-4">

              <div>
              <button className="justify-center btn btn-sm bg-green-700 border-green-700 hover:bg-green-600 px-4 py-2 rounded" onClick={handleArchive}>
                {call.is_archived === false ? 'Archive Call' : 'Unarchive Call'}
                </button>
              </div>

            </div>
        </div>
        </div>
      </div>
    );
  };

export default CallEntry;