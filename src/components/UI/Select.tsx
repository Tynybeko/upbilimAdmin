import React, { InputHTMLAttributes, ReactNode, useState } from 'react'



export default function Select({ children, selectData, defaultValue, attr }: { children?: ReactNode, selectData?: any[], attr?: InputHTMLAttributes<HTMLInputElement>, defaultValue?: any}) {
    const [state, setState] = useState({
        id: 0,
        value: '',
        title: 'Выберите'
    })
    const [open, setOpen] = useState(false)

    return (
        <div className='selector sel-no'>
            <div onClick={() => setOpen(prev => !prev)} className='selector-action'>
                <p>{defaultValue?.title ?? state.title}</p>
                {children}
                <input value={defaultValue?.value ?? state.value} {...attr} hidden type="text" />
            </div>
            <div className='rel'>
                <div className={`selector-select ${open ? 'actived' : ''}`}>
                    <ul>
                        {
                            selectData && selectData.map(item => (
                                <li key={item.id} onClick={() => {
                                    setState(item)
                                    setOpen(false)
                                }}>{item.title}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}
