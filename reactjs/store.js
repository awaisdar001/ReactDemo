import thunk from "redux-thunk";
import studentReducer from "./reducers/students";
import studentEventReducer from "./reducers/studentEvents";
import {createStore, applyMiddleware, combineReducers} from "redux";


const reducers = combineReducers({
    students: studentReducer,
    events: studentEventReducer,
})
const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)
store.subscribe(() => {
    console.log("Store changed: ", store.getState())
})

export default store