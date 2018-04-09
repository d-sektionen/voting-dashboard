import { Container } from 'unstated'

export default class SectionContainer extends Container {
  state = {
    current: {
      id: null,
      name: null
    },
    all: []
  }

  setCurrentSection (sectionObject) {
    this.setState({current: sectionObject})
  }

  setSections (sections) {
    this.setState({all: sections})
  }
}
