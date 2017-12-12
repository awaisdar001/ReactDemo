/**
 * Created by awaisjibran on 11/25/17.
 */
import fetch from "isomorphic-fetch";
import store from "../store";

export const FETCH_ALL_EVENTS = "FETCH_ALL_EVENTS"
export const FETCHING_STUDENT_EVENTS = "FETCHING_STUDENT_EVENTS"
export const STUDENT_EVENTS_FETCHED = "STUDENT_EVENTS_FETCHED"
export const FETCH_STUDENT_EVENTS_ERROR = "FETCH_STUDENT_EVENTS_ERROR"
export const SEARCH_STUDENT_EVENTS = "SEARCH_STUDENT_EVENTS"
export const SEARCH_STUDENT_EVENTS_COMPELETE = "SEARCH_STUDENT_EVENTS_COMPELETE"
export const STUDENT_EVENTS_URLS = {
    FETCH_ALL_EVENTS: 'api/events'
}

export const searchEvents = (keyword) => {

    return (dispatch) => {
        let matchedItems = _searchEvents(keyword),
            events_count = matchedItems.length,
            status = events_count <= 0 ? 'No events matched...' : 'Events found: ' + events_count,
            _payload = {events: matchedItems, status: status}
        return dispatch({type: SEARCH_STUDENT_EVENTS_COMPELETE, payload: _payload})
    }
}

const _searchEvents = (keyword) => {
    let {all_events} = store.getState().events;
    let matchedItems = []
    console.log('Events', all_events)
    matchedItems = all_events.filter((el) => {
        let searchName = el.student.name.toLowerCase(),
            searchRollNumber = el.student.roll_number.toLowerCase(),
            searchTitle = el.event.title.toLowerCase();
        return searchName.indexOf(keyword) !== -1 ||
            searchRollNumber.indexOf(keyword) !== -1 ||
            searchTitle.indexOf(keyword) !== -1;
    })
    return matchedItems

}
export const fetchEvents = (params) => {
    return (dispatch) => {
        console.log('Fetching student events...');
        fetch(STUDENT_EVENTS_URLS[FETCH_ALL_EVENTS], {})
            .then((response) => {
                setTimeout(
                    () => {
                        studentEventsFetchSuccess(response, dispatch)
                    },
                    2000
                )
            })
            .catch((exc) => {
                return dispatch({type: FETCH_STUDENT_EVENTS_ERROR, payload: exc})
            })
        return dispatch({type: FETCHING_STUDENT_EVENTS, payload: 'Loading events....'})
    }
}

const studentEventsFetchSuccess = (response, dispatch) => {
    if (response.status >= 200 && response.status < 300) {
        response.json()
            .then(studentEventsJson => {
                return dispatch({
                    type: STUDENT_EVENTS_FETCHED,
                    payload: {
                        events: studentEventsJson,
                        updated_at: new Date().toLocaleTimeString()
                    }
                })
            })
    }
}