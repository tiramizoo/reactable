import React, { Component } from 'react'
import { sortBy, setSortDirectionToSchema, defaultFormatter } from '../../helpers/utilities'

const cache = {}

class Table extends Component {
  onKeyDown(e) {
    const {
      offset, setOffset, filteredItems, limit, updateViewport,
    } = this.props

    let newOffset
    const moveBy = 1
    const minOffset = 0
    const maxOffset = Math.max(filteredItems.length - limit, 0)

    if (e.key === 'ArrowDown') {
      e.preventDefault()

      // scroll down
      if (e.metaKey) {
        newOffset = maxOffset
      } else {
        newOffset = Math.min(offset + moveBy, maxOffset)
      }

      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()

      // scroll up
      if (e.metaKey) {
        newOffset = minOffset
      } else {
        newOffset = Math.max(offset - moveBy, minOffset)
      }

      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    }
  }

  onWheel(e) {
    e.currentTarget.focus()

    const {
      offset, setOffset, filteredItems, limit, updateViewport,
    } = this.props

    const { deltaY } = e

    if (deltaY > 0) {
      // scroll down
      const moveBy = (deltaY <= 5) ? 1 : 2
      const maxOffset = Math.max(filteredItems.length - limit, 0)
      const newOffset = Math.min(offset + moveBy, maxOffset)
      if (newOffset !== maxOffset) {
        e.preventDefault()
      }
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    } else if (deltaY < 0) {
      // scroll up
      const moveBy = (deltaY >= -5) ? 1 : 2
      const minOffset = 0

      const newOffset = Math.max(offset - moveBy, minOffset)
      setOffset(newOffset)

      if (newOffset !== minOffset) {
        e.preventDefault()
      }
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
      limit, setFilteredItems, items, setSortItems,
    } = this.props
    const direction = this.toggleDirection(key)
    setSortDirection(key, direction)
    const schema = setSortDirectionToSchema(filteredSchema, key, direction)
    const sortedItems = sortBy(filteredItems, schema)
    setOffset(0)
    setFilteredItems(sortedItems)
    setSortItems(sortBy(items, schema))
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
    const { rowHeight, dateFormat, dateSeparator, schema } = this.props
    const value = row[key]
    const classNames = [schemaParams.type]

    if (value === null) {
      classNames.push('null')
    }

    const formatter = schemaParams.formatter || defaultFormatter(schemaParams.type, dateFormat, dateSeparator)
    const cacheKey = `${row._key}/${key}`

    if (cache[cacheKey] === undefined) {
      cache[cacheKey] = formatter.apply(schema, [row[key], row]) || ''
    }

    const cellHtml = { __html: cache[cacheKey] }

    return (
      <td
        className={classNames.join(' ')}
        key={key}
        dangerouslySetInnerHTML={cellHtml}
        style={{ height: rowHeight }}
      />
    )
  }

  renderHeader() {
    const { filteredSchema, actions } = this.props
    return (
      <tr>
        { Object.entries(filteredSchema).map(([key, _]) => this.columnHeader(key))}
        { actions && <th /> }
      </tr>
    )
  }

  renderFooterControls() {
    const { controls } = this.props

    return (
      Object.entries(controls).map(([key, value]) => {
        if (!value) {
          return null
        }

        return (
          <button
            onClick={e => value.onClick(e)}
            className={value.className}
            key={key}
            disabled={value.disabled}
            type="button"
          >
            {value.label || key}
          </button>
        )
      })
    )
  }

  renderFooter() {
    const {
      rowHeight, filteredSchema, filteredItems, items, actions, progressMax, noData,
    } = this.props

    return (
      <tr>
        <th colSpan={Object.keys(filteredSchema).length} style={{ height: rowHeight }}>
          <span>
            {filteredItems.length} / {progressMax || items.length}
          </span>
          { this.renderFooterControls() }
          <progress id="progress-bar" name="progress-bar" max={progressMax} value={items.length}>{items.length}</progress>
          {progressMax === 0 && items.length === 0 && !noData && <div className="loader" /> }
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
        { Object.entries(actions).map(([key, value]) => (
          <button
            onClick={e => value.onClick(row, e)}
            className={value.className}
            key={key}
            disabled={value.disabled && value.disabled(row)}
            type="button"
          >
            {value.label || key}
          </button>
        ))}
      </td>
    )
  }

  renderRow(item) {
    const { filteredSchema } = this.props
    return (
      <tr key={item._key} className="record">
        { Object.entries(filteredSchema).map(([key, keySchema]) => (
          this.columnBody(item, key, keySchema)))}
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
      return Array(limit - currentItems.length).fill().map((a, ix) => (
        <tr key={ix}>
          <td colSpan={Object.keys(filteredSchema).length} style={{ height: rowHeight }} />
        </tr>
      ))
    }
    return null
  }

  render() {
    const {
      tableWidth, currentItems,
    } = this.props

    return (
        <table style={{ width: tableWidth - 30}}>
          <thead>
            { this.renderHeader() }
          </thead>
          <tbody
            tabIndex="0"
            onWheel={e => this.onWheel(e)}
            onKeyDown={e => this.onKeyDown(e)}
          >
            { currentItems.map(item => this.renderRow(item)) }
            { this.renderMissingRows() }
          </tbody>
          <tfoot>
            { this.renderFooter() }
          </tfoot>
        </table>
    )
  }
}

export default Table
