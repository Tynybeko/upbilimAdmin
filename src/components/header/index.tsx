import React from 'react'
import '../../styles/header_style.scss'
import Button from '../UI/Button'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth'


export default function index() {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(logout())
    }
    return (
        <header className='header'>
            <div className='header-logo'>
                <img className='sel-no' src="/logo.svg" alt="Logo" />
            </div>
            <div className='header-body'>
                <h1 className="header-logo_title sel-no">Админка</h1>

                <Button onClick={handleClick} className='sel-no'>

                    Выход</Button>
            </div>

        </header>
    )
}
