import React from 'react'

const ScrollBar = (props) => {
  const {
    scrollBarHeight,
    scrollBarTopOffset,
    scrollBarHandleHeight,
    scrollBarHandleTopOffset,
    scrollBarVisible,
  } = props

  if (!scrollBarVisible) { return null }
  return (
    <div className="scroll-bar" style={{ height: scrollBarHeight, top: scrollBarTopOffset }}>
      <div
        className="scroll-bar-handle"
        style={{ height: scrollBarHandleHeight, top: scrollBarHandleTopOffset }}
      />
    </div>
  )
}

export default ScrollBar
