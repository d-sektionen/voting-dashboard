import React from 'react'
import { connect } from 'utils'
import Panel from 'components/common/Panel'
import ListContainer from 'components/common/ListContainer'
import TextSubmit from 'components/common/TextSubmit'
import UserItem from 'components/common/UserItem'

const Attendants = props => (
  <Panel title='Deltagare'>
    {
      props.currentMeetingID
        ? <React.Fragment>
          <TextSubmit
            text='Nytt LiU-ID för deltagare'
            pattern='^([A-Za-z]){4,5}([0-9]){3}$'
            onSubmit={liuID => props.addAttendant(liuID)}
          />
          <ListContainer noItemsText='Inga personer hittades'>
            {
              props.attendants.map(attendant => (
                <UserItem
                  {...attendant}
                  onRemove={() => props.removeAttendant(attendant.id)}
                  removeString='Ta bort som deltagare'
                  key={`attendant${attendant.id}`}
                />
              ))
            }
          </ListContainer>
          {
            props.attendants.length !== 0 &&
            <button className='waves-effect waves-light btn red darken-1 red-button' onClick={() => props.removeAllAttendants()}>
              Ta bort alla deltagare
            </button>
          }
        </React.Fragment>
        : <p>Inget möte valt</p>
    }
  </Panel>
)

export default connect(Attendants)
