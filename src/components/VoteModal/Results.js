import React from 'react'
import { connect, alternativeSort } from '../../common'

const ResultModal = props => (

  props.currentVote.id &&
  <React.Fragment>
    <h4>Fråga: {props.currentVote.question}</h4>
    <table>
      <thead>
        <tr>
          <th>Alternativ</th>
          <th>Röster</th>
        </tr>
      </thead>
      <tbody>
        {
          props.currentVote.alternatives.sort(alternativeSort).map(vote => (
            <tr key={`vote${vote.id}`}>
              <td>{vote.text}</td>
              <td>{vote.num_votes}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
    <button title='Redigera omröstning' onClick={() => props.editVote(props.currentVote)}>Redigera omröstning</button>
  </React.Fragment>

)

export default connect(ResultModal)
