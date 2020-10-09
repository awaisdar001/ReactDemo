import React from "react";
import {connect} from "react-redux";
import * as studentActions from "../actions/studentActions";
import * as studentEventActions from "../actions/studentEventActions";
import {Headline} from "../components/Headline";
import {StudentTable} from "../components/StudentList";
import {EventsTable} from "../components/StudentEventList";


class HomePageContainer extends React.Component {
    render() {
        let students = this.props.reducerStudents;
        let studentEvents = this.props.reducerStudentEvents;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <Headline>CSIT F07 HomePage!!!</Headline>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Headline>Student Actions</Headline>
                        <button className="bth btn-default">Add Student</button>
                        <button
                            className="bth btn-default"
                            onClick={() => this.props.fetchStudents()}
                        >List Students</button>


                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Headline>Event Actions</Headline>
                        <button className="bth btn-default">Add Event</button>
                        <button
                            className="bth btn-default"
                            onClick={() => this.props.fetchEvents()}
                        >List Events</button>
                    </div>
                </div>
                <hr />
                <div id="list-students-container" className={"row " + (students.isHidden ? 'hidden' : '')}>
                    <StudentTable
                        students={students.items}
                        status={students.status}
                        searchStudents={this.props.searchStudents}
                    />
                </div>

                <div id="list-student-events-container" className={"row " + (studentEvents.isHidden ? 'hidden' : '')}>
                    <EventsTable
                        events={studentEvents.events}
                        status={studentEvents.status}
                        searchEvents={this.props.searchEvents}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        reducerStudents: state.students,
        reducerStudentEvents: state.events

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudents: () => {
            dispatch(studentActions.fetchStudents());
        },
        searchStudents: (keyword) => {
            dispatch(studentActions.searchStudents(keyword))
        },

        fetchEvents: () => {
            dispatch(studentEventActions.fetchEvents());
        },

        searchEvents: (keyword) => {
            dispatch(studentEventActions.searchEvents(keyword))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);