import React from 'react'
import { ReactDOM } from 'react'

export default function Portal(props) {
    return ReactDOM.createPortal(
    <div className="portal" onClick={props.onclickHandler}>menu</div>,
    document.getElementById('portal')
  )
}

