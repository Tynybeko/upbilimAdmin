import React, { ReactNode } from 'react'
import '../styles/modal_style.scss'

export default function Modal({ children }: { children: ReactNode }) {
    return (
        <div className='modal'>{children}</div>
    )
}
