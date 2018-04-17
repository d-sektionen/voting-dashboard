import React from 'react'
import { connect, alternativeSort } from 'utils'

const ResultModal = props => (
  this.props.currentVote.id &&
    <div className='section'>
      <h5>Fråga: {this.props.currentVote.question}</h5>
      <table>
        <thead>
          <tr>
            <th>Alternativ</th>
            <th>Röster</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.currentVote.alternatives.sort(alternativeSort).map(vote => (
              <tr key={`vote${vote.id}`}>
                <td>{vote.text}</td>
                <td>{vote.num_votes}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>

)

export default connect(ResultModal)
