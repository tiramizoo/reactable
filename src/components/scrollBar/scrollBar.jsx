import React from 'react'

const ScrollBar = (props) => {
  const {
    scrollBarHeight,
    scrollBarTopOffset,
    scrollBarHandleHeight,
    scrollBarHandleTopOffset,
    scrollBarVisible,
    sidebarVisible
  } = props

  if (!scrollBarVisible) { return null }
  return (
    <div className="scroll-bar" style={{ height: scrollBarHeight, top: scrollBarTopOffset, right: (sidebarVisible) ? 30 : 0 }}>
      <div
        className="scroll-bar-handle"
        style={{ height: scrollBarHandleHeight, top: scrollBarHandleTopOffset }}
      />
    </div>
  )
}

export default ScrollBar
