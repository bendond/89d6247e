/*
* FILE : Callbox.jsx
* PROJECT : Air Call
* PROGRAMMER : Jason S
* FIRST VERSION : 7/12/2024
* DESCRIPTION : Calls display page. Is built using CallEntries of only active or only archived calls
* Includes a button that will archive or unarchive all calls in the list
*/
import React from 'react';
import CallEntry from './CallEntry.jsx';

import { handleAllCallsUpdate } from '../utils/api.js';

const Callbox = ({ data, fetchData, isArchived }) => {

   /*
    * Funciton: updateAll
    * Description: updates all calls to be the given archived state using the API helper file
    * Comment parameters
    *   archiveState : the archive state to set call data to
    * 
    */
    const updateAll = async (archiveState) => {
        await handleAllCallsUpdate(data, archiveState);
        fetchData();
    };

    return (
      <div>
            <div className="flex justify-center item-center mt-4">
                <button className="btn btn-outline text-gray-500 btn-sm" onClick={() => updateAll(!isArchived)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="gray" width="24" height="24" viewBox="0 0 24 24"><path d="M10 3h4v5h3l-5 5-5-5h3v-5zm8.546 0h-2.344l5.467 9h-4.669l-2.25 3h-5.5l-2.25-3h-4.666l5.46-9h-2.317l-5.477 8.986v9.014h24v-9.014l-5.454-8.986z"/></svg>
                    &emsp;   {isArchived === false ? 'Archive All Calls' : 'Unarchive All Calls'}
                </button>
            </div>
            {/* Only fetch data for a given archived state */}
            {data.filter(call => call.is_archived === isArchived).map(call => (
                <CallEntry key={call.id} call={call} fetchData={fetchData} />
            ))}
      </div>
    );
  };

export default Callbox;