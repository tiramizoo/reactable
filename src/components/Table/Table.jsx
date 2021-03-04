import React from 'react'
import {
  sortBy,
  setSortDirectionToSchema,
  defaultFormatter,
} from '../../helpers/utilities'
import xss from 'xss'

const cache = {}

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.tbodyRef = React.createRef()
    this.state = { selectedAll: false }
  }

  onKeyDown(e) {
    const {
      offset,
      setOffset,
      filteredItems,
      limit,
      updateViewport,
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

  componentDidMount() {
    this.tbodyRef.current.addEventListener(
      'wheel',
      (e) => {
        this.onWheel(e)
      },
      { passive: false },
    )
  }

  onMouseDown(e) {
    e.stopPropagation()
    const startMouseX = e.screenX
    const th = e.currentTarget.parentElement
    const startW = th.offsetWidth

    const minColumnWidth = 5
    const maxColumnWidth = 300

    function onMouseMove(e) {
      const w = startW + e.screenX - startMouseX
      th.style.width =
        Math.min(maxColumnWidth, Math.max(minColumnWidth, w)) + 'px'
    }

    function onMouseUp(e) {
      onMouseMove(e)

      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }

    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)
  }

  onWheel(e) {
    e.currentTarget.focus()

    const {
      offset,
      setOffset,
      filteredItems,
      limit,
      updateViewport,
    } = this.props

    const { deltaY } = e

    if (deltaY > 0) {
      // scroll down
      const moveBy = deltaY <= 5 ? 1 : 2
      const maxOffset = Math.max(filteredItems.length - limit, 0)
      const newOffset = Math.min(offset + moveBy, maxOffset)
      if (newOffset !== maxOffset) {
        e.preventDefault()
      }
      setOffset(newOffset)
      updateViewport(filteredItems, limit, newOffset)
    } else if (deltaY < 0) {
      // scroll up
      const moveBy = deltaY >= -5 ? 1 : 2
      const minOffset = 0

      const newOffset = Math.max(offset - moveBy, minOffset)
      setOffset(newOffset)

      if (newOffset !== minOffset) {
        e.preventDefault()
      }
      updateViewport(filteredItems, limit, newOffset)
    }
  }

  toggleSelectedAll() {
    const { filteredItems, setSelectedItems } = this.props
    const { selectedAll } = this.state
    this.setState({ selectedAll: !selectedAll })
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

  columnHeaderWidth(schemaKey) {
    if (schemaKey.width) {
      return schemaKey.width
    } else {
      const defaultWidths = {
        boolean: 60,
        date: 90,
        time: 70,
        number: 60,
        duration: 70,
        datetime: 140,
      }
      return defaultWidths[schemaKey.type]
    }
  }

  sort(key) {
    const {
      filteredSchema,
      setSortDirection,
      setOffset,
      updateViewport,
      filteredItems,
      limit,
      setFilteredItems,
      items,
      setSortItems,
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
    const { rowHeight, filteredSchema } = this.props

    const columnWidth = this.columnHeaderWidth(filteredSchema[key])

    return (
      <th
        style={{ width: columnWidth, height: rowHeight }}
        className={this.columnClassName(key)}
        key={key}
        onClick={() => this.sort(key)}
      >
        <span title={this.columnHeaderName(key)}>
          {this.columnHeaderName(key)}
        </span>
        <div
          className="reactable-resize-column"
          onMouseDown={this.onMouseDown}
        ></div>
      </th>
    )
  }

  columnBody(row, key, schemaParams) {
    const { rowHeight, schema, displayTimeZone, disableSeconds } = this.props
    const value = row[key]
    const classNames = [schemaParams.type]

    if (value === null) {
      classNames.push('null')
    }

    const formatter =
      schemaParams.formatter ||
      defaultFormatter(schemaParams.type, displayTimeZone, disableSeconds)
    const cacheKey = `${row._key}/${key}`

    if (cache[cacheKey] === undefined || schemaParams.type === 'datetime') {
      cache[cacheKey] = formatter.apply(schema, [row[key], row]) || ''
    }

    let altTitle
    if (schemaParams.type !== 'boolean' && value !== null) {
      altTitle = xss(
        defaultFormatter(
          schemaParams.type,
          displayTimeZone,
          disableSeconds,
        ).apply(schema, [row[key], row]) || '',
      )
    }

    let cellHtml

    if (altTitle) {
      cellHtml = {
        __html: `<span title="${altTitle}">${cache[cacheKey]}</span>`,
      }
    } else {
      cellHtml = { __html: cache[cacheKey] }
    }

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
    const { selectedAll } = this.state
    return (
      <tr>
        <th>
          <input
            type="checkbox"
            checked={selectedAll}
            onClick={() => this.toggleSelectedAll()}
          />
        </th>
        {Object.entries(filteredSchema).map(([key, _]) =>
          this.columnHeader(key),
        )}
        {actions && <th />}
      </tr>
    )
  }

  renderActions(row) {
    const { actions } = this.props
    if (!actions) return null

    return (
      <td>
        {Object.entries(actions).map(([key, value]) => (
          <button
            onClick={(e) => value.onClick(row, e)}
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
        <td>
          <input type="checkbox" />
        </td>
        {Object.entries(filteredSchema).map(([key, keySchema]) =>
          this.columnBody(item, key, keySchema),
        )}
        {this.renderActions(item)}
      </tr>
    )
  }

  // keeps table height stable by adding fake rows
  renderMissingRows() {
    const { rowHeight, limit, currentItems, filteredSchema } = this.props

    if (currentItems.length < limit) {
      return Array(limit - currentItems.length)
        .fill()
        .map((a, ix) => (
          <tr key={ix}>
            <td
              colSpan={Object.keys(filteredSchema).length}
              style={{ height: rowHeight }}
            />
          </tr>
        ))
    }
    return null
  }

  render() {
    const { tableWidth, currentItems, sidebarVisible } = this.props

    const sidebarWidth = 30

    let adjustedTableWidth

    if (sidebarVisible) {
      adjustedTableWidth = tableWidth - sidebarWidth
    } else {
      adjustedTableWidth = tableWidth
    }

    return (
      <table style={{ width: adjustedTableWidth }}>
        <thead>{this.renderHeader()}</thead>
        <tbody
          ref={this.tbodyRef}
          tabIndex="0"
          onKeyDown={(e) => this.onKeyDown(e)}
        >
          {currentItems.map((item) => this.renderRow(item))}
          {this.renderMissingRows()}
        </tbody>
      </table>
    )
  }
}

export default Table
