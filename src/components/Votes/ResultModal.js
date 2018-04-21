import React from 'react'
import { connect, alternativeSort } from 'utils'

const ResultModal = props => (
  <div id='resultVoteModal' className='modal'>
    <div className='modal-content'>
      {
        props.currentVote.id &&
        <div className='section'>
          <h5>Fråga: {props.currentVote.question}</h5>
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
        </div>
      }
    </div>
  </div>
)

export default connect(ResultModal)
