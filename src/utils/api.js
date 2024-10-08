/*
* FILE : api.js
* PROJECT : Air Call
* PROGRAMMER : Jason S
* FIRST VERSION : 7/12/2024
* DESCRIPTION : Helper file that handles all the calls to our api
* 
*/

//base target url for our api's
const BASE_URL = 'https://aircall-backend.onrender.com';

/*
* Funciton: fetchCalls
* Description: Fetches all the call data from the api using a GET call
* Comment parameters : N/A
* 
*/
// Fetch all calls
export const fetchCalls = async () => {
    const response = await fetch(`${BASE_URL}/activities`);
    if (!response.ok) {
      throw new Error('Failed to fetch calls');
    }
    const data = await response.json();
    return data;
};

/*
* Funciton: updateCall
* Description: updates the is_archived status for a given call id. Used for archive/unarchive call buttons in each callentry
* Comment parameters
*   callId : the id of the call to be updated
*   isArchived : the archived status we want the given call Id to be set to
* Returns:
*   true : update was successful
*   false : update failed
*/
export const updateCall = async (callId, isArchived) => {
    try {
        const response = await fetch(`${BASE_URL}/activities/${callId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_archived: isArchived }),
          });
          if (!response.ok) {
            console.error('Failed to archive the call');
            return false;
          }
          return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

/*
* Funciton: handleAllCallsUpdate
* Description: Handles archiving or unarchiving multiple calls at once. Called when the user clicks the "Archive all" or "Unarchive all" buttons
* Comment parameters:
*   calls : the list of call data
*   archiveState : the archive state all calls should be set to
*/
export const handleAllCallsUpdate = async (calls, archiveState) => {
    const promises = calls.map(call => {
        if (call.is_archived !== archiveState) {
          return updateCall(call.id, archiveState);
        }
        return Promise.resolve();
      });
    
      await Promise.all(promises);
};