import React from 'react'

const ScrollBar = (props) => {
  const {
    scrollBarVisible, scrollBarHeight, scrollBarTop, scrollBarHandleHeight, scrollBarHandleTop,
  } = props

  if (scrollBarVisible) {
    return (
      <div className="scroll-bar" style={{ height: scrollBarHeight, top: scrollBarTop }}>
        <div
          className="scroll-bar-handle"
          style={{ height: scrollBarHandleHeight, top: scrollBarHandleTop }}
        />
      </div>
    )
  }
  return null
}

export default ScrollBar
