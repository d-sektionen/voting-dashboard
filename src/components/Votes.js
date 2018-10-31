import React from 'react'
import { connect } from '../common'
import ListContainer from './common/ListContainer'

const Votes = props => (
  <div className='panel' id='votes'>
    <h4 title='Alla omröstningar som finns tillgängliga för det valda mötet'>Omröstningar</h4>
    <hr />
    <button title='Skapa en ny omröstning' className='new-vote' onClick={() => props.editVote()}>Ny Omröstning</button>
    <hr />
    <ListContainer noItemsText='Inga omröstningar skapde än'>
      {
        props.votes.filter(vote => vote.meeting === props.currentMeetingID).map(vote => (
          <button
            title={vote.question}
            onClick={() => props.showResults(vote.id)}
            key={`vote${vote.id}`}
          >
            {vote.question}
          </button>
        ))
      }
    </ListContainer>
  </div>
)

export default connect(Votes)
