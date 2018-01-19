import React from 'react'
import { connect } from 'react-redux'
import { sections } from 'config'
import { setSection } from 'state'
import classNames from 'classnames'

const SectionSelection = props => (
  <div className='valign-wrapper' style={{ lineHeight: 0, height: '100%' }}>
    {sections.map(section => (
      <img
        src={section.logo}
        alt={`${section.name.toUpperCase()}-Sektionen`}
        title={`${section.name.toUpperCase()}-Sektionen`}
        className={classNames('responsive-img', 'section-logo', { grayscale: props.currentSection !== section.id })}
        key={section.name}
        onClick={() => props.handleSetSection(section.id)}
      />
    ))}
  </div>
)


const mapStateToProps = state => ({
  currentSection: state.section,
})

const mapDispatchToProps = dispatch => ({
  handleSetSection: (sectionID) => dispatch(setSection(sectionID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectionSelection)
