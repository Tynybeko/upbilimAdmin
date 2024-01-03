import React, { useEffect, useState } from 'react'
import '../../styles/Users_style.scss'
import LayoutHead from '../../components/UI/LayoutHead'
import Users from '../../components/tables/Users'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllUser } from '../../redux/slice/users'
import UserCreate from '../../components/create/UserCreate'
import Pagination from '../../components/UI/Pagination'

export default function index() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [openCreater, setOpenCreate] = useState(false)
    const users = useSelector((state: any) => state.users)
    const [search, setSearch] = useState('')
    useEffect(() => {
        dispatch(FetchAllUser({ search, offset: page }) as any)
    }, [search, page])


    return (
        <section className='users_layout'>
            {
                openCreater ? <UserCreate setClose={setOpenCreate} /> : null
            }
            <div className='container'>
                <LayoutHead setSearch={setSearch} setClose={setOpenCreate} />
                <Users payload={users} >
                    <Pagination pageCount={users?.data?.totalPages} page={page} setPage={setPage} />
                </Users>
            </div>
        </section>
    )
}
