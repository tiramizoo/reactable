import React from 'react'

const ScrollBar = (props) => {
  const {
    tableWidth,
    scrollBarHeight,
    scrollBarTopOffset,
    scrollBarHandleHeight,
    scrollBarHandleTopOffset,
    scrollBarVisible
  } = props


  if (!scrollBarVisible) { return null } else {
    return (

      <div className='scroll-bar' style={{height: scrollBarHeight, top: scrollBarTopOffset}}>
        <div className='scroll-bar-handle' style={{height: scrollBarHandleHeight, top: scrollBarHandleTopOffset}}></div>
      </div>
    )
  }
}

export default ScrollBar
