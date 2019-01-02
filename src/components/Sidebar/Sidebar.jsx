import React, { Component } from 'react'
import SearchControl from '../SearchControl'
import SchemaControl from '../SchemaControl'
import searchIcon from './search.svg'
import settingsIcon from './settings.svg'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPanel: 'search',
      height: props.height
    }
  }

  togglePanelState = (type) => {
    this.setState({
      currentPanel: type
    })
  }

  toggleSlide = (e) => {
    e.target.parentElement.classList.toggle('slide-in')
  }

  isCurrentPanel = (type) => {
    if (this.state.currentPanel === type) {
      return `${type} panel current`
    } else {
      return `${type} panel`
    }
  }


  render() {
    const { searchQueryOr, searchQueryAnd } = this.props
    const badge = Object.keys(searchQueryOr).length + Object.keys(searchQueryAnd).length

    const settingsIconHtml = {
      __html: settingsIcon
    }

    const searchIconHtml = {
      __html: searchIcon
    }

    const { currentPanel } = this.state

    return(
      <div className='reactable-sidebar'>
        <div className={this.isCurrentPanel('search')}>
          <div className='title' onClick={() => this.togglePanelState('search')}>
            <div dangerouslySetInnerHTML={searchIconHtml} />
            { badge > 0 &&
              <div className='badge'>{badge}</div>
            }
          </div>
          { currentPanel === 'search' &&
            <div className='body' style={{height: this.state.height}}>
              <SearchControl />
            </div>
          }
        </div>

        <div className={this.isCurrentPanel('settings')}>
          <div className='title' onClick={() => this.togglePanelState('settings')}>
            <div dangerouslySetInnerHTML={settingsIconHtml} />
          </div>
          { currentPanel === 'settings' &&
            <div className='body' style={{height: this.state.height}}>
              <SchemaControl />
            </div>
          }
        </div>

        <button className='slide-toggle' onClick={e => this.toggleSlide(e)}> -></button>
      </div>
    )
  }
}

export default Sidebar
