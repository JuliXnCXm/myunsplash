import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import '../styles/modal.css'


export default function Modal({children}) {
    useEffect(() => {
        document.body.style.overflowY = "hidden"
    }, [])
    return ReactDOM.createPortal(
        <div className="modalBackground">
            {children}
        </div>,
        document.getElementById('modal')
    )
}
