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
        className={classNames('responsive-img', 'section-logo', { grayscale: props.currentSection.id && props.currentSection.id !== section.id })}
        key={section.name}
        onClick={() => props.handleSetSection(section)}
      />
    ))}
  </div>
)


const mapStateToProps = state => ({
  currentSection: state.userInfo.currentSection,
  sections: state.userInfo.sections,
})

const mapDispatchToProps = dispatch => ({
  handleSetSection: (section) => dispatch(setCurrentSection(section)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectionSelection)
