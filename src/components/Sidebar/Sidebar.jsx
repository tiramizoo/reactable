import React, { Component } from 'react'
import SearchControl from '../SearchControl'
import SchemaControl from '../SchemaControl'
import filter from 'lodash/filter'

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
        currentPanel: type,
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

  renderFooterControls() {
    const { controls } = this.props

    return Object.entries(controls).map(([key, value]) => {
      if (!value) {
        return null
      }

      return (
        <button
          onClick={(e) => value.onClick(e)}
          className={value.className}
          key={key}
          disabled={value.disabled}
          title={value.label || key}
        />
      )
    })
  }

  render() {
    const { searchQueryOr, searchQueryAnd, schema, filteredSchema } = this.props
    const badge = Object.keys(searchQueryOr).length + Object.keys(searchQueryAnd).length
    const schemaBadge = Object.values(schema).filter((entry) => {
      return entry.secret !== true
    }).length
    const filteredSchemaBadge = Object.keys(filteredSchema).length

    const { currentPanel, show } = this.state

    return (
      <div className={`reactable-sidebar ${this.sidebarClass()}`}>
        <div className="reactable-sidebar-slide" onClick={(e) => this.toggleSlide(e)}>
          <div className={this.titleClass('search')} onClick={(e) => this.togglePanelState(e, 'search')}>
            <span className="r-icon-search"></span>
            {badge > 0 && <div className="reactable-title-badge reactable-badge__red">{badge}</div>}
          </div>

          <div className={this.titleClass('settings')} onClick={(e) => this.togglePanelState(e, 'settings')}>
            <div className="r-icon-sliders"></div>
            {schemaBadge !== filteredSchemaBadge && (
              <div className="reactable-title-badge reactable-badge__green">{Object.keys(filteredSchema).length}</div>
            )}
          </div>

          <div className="reactable-sidebar-controls">{this.renderFooterControls()}</div>
        </div>

        {show && (
          <div className="reactable-panel">
            {currentPanel === 'search' && (
              <div className="reactable-panel-body">
                <SearchControl />
              </div>
            )}

            {currentPanel === 'settings' && (
              <div className="reactable-panel-body">
                <SchemaControl />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Sidebar
