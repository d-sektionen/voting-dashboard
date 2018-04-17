import React from 'react'
import {connect} from 'utils'
import Panel from 'components/common/Panel'
import ListContainer from 'components/common/ListContainer'
import VoteModal from './VoteModal'
import M from 'materialize-css'
import ResultModal from './ResultModal'

class Votes extends React.Component {
  handleNewVote = (vote) => {
    this.props.setEditedVote(vote)
    // find a better way of doing this
    const modalElement = document.getElementById('voteModal')
    const modalInstance = M.Modal.getInstance(modalElement)
    modalInstance.open()
  }

  render () {
    return (
      <Panel title='Omröstning'>
        <VoteModal />
        <ResultModal />
        {
          this.props.currentMeetingID
            ? <React.Fragment>
              <div className='section right-align' />
              <div className='divider' />
              <ListContainer noItemsText='Inga omröstningar skapde än'>
                {
                  this.props.votes.filter(vote => vote.meeting === this.props.currentMeetingID).map(vote => (
                    <a
                      className={`collection-item ${vote.id === this.props.currentVote.id ? 'active' : ''}`}
                      onClick={() => this.props.getVote(vote.id)}
                      key={`vote${vote.id}`}
                    >
                      {vote.question}
                      <a
                        onClick={() => this.setEditedVote(vote)}
                        title='Redigera omröstning'
                        className='secondary-content red-text user-item'
                      >
                        <i className='material-icons'>edit</i>
                      </a>
                    </a>
                  ))
                }
              </ListContainer>
            </React.Fragment>
            : <p>Inget möte valt</p>
        }
      </Panel>
    )
  }
}

export default connect(Votes)
