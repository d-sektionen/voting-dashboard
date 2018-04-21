import React from 'react'
import {connect} from 'utils'
import Panel from 'components/common/Panel'
import ListContainer from 'components/common/ListContainer'
import VoteModal from './EditVoteModal'
import M from 'materialize-css'
import ResultModal from './ResultModal'
import VoteItem from './VoteItem'

class Votes extends React.Component {
  handleNewVote = (vote) => {
    this.props.setEditedVote(vote)
    // find a better way of doing this
    const modalElement = document.getElementById('voteModal')
    const modalInstance = M.Modal.getInstance(modalElement)
    modalInstance.open()

    // {() => this.setEditedVote(vote)
  }

  openResultModal = vote => {
    this.props.setCurrentVote(vote.id)
    M.Modal.init(document.getElementById('resultVoteModal')).open()
  }

  openEditVoteModal = vote => {
    this.props.setEditedVote(vote)
    // TODO: Find a better way of doing this
    M.Modal.init(document.getElementById('editVoteModal')).open()
  }

  render () {
    return (
      <Panel title='Omröstningar'>
        <VoteModal />
        <ResultModal />
        <div className='divider' />
        <ListContainer noItemsText='Inga omröstningar skapde än'>
          {
            this.props.votes.filter(vote => vote.meeting === this.props.currentMeetingID).map(vote => (
              <VoteItem
                {...vote}
                onClick={() => this.openResultModal(vote)}
                onEdit={() => this.openEditVoteModal(vote)}
                key={`vote${vote.id}`}
              />
            ))
          }
        </ListContainer>
      </Panel>
    )
  }
}

export default connect(Votes)
