import React from 'react'
import { connect } from '../common'

// this.props.currentMeetingID IMPORTANT
function Votes (props) {
  if (props.currentMeetingID === undefined) {
    return <h2>Omröstningar</h2>
  }

  return (
    <React.Fragment>
      <h2>Omröstningar</h2>
      <button onClick={() => props.editVote()}>Ny Omröstning</button>
      <table>
        <thead>
          <tr>
            <th>Fråga</th>
            <th>Resultat</th>
            <th>Redigera</th>
          </tr>
        </thead>
        <tbody>
          {
            props.votes
              .filter(vote => vote.meeting === props.currentMeetingID)
              .map(vote => (
                <tr key={`vote${vote.id}`}>
                  <td> {vote.question}                  </td>
                  <td><button onClick={() => props.showResults(vote.id)} /></td>
                  <td>X</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </React.Fragment>
  )
}
export default connect(Votes)
