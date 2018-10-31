import React from 'react'
import { connect } from '../common'
// Great file name :)

function createMeeting (props) {
  const meetingName = prompt('Ge mötet ett beskrivande namn, t.ex. "D-sektionens höstmöte 2020"')
  props.createMeeting(meetingName)
}

function SectionMeetingScanner (props) {
  if (props.sections.length === 0) {
    return (
      <React.Fragment>
        <h2>Sektion</h2>
        Du har inte rättigheter att skapa möten för någon sektion. Kontakta webmaster@d-sektionen.se vid behov.
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <h2>Sektion</h2>
      <select onChange={event => props.setCurrentSection(event.target.value)} value={props.currentSectionID}>
        {props.sections.map(section => (
          <option key={`section${section.id}`} value={section.id}>{section.name}</option>
        ))}
      </select>
      <hr />
      <h2>Möten</h2>
      <button onClick={() => createMeeting(props)}>Nytt möte</button>
      <select onChange={event => props.setCurrentMeeting(event.target.value)} value={props.currentMeetingID}>
        {
          props.meetings
            .filter(meeting => meeting.section.id === props.currentSectionID)
            .map(meeting => (
              <option value={meeting.id} key={`meeting${meeting.id}`}>
                {meeting.name}
              </option>
            ))
        }
      </select>
      <hr />
      <h2>Scanners</h2>
      <table>
        <tbody>
          <tr><td>Jesper Wrang (jeswr740)</td></tr>
          <tr><td>Jesper Wrang (jeswr740)</td></tr>
          <tr><td>Jesper Wrang (jeswr740)</td></tr>
          <tr><td>Jesper Wrang (jeswr740)</td></tr>
        </tbody>
      </table>
      <button>Lägg till scanner</button>
    </React.Fragment>
  )
}

export default connect(SectionMeetingScanner)
