import fetch from "isomorphic-fetch";
import store from "../store";

export const FETCH_STUDENTS = "FETCH_STUDENTS"
export const FETCHING_STUDENTS = "FETCHING_STUDENTS"
export const FETCH_STUDENTS_ERROR = "FETCH_STUDENTS_ERROR"
export const STUDENTS_FETCHED = "STUDENTS_FETCHED"
export const SEARCH_STUDENTS = "SEARCH_STUDENTS"
export const SEARCH_STUDENTS_COMPELETE = "SEARCH_STUDENTS_COMPELETE"
export const STUDENTS_URLS = {
    FETCH_STUDENTS: 'api/students'
}

export const searchStudents = (keyword) => {
    return (dispatch) => {
        let matchedItems = _searchStudents(keyword),
            student_count = matchedItems.length,
            status = student_count <= 0 ? 'No student matched...' : 'Students found: ' + student_count,
            _payload = {items: matchedItems, status: status}
        return dispatch({type: SEARCH_STUDENTS_COMPELETE, payload: _payload})
    }
}

const _searchStudents = (keyword) => {
    console.log('Store: ', store);
    let {all_items} = store.getState().students,
        matchedItems = all_items.filter((el) => {
            let searchName = el.name.toLowerCase(),
                searchRollNumber = el.roll_number.toLowerCase()
            return searchName.indexOf(keyword) !== -1;
        })
    return matchedItems

}
export const fetchStudents = (params) => {
    return (dispatch) => {
        console.log('Fetching students ...');
        fetch(STUDENTS_URLS[FETCH_STUDENTS], {})
            .then((response) => {
                setTimeout(
                    () => {
                        studentFetchSuccess(response, dispatch)
                    },
                    2000
                )
            })
            .catch((exc) => {
                return dispatch({type: FETCH_STUDENTS_ERROR, payload: exc})
            })
        return dispatch({type: FETCHING_STUDENTS, payload: 'Loading students....'})
    }
}

const studentFetchSuccess = (response, dispatch) => {
    if (response.status >= 200 && response.status < 300) {
        response.json()
            .then(studentsJson => {
                return dispatch({
                    type: STUDENTS_FETCHED,
                    payload: {
                        items: studentsJson,
                        updated_at: new Date().toLocaleTimeString()
                    }
                })
            })
    }
}