import React from 'react'

const ScrollBar = (props) => {
  const {
    scrollBarHeight, scrollBarTop, scrollBarHandleHeight, scrollBarHandleTop,
  } = props

  return (
    <div className="scroll-bar" style={{ height: scrollBarHeight, top: scrollBarTop }}>
      <div
        className="scroll-bar-handle"
        style={{ height: scrollBarHandleHeight, top: scrollBarHandleTop }}
      />
    </div>
  )
}

export default ScrollBar
