import React, { Component } from 'react'
import SearchControl from '../SearchControl'
import SchemaControl from '../SchemaControl'

const SettingsIcon = (props) => {
  return(
    <div className='reactable-title-icon'>
      <svg viewBox="0 0 26 26">
        <g fill={props.fill}>
          <path d="M1.75,7.75h6.6803589c0.3355713,1.2952271,1.5039063,2.2587891,2.9026489,2.2587891   S13.9000854,9.0452271,14.2356567,7.75H24.25C24.6640625,7.75,25,7.4140625,25,7s-0.3359375-0.75-0.75-0.75H14.2356567   c-0.3355713-1.2952271-1.5039063-2.2587891-2.9026489-2.2587891S8.7659302,4.9547729,8.4303589,6.25H1.75   C1.3359375,6.25,1,6.5859375,1,7S1.3359375,7.75,1.75,7.75z M11.3330078,5.4912109   c0.8320313,0,1.5087891,0.6767578,1.5087891,1.5087891s-0.6767578,1.5087891-1.5087891,1.5087891S9.8242188,7.8320313,9.8242188,7   S10.5009766,5.4912109,11.3330078,5.4912109z" />
          <path d="M24.25,12.25h-1.6061401c-0.3355713-1.2952271-1.5039063-2.2587891-2.9026489-2.2587891   S17.1741333,10.9547729,16.838562,12.25H1.75C1.3359375,12.25,1,12.5859375,1,13s0.3359375,0.75,0.75,0.75h15.088562   c0.3355713,1.2952271,1.5039063,2.2587891,2.9026489,2.2587891s2.5670776-0.963562,2.9026489-2.2587891H24.25   c0.4140625,0,0.75-0.3359375,0.75-0.75S24.6640625,12.25,24.25,12.25z M19.7412109,14.5087891   c-0.8320313,0-1.5087891-0.6767578-1.5087891-1.5087891s0.6767578-1.5087891,1.5087891-1.5087891S21.25,12.1679688,21.25,13   S20.5732422,14.5087891,19.7412109,14.5087891z" />
          <path d="M24.25,18.25H9.7181396c-0.3355103-1.2952271-1.5037842-2.2587891-2.9017334-2.2587891   c-1.3987427,0-2.5670776,0.963562-2.9026489,2.2587891H1.75C1.3359375,18.25,1,18.5859375,1,19s0.3359375,0.75,0.75,0.75h2.1637573   c0.3355713,1.2952271,1.5039063,2.2587891,2.9026489,2.2587891c1.3979492,0,2.5662231-0.963562,2.9017334-2.2587891H24.25   c0.4140625,0,0.75-0.3359375,0.75-0.75S24.6640625,18.25,24.25,18.25z M6.8164063,20.5087891   c-0.8320313,0-1.5087891-0.6767578-1.5087891-1.5087891s0.6767578-1.5087891,1.5087891-1.5087891   c0.8310547,0,1.5078125,0.6767578,1.5078125,1.5087891S7.6474609,20.5087891,6.8164063,20.5087891z" />
        </g>
      </svg>
    </div>
  )
}

const SearchIcon = (props) => {
  return(
    <div className='reactable-title-icon'>
      <svg viewBox="0 0 512 512">
        <g fill={props.fill}>
          <path d="M445,386.7l-84.8-85.9c13.8-24.1,21-50.9,21-77.9c0-87.6-71.2-158.9-158.6-158.9C135.2,64,64,135.3,64,222.9  c0,87.6,71.2,158.9,158.6,158.9c27.9,0,55.5-7.7,80.1-22.4l84.4,85.6c1.9,1.9,4.6,3.1,7.3,3.1c2.7,0,5.4-1.1,7.3-3.1l43.3-43.8  C449,397.1,449,390.7,445,386.7z M222.6,125.9c53.4,0,96.8,43.5,96.8,97c0,53.5-43.4,97-96.8,97c-53.4,0-96.8-43.5-96.8-97  C125.8,169.4,169.2,125.9,222.6,125.9z"/>
        </g>
      </svg>
    </div>
  )
}

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
    const { show, currentPanel } = this.state
    e.stopPropagation()
    if (currentPanel !== type && show) {
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

  sidebarClass = () => {
    const { show } = this.state
    return show ? '' : 'slide-in'
  }

  fillColor = (type) => {
    if (this.state.currentPanel === type) {
      return '#000'
    } else {
      return '#fff'
    }
  }

  titleClass = (type) => {
    if (this.state.currentPanel === type) {
      return `${type} reactable-sidebar-title current`
    } else {
      return `${type} reactable-sidebar-title`
    }
  }


  render() {
    const { searchQueryOr, searchQueryAnd, schema, filteredSchema } = this.props
    const badge = Object.keys(searchQueryOr).length + Object.keys(searchQueryAnd).length
    const schemaBadge = Object.keys(schema).length
    const filteredSchemaBadge = Object.keys(filteredSchema).length

    const { currentPanel, show } = this.state

    return(
      <div className={`reactable-sidebar ${this.sidebarClass()}`}>
        <div className='reactable-sidebar-slide' onClick={e => this.toggleSlide(e)}>
          <div className={this.titleClass('search')} onClick={(e) => this.togglePanelState(e, 'search')}>
            <SearchIcon fill={this.fillColor('search')} />
            { badge > 0 &&
              <div className='reactable-title-badge reactable-badge__red'>{badge}</div>
            }
          </div>

          <div className={this.titleClass('settings')} onClick={(e) => this.togglePanelState(e, 'settings')}>
            <SettingsIcon fill={this.fillColor('settings')} />
            { schemaBadge !== filteredSchemaBadge &&
              <div className='reactable-title-badge reactable-badge__green'>{Object.keys(filteredSchema).length}</div>
            }
          </div>
        </div>

        { show &&
          <div className='reactable-panel'>
            { currentPanel === 'search' &&
              <div className='reactable-panel-body'>
                <SearchControl />
              </div>
            }

            { currentPanel === 'settings' &&
              <div className='reactable-panel-body'>
                <SchemaControl />
              </div>
            }
          </div>
        }

      </div>
    )
  }
}

export default Sidebar
