import React, { useEffect } from 'react'
import Header from '../components/header'
import NavBar from '../components/navbar'
import { Navigate, Outlet } from 'react-router-dom'
import '../styles/Layout.scss'
import { useDispatch, useSelector } from 'react-redux'
// import { FetchRefreshToken } from '../redux/slice/auth'

export default function Layout() {
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()


    if (user.data == null && user.loading == false) {
        return <Navigate to={'/auth'} />
    }
    // useEffect(() => {
    //     let user = JSON.parse(localStorage.getItem('user') ?? '{}')
    //     if (user.access_token) {
    //         dispatch(FetchRefreshToken() as any)
    //     }
    // }, [])


    return (
        <>
            <Header />
            <main>
                <NavBar />
                <div className='outlet'>
                    <Outlet />
                </div>
            </main>
        </>
    )
}
