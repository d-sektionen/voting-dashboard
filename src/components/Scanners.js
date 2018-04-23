import React from 'react'
import { connect } from 'utils'
import ListContainer from 'components/common/ListContainer'
import TextSubmit from 'components/common/TextSubmit'
import UserItem from 'components/common/UserItem'

const Scanners = props => (
  <div className='panel' id='scanners'>
    <h4>Scanners</h4>
    <hr />
    <TextSubmit
      placeholder='Nytt LiU-ID för scanner'
      pattern='^([A-Za-z]){4,5}([0-9]){3}$'
      onSubmit={liuID => props.addScanner(liuID)}
    />
    <hr />
    <ListContainer noItemsText='Inga personer hittades'>
      {
        props.scanners.map(scanner => (
          <UserItem
            {...scanner}
            onRemove={() => props.removeScanner(scanner.id)}
            removeString='Ta bort som scanner'
            key={`scanner${scanner.id}`}
          />
        ))
      }
    </ListContainer>
  </div>
)

export default connect(Scanners)
