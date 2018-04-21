import React from 'react'
import { connect } from 'utils'
import Panel from 'components/common/Panel'
import ListContainer from 'components/common/ListContainer'
import TextSubmit from 'components/common/TextSubmit'
import UserItem from 'components/common/UserItem'

const Scanners = props => (
  <Panel title='Scanners' className='scanners-panel'>
    <TextSubmit
      text='Nytt LiU-ID för scanner'
      pattern='^([A-Za-z]){4,5}([0-9]){3}$'
      onSubmit={liuID => props.addScanner(liuID)}
    />
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
  </Panel>
)

export default connect(Scanners)
