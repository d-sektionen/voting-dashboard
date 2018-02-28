import React from 'react'
import { connect } from 'react-redux'
import { setCurrentSection } from 'state'
import classNames from 'classnames'
import { getImagePath } from 'utils'

const SectionSelection = props => (
  <div className='valign-wrapper' style={{ lineHeight: 0, height: '100%' }}>
    {props.sections.map(section => (
      <img
        src={getImagePath(section.name)}
        alt={section.name}
        title={section.name}
        // Make logo grey if it's not the currently selected section
        className={classNames('responsive-img', 'section-logo', { grayscale: props.currentSection.id !== section.id })}
        key={section.name}
        onClick={() => props.setSection(section)}
      />
    ))}
  </div>
)


const mapStateToProps = state => ({
  currentSection: state.sections.current,
  sections: state.sections.all,
})

const mapDispatchToProps = dispatch => ({
  setSection: (section) => dispatch(setCurrentSection(section)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectionSelection)
