// Stateless components can also be called dumb components.
import React from "react";

export const StudentTable = (props) => {
    const renderStudentRows = (students, status) => {
        if (students.length <= 0) {
            return (
                <EmptyStudentRow status={status}/>
            )
        } else {
            return (
                students.map(function (student, i) {
                    return <StudentRow student={student} key={i}/>
                })
            )
        }
    }

    return (
        <div id="student-list-wrapper">
            <div className="col-sm-12">
                <input type="text" name="search-students" className="pull-right"
                       placeholder="Search students..."
                       onChange={(event) => props.searchStudents(event.target.value.toLowerCase())}/>
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Section</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {renderStudentRows(props.students, props.status)}
                </tbody>
            </table>
        </div>
    )

}


const StudentRow = (props) => {
    const student = props.student
    return (
        <tr>
            <td>{student.roll_number}</td>
            <td>{student.name}</td>
            <td>{student.section_display}</td>
            <td>{student.location}</td>
        </tr>
    )
}


export const EmptyStudentRow = (props) => {
    return (
        <tr>
            <td colSpan="4"><i>{props.status}</i></td>
        </tr>
    )
}
