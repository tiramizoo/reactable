import React, { Component } from 'react'

import { defaultFormatter } from '../../helpers/defaultFormaters'

const cellHtml = (row, key, schemaParams) => {
  const formatter = schemaParams.formatter || defaultFormatter(schemaParams.type, key)
  let html = ''
  if (row[key] !== 'undefined' && row[key] !== null) {
    html = formatter(row)
  }
  return { __html: html }
}

const hideColumn = (schemaParams) => {
  return schemaParams.hide !== 'undefined' && schemaParams.hide === true
}

class Table extends Component {
  componentDidMount() {
    console.log('didComponentMount')
  }

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

  wtf(e) {
    e.preventDefault()

    const {
      offset, setOffset, filteredItems, limit, updateViewport
    } = this.props

    if (e.deltaY > 0) {
      const newOffset = Math.min(offset + 1, filteredItems.length)
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    } else {
      const newOffset = Math.max(offset - 1, 0)
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    }
  }


  onKeyDown(e) {
    e.preventDefault()

    const {
      offset, setOffset, filteredItems, limit, updateViewport
    } = this.props

    if (e.key === 'ArrowDown') {
      const newOffset = Math.min(offset + 1, filteredItems.length)
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    } else if (e.key === 'ArrowUp') {
      const newOffset = Math.max(offset - 1, 0)
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    }
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

  columnHeader(key, schemaParams) {
    const { rowHeight } = this.props
    if (hideColumn(schemaParams)) {
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

    if (hideColumn(schemaParams)) {
      return null
    }
    return (
      <td
        className={schemaParams.type}
        key={key}
        dangerouslySetInnerHTML={cellHtml(row, key, schemaParams)}
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
      rowHeight, limit, visibleColumnsCount, currentItems
    } = this.props


    if (currentItems.length < limit) {
      return Array(limit - currentItems.length).fill().map((a, ix) => {
        return (
          <tr key={ix}>
            <td colSpan={visibleColumnsCount} style={{ height: rowHeight }} />
          </tr>
        )
      })
    }
    return null
  }

  handleShowControlToggle() {
    this.props.toggleControlShow()
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
        <div><button onClick={() => this.handleShowControlToggle()}>o</button></div>


        <table style={{ width: tableWidth }} onWheel={e => this.wtf(e)} tabIndex="0" onKeyDown={e => this.onKeyDown(e)}>
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
