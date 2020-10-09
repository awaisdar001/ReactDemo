import * as studentEventActions from "../actions/studentEventActions";

const initialState = {
    events: [],
    all_events: [],
    updated_at: new Date().toLocaleTimeString(),
    status: 'No student data!!',
    isHidden: true,
}

const studentEventReducer = (state = initialState, action) => {
    switch (action.type) {
        case studentEventActions.STUDENT_EVENTS_FETCHED:
            return {
                ...state,
                events: action.payload.events,
                all_events: action.payload.events,
                updated_at: action.payload.updated_at,
            }
        case studentEventActions.FETCHING_STUDENT_EVENTS:
            return {
                ...state,
                status: action.payload,
                events: [],
                isHidden: false,
            }
        case studentEventActions.FETCH_STUDENT_EVENTS_ERROR:
            return {
                ...state,
                updated_at: action.payload.message
            }
        case studentEventActions.SEARCH_STUDENT_EVENTS:
            return {
                ...state,
                status: action.payload.status,
                events: action.payload.events
            }
        case studentEventActions.SEARCH_STUDENT_EVENTS_COMPELETE:
            return {
                ...state,
                events: action.payload.events,
                status: action.payload.status,
            }
        default:
            return state
    }
};

export default studentEventReducer;