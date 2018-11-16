import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'

import { defaultFormatter } from '../../helpers/defaultFormaters'

class Table extends Component {
  scrollContent(e) {
    const {
      filteredItems, limit, scrollBarHandleHeight, scrollBarHeight,
      rowHeight, setOffset, updateViewport,
    } = this.props
    const offsetMax = filteredItems.length - limit // 100 - 20 = 80
    const scrollableHeight = scrollBarHandleHeight - scrollBarHeight // 3000 - 600 = 2400
    const scrollTop = Math.min(scrollableHeight, e.target.scrollTop) // ios only: reject values > 2400
    const newOffset = offsetMax - Math.round((scrollableHeight - Math.max(0, scrollTop)) / rowHeight)

    setOffset(newOffset)
    updateViewport(filteredItems, limit, newOffset)
  }

  toggleDirection(key) {
    const { schema } = this.props
    if (!schema[key].direction) return 'asc'
    if (schema[key].direction === 'desc') return 'asc'
    return 'desc'
  }

  columnClassName(key) {
    const { schema } = this.props
    const classNames = [key]
    if (schema[key].direction) {
      classNames.push('sorted')
      classNames.push(schema[key].direction)
    }
    return classNames.join(' ')
  }

  sort(key) {
    const {
      schema, setSortDirection, sortItems, setOffset, updateViewport, filteredItems,
      limit,
    } = this.props
    const direction = this.toggleDirection(key)
    setSortDirection(key, direction)
    sortItems(key, schema[key].type, direction)
    setOffset(0)
    updateViewport(filteredItems, limit, 0)
  }

  cellHtml(row, key, schemaParams) {
    const formatter = schemaParams.formatter || defaultFormatter(schemaParams.type, key)
    const html = !isEmpty(row[key]) ? formatter(row) : ''
    return { __html: html }
  }

  hideColumn(schemaParams) {
    return schemaParams.hide !== 'undefined' && schemaParams.hide === true
  }

  columnHeader(key, schemaParams) {
    const { rowHeight } = this.props
    if (this.hideColumn(schemaParams)) {
      return null
    }
    return (
      <th style={{ height: rowHeight }} className={this.columnClassName(key)} key={key} onClick={() => this.sort(key)}>
        {key}
      </th>
    )
  }

  columnBody(row, key, schemaParams) {
    const { rowHeight } = this.props

    if (this.hideColumn(schemaParams)) {
      return null
    }
    return (
      <td
        className={schemaParams.type}
        key={key}
        dangerouslySetInnerHTML={this.cellHtml(row, key, schemaParams)}
        style={{ height: rowHeight }}
      />
    )
  }

  renderHeader() {
    const { schema } = this.props
    return (
      <tr>
        { Object.entries(schema).map(([key, keySchema]) =>
          this.columnHeader(key, keySchema))
        }
      </tr>
    )
  }


  renderFooter() {
    const {
      rowHeight, offset, limit, filteredItems, items, visibleColumnsCount,
    } = this.props
    return (
      <tr>
        <th colSpan={visibleColumnsCount} style={{ height: rowHeight }}>
          offset: {offset},  limit: {limit}, filtered: {filteredItems.length}, total: {items.length}
        </th>
      </tr>
    )
  }

  renderRow(item) {
    const { schema } = this.props
    return (
      <tr key={item.id} className="record">
        { Object.entries(schema).map(([key, keySchema]) =>
          this.columnBody(item, key, keySchema))
        }
      </tr>
    )
  }

  renderMissingRows() {
    const {
      rowHeight, limit, filteredItems, visibleColumnsCount,
    } = this.props

    if (filteredItems.length < limit) {
      return Array(limit - filteredItems.length).fill().map((a, ix) => {
        return (
          <tr key={ix}>
            <td colSpan={visibleColumnsCount} style={{ height: rowHeight }} />
          </tr>
        )
      })
    }
    return null
  }


  render() {
    const {
      scrollBarWidth, scrollBarHeight, rowHeight, scrollBarHandleHeight,
      tableWidth, currentItems,
    } = this.props
    return (
      <div
        className="table-wrapper"
        style={{ width: scrollBarWidth + 30, height: scrollBarHeight + rowHeight + rowHeight }}
      >
        <div
          className="scroll-bar"
          onScroll={e => this.scrollContent(e)}
          style={{ height: scrollBarHeight, width: 30, top: rowHeight }}
        >
          <div className="scroll-bar-handle" style={{ height: scrollBarHandleHeight }} />
        </div>

        <table style={{ width: tableWidth }}>
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
