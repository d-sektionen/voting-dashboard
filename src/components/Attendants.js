import React from 'react'
import { connect } from 'utils'
import ListContainer from 'components/common/ListContainer'
import TextSubmit from 'components/common/TextSubmit'
import UserItem from 'components/common/UserItem'

const Attendants = props => (
  <div className='panel' id='attendants'>
    <h4 title='Alla personer som får rösta på det valda mötet'>Deltagare</h4>
    <hr />
    <TextSubmit
      placeholder='Nytt LiU-ID för deltagare'
      pattern='^([A-Za-z]){4,5}([0-9]){3}$'
      onSubmit={liuID => props.addAttendant(liuID)}
    />
    <hr />
    <span>Röstlängd: {props.attendants.length}</span>
    <hr />
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
    <button title='Ta bort alla deltagare' className='button-primary remove-all-attendants' onClick={() => props.removeAllAttendants()}>
      Ta bort alla deltagare
    </button>
  </div>
)

export default connect(Attendants)
