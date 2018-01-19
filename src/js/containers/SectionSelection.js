import React from 'react'
import { connect } from 'react-redux'
import { sections } from 'config'
import { setSection } from 'state'

const SectionSelection = props => (
  <div className='valign-wrapper' style={{ lineHeight: 0, height: '100%' }}>
    {sections.map(section => (
      <img
        src={section.logo}
        alt={`${section.name.toUpperCase()}-Sektionen`}
        title={`${section.name.toUpperCase()}-Sektionen`}
        className='responsive-img section-logo'
        style={{
          ...imageStyles,
          filter: props.currentSection !== section.id ? 'grayscale(100%)' : 'none',
          WebkitFilter: props.currentSection !== section.id ? 'grayscale(100%)' : 'none',
       }}
        key={section.name}
        onClick={() => props.handleSetSection(section.id)}
      />
    ))}
  </div>
)

const imageStyles = {
  maxHeight: '64px',
  maxWidth: '64px',
  margin: '0px 2px',
  cursor: 'pointer',
}

const mapStateToProps = (state, ownProps) => ({
  currentSection: state.section,
})

const mapDispatchToProps = dispatch => ({
  handleSetSection: (sectionID) => dispatch(setSection(sectionID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectionSelection)
