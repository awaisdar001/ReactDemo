// Stateless components can also be called dumb components.
import React from "react";
import moment from "moment";

export const EventsTable = (props) => {
    let hasEvents = props.events.length >= 0;

    const renderEventRows = (events, status) => {
        if (events.length <= 0) {
            return (
                <EmptyEventRow status={status}/>
            )
        } else {
            return (
                events.map(function (event, i) {
                    return <EventRow event={event} key={i}/>
                })
            )
        }
    }

    return (
        <div id="events-list-wrapper" style={{display: hasEvents ? 'block' : 'none'}}>
            <input type="text" name="search-events"
                   onChange={(event) => props.searchEvents(event.target.value.toLowerCase())}/>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Event Title</th>
                    <th>Event Date</th>
                    <th>Verified?</th>
                </tr>
                </thead>
                <tbody>
                {renderEventRows(props.events, props.status)}
                </tbody>
            </table>
        </div>
    )

}


const EventRow = (props) => {

    let student = props.event.student,
        event = props.event.event,
        event_date = props.event.event_date,
        formated_event_date = moment(event_date).format('LL'),
        timeAgo =  moment(event_date).fromNow();
    return (
        <tr>
            <td>{student.name}</td>
            <td>{event.title}</td>
            <td><span className="date timeago" title={ timeAgo }> {formated_event_date} </span></td>
            <td>{(props.event.verified ? 'Verified' : 'Un-Verified')}</td>
        </tr>
    )
}


export const EmptyEventRow = (props) => {
    return (
        <tr>
            <td colSpan="4"><i>{props.status}</i></td>
        </tr>
    )
}
