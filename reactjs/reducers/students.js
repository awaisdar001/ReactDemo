import * as studentActions from "../actions/studentActions";

const initialState = {
    items: [],
    all_items: [],
    updated_at: new Date().toLocaleTimeString(),
    status: 'No student data!!',
    isHidden: true,
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case studentActions.STUDENTS_FETCHED:
            return {
                ...state,
                items: action.payload.items,
                all_items: action.payload.items,
                updated_at: action.payload.updated_at,
                isHidden: false,
            }
        case studentActions.FETCHING_STUDENTS:
            return {
                ...state,
                status: action.payload,
                isHidden: false,
                items: []
            }
        case studentActions.FETCH_STUDENTS_ERROR:
            return {
                ...state,
                updated_at: action.payload.message
            }
        case studentActions.SEARCH_STUDENTS:
            return {
                ...state,
                status: action.payload.status,
                items: action.payload.items
            }
        case studentActions.SEARCH_STUDENTS_COMPELETE:
            return {
                ...state,
                items: action.payload.items,
                status: action.payload.status,
            }
        default:
            return state
    }
};

export default studentReducer;