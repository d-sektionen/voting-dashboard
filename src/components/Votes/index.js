import React from 'react'
import {connect} from 'utils'
import ListContainer from 'components/common/ListContainer'
import EditVoteModal from './EditVoteModal'
// import ResultModal from './ResultModal'
// import VoteItem from './VoteItem'

class Votes extends React.Component {
  openResultModal = vote => {
    // this.props.setCurrentVote(vote.id)
    // M.Modal.init(document.getElementById('resultVoteModal')).open()
  }

  openNewVoteModal = () => {
    this.props.resetEditedVote()
  }

  render () {
    return (
      <div className='panel' id='votes'>
        <h4>Omröstningar</h4>
        <hr />
        <button className='new-vote' onClick={this.openNewVoteModal}>Ny Omröstning</button>
        <hr />
        <ListContainer noItemsText='Inga omröstningar skapde än'>
          {
            this.props.votes.filter(vote => vote.meeting === this.props.currentMeetingID).map(vote => (
              <button
                title={vote.question}
                onClick={() => this.openResultModal(vote)}
                key={`vote${vote.id}`}
              >
                {vote.question}
              </button>
            ))
          }
        </ListContainer>
        <EditVoteModal />
      </div>
    )
  }
}

export default connect(Votes)
