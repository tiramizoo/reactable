import React, { Component } from 'react'

import { defaultFormatter } from '../../helpers/defaultFormaters'
import { sortBy, setSortDiractionToSchema } from '../../helpers/utilities'

const cellHtml = (row, key, schemaParams) => {
  const formatter = schemaParams.formatter || defaultFormatter(schemaParams.type, key)
  const value = row[key];
  return { __html: formatter(value, row) }
}


class Table extends Component {
  constructor(props) {
    super(props)
    this.tableRef = React.createRef()
  }

  onKeyDown(e) {
    e.stopPropagation()
    e.preventDefault()

    const {
      offset, setOffset, filteredItems, limit, updateViewport,
    } = this.props

    if (e.key === 'ArrowDown') {
      const newOffset = Math.min(offset + 1, Math.max(filteredItems.length - limit, 0))
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    } else if (e.key === 'ArrowUp') {
      const newOffset = Math.max(offset - 1, 0)
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    }
  }

  wtf(e) {
    e.stopPropagation()
    e.preventDefault()

    e.currentTarget.focus()

    const {
      offset, setOffset, filteredItems, limit, updateViewport,
    } = this.props

    const { deltaY } = e

    if (deltaY > 0) {
      const moveBy = (deltaY <= 5) ? 1 : 2

      const newOffset = Math.min(offset + moveBy, Math.max(filteredItems.length - limit, 0))
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    } else if (deltaY < 0) {
      const moveBy = (deltaY >= -5) ? 1 : 2

      const newOffset = Math.max(offset - moveBy, 0)
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    }
  }

  toggleDirection(key) {
    const { filteredSchema } = this.props
    if (!filteredSchema[key].direction) return 'asc'
    if (filteredSchema[key].direction === 'desc') return 'asc'
    return 'desc'
  }

  columnClassName(key) {
    const { filteredSchema } = this.props
    const classNames = [key, 'sortable']
    if (filteredSchema[key].direction) {
      classNames.push('sorted')
      classNames.push(filteredSchema[key].direction)
    }
    return classNames.join(' ')
  }

  columnHeaderName(key) {
    const { filteredSchema } = this.props
    return filteredSchema[key].label || key
  }

  sort(key) {
    const {
      filteredSchema, setSortDirection, setOffset, updateViewport, filteredItems,
      limit, setItems,
    } = this.props
    const direction = this.toggleDirection(key)
    setSortDirection(key, direction)

    const sortedItems = sortBy(filteredItems, setSortDiractionToSchema(filteredSchema, key, direction))
    setOffset(0)
    setItems(sortedItems)
    updateViewport(sortedItems, limit, 0)
  }

  columnHeader(key) {
    const { rowHeight } = this.props
    return (
      <th
        style={{ height: rowHeight }}
        className={this.columnClassName(key)}
        key={key}
        onClick={() => this.sort(key)}
      >
        {this.columnHeaderName(key)}
      </th>
    )
  }

  columnBody(row, key, schemaParams) {
    const { rowHeight } = this.props
    const value = row[key]
    const classNames = [schemaParams.type]

    if (value === null) {
      classNames.push('null')
    }

    return (
      <td
        className={classNames.join(' ')}
        key={key}
        dangerouslySetInnerHTML={cellHtml(row, key, schemaParams)}
        style={{ height: rowHeight }}
      />
    )
  }
  requestFullScreen() {
    const element = this.tableRef.current
    if (document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen) {
      if (element.requestFullscreen) {
        return element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        return element.mozRequestFullScreen()
      } else if (element.webkitRequestFullScreen) {
        return element.webkitRequestFullScreen()
      }
    }
  }

  handleToggleControl(e) {
    e.preventDefault()
    this.props.toggleSearchControl()
  }

  handleToggleSchemaControl(e) {
    e.preventDefault()
    this.props.toggleSchemaControl()
  }

  renderHeader() {
    const { filteredSchema, actions } = this.props
    return (
      <tr>
        { Object.entries(filteredSchema).map(([key, _]) =>
          this.columnHeader(key))
        }
        { actions && <th /> }
      </tr>
    )
  }

  renderFooter() {
    const {
      rowHeight, offset, limit, filteredSchema, filteredItems, currentItems, items, actions,
    } = this.props

    return (
      <tr>
        <th colSpan={Object.keys(filteredSchema).length} style={{ height: rowHeight }}>
          <span>
            offset: {offset},
            limit: {limit},
            filtered: {filteredItems.length},
            current: {currentItems.length},
            total: {items.length}
          </span>
          <button onClick={() => this.requestFullScreen()}>fullscreen</button>
        </th>
        { actions && <th /> }
      </tr>
    )
  }

  renderActions(row) {
    const { actions } = this.props
    if (!actions) return null

    return (
      <td>
        { Object.entries(actions).map(([key, value]) => {
          return (
            <button
              onClick={(e) => value.onClick(row, e)}
              className={value.className}
              key={key}
              disabled={value.disabled && value.disabled(row)}
            >
              {value.label || key}
            </button>
          )
        })}
      </td>
    )
  }

  renderRow(item) {
    const { filteredSchema } = this.props
    return (
      <tr key={item._key} className="record">
        { Object.entries(filteredSchema).map(([key, keySchema]) =>
          this.columnBody(item, key, keySchema))
        }
        { this.renderActions(item) }
      </tr>
    )
  }

  // keeps table height stable by adding fake rows
  renderMissingRows() {
    const {
      rowHeight, limit, currentItems, filteredSchema,
    } = this.props


    if (currentItems.length < limit) {
      return Array(limit - currentItems.length).fill().map((a, ix) => {
        return (
          <tr key={ix}>
            <td colSpan={Object.keys(filteredSchema).length} style={{ height: rowHeight }} />
          </tr>
        )
      })
    }
    return null
  }

  render() {
    const {
      scrollBarHeight, rowHeight, tableWidth, currentItems,
    } = this.props
    return (
      <div
        className="table-wrapper"
        style={{ width: tableWidth, height: scrollBarHeight + rowHeight + rowHeight }}
      >

        <div className='abc'><button onClick={(e) => this.handleToggleSchemaControl(e)}>&#9872;</button></div>
        <div className='control-toggle'><button onClick={(e) => this.handleToggleControl(e)}>&#10050;</button></div>

        <table
          ref={this.tableRef}
          style={{ width: tableWidth }}
          onWheel={e => this.wtf(e)}
          tabIndex="0"
          onKeyDown={e => this.onKeyDown(e)}
        >
          <thead>
            { this.renderHeader() }
          </thead>
          <tbody>
            { currentItems.map(item => this.renderRow(item)) }
            { this.renderMissingRows() }
          </tbody>
          <tfoot>
            { this.renderFooter() }
          </tfoot>
        </table>
      </div>
    )
  }
}

export default Table
