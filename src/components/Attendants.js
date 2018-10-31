import React from 'react'
import { connect } from '../common'

function deleteAllAttendants (props) {
  if (window.confirm('Är du säker på att du vill ta bort alla deltagare?')) {
    props.removeAllAttendants()
  }
}

function addAttendant (props) {
  const liuID = prompt('LiU-ID för den nya deltagaren, t.ex. "jeswr740"')

  if (liuID != null) {
    props.addAttendant(liuID)
  }
}

// this.props.currentMeetingID IMPORTANT
function Attendants (props) {
  if (props.currentMeetingID === undefined) {
    return <h2>Deltagare</h2>
  }

  return (
    <React.Fragment>
      <h2>Deltagare</h2>
      <button onClick={() => addAttendant(props)}>Lägg till deltagare</button>
      <hr />
      <span>Röstlängd: {props.attendants.length}</span>
      <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>LiU-ID</th>
            <th>Ta bort</th>
          </tr>
        </thead>
        <tbody>
          {
            props.attendants.map(attendant => (
              <tr key={`attendant${attendant.id}`}>
                <td>{attendant.user.first_name ? `${attendant.user.first_name} ${attendant.user.last_name}` : ''}</td>
                <td style={{ fontFamily: 'monospace' }}>{attendant.user.username}</td>
                <td >Ta bort</td>
                {/* <td><button onClick={() => props.removeAttendant(attendant.id)}>Ta bort</button></td> */}
              </tr>
            ))
          }
        </tbody>
      </table>
      <button title='Ta bort alla deltagare' onClick={() => deleteAllAttendants(props)}>
      Ta bort alla deltagare
      </button>
    </React.Fragment>
  )
}

export default connect(Attendants)
