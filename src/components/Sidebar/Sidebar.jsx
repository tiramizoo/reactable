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
      height: props.height,
      show: false,
    }
  }

  togglePanelState = (e, type) => {
    const { show } = this.state

    if (show) {
      this.setState({
        currentPanel: type
      })
    } else {
      this.setState({
        show: !show,
        currentPanel: type,
      })
    }
  }

  toggleSlide = (e) => {
    const { show } = this.state
    this.setState({ show: !show })
  }

  isCurrentPanel = (type) => {
    if (this.state.currentPanel === type) {
      return `${type} panel current`
    }
    return `${type} panel`
  }

  sidebarClass = () => {
    const { show } = this.state
    return show ? '' : 'slide-in'
  }


  render() {
    const { searchQueryOr, searchQueryAnd, schema, filteredSchema } = this.props
    const badge = Object.keys(searchQueryOr).length + Object.keys(searchQueryAnd).length
    const schemaBadge = Object.keys(schema).length
    const filteredSchemaBadge = Object.keys(filteredSchema).length

    const settingsIconHtml = {
      __html: settingsIcon
    }

    const searchIconHtml = {
      __html: searchIcon
    }

    const { currentPanel, show } = this.state

    return(
      <div className={`reactable-sidebar ${this.sidebarClass()}`}>
        <div className={this.isCurrentPanel('search')}>
          <div className='title' onClick={(e) => this.togglePanelState(e, 'search')}>
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
          <div className='title' onClick={(e) => this.togglePanelState(e, 'settings')}>
            <div dangerouslySetInnerHTML={settingsIconHtml} />
            { schemaBadge !== filteredSchemaBadge &&
              <div className='badge'>&#9888;</div>
            }
          </div>
          { currentPanel === 'settings' &&
            <div className='body' style={{height: this.state.height}}>
              <div>visible/all columns: {filteredSchemaBadge}/{schemaBadge} </div>
              <SchemaControl />
            </div>
          }
        </div>

        { show &&
          <button className='slide-toggle' onClick={e => this.toggleSlide(e)}> -></button>
        }
      </div>
    )
  }
}

export default Sidebar
