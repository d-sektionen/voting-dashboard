import React from 'react'
import TextInput from 'components/Materialize/TextInput'
import FilterInput from 'components/Materialize/FilterInput'


export default props => (
  <div className='collection'>
    <FilterInput />
    {props.children}
    <TextInput text='Nytt möte' id='newMeeting' />
  </div>
)
