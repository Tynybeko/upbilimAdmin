import React, { useEffect, useState } from 'react'
import UserCreate from '../../components/create/UserCreate'
import LayoutHead from '../../components/UI/LayoutHead'
import Users from '../users'
import Pagination from '../../components/UI/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllItems } from '../../redux/slice/items'
import Subjects from '../../components/tables/Subjects'
import ItemsCreate from '../../components/create/ItemsCreate'
import { ItemsType } from '../../types/model'

export default function index() {
    const dispatch = useDispatch()
    const subjects = useSelector((state: any) => state.subjects)
    const [openCreater, setOpenCreate] = useState(false)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [filteredData, setFiltered] = useState<ItemsType[]>([])

    useEffect(() => {
        dispatch(FetchAllItems({ search, offset: page }) as any)
    }, [page])

    
    useEffect(() => {
        if (search && subjects.data) {
            setFiltered(subjects.data.data.filter((item: ItemsType) => item.title.toLowerCase().includes(search.toLowerCase()) || item?.title_kg?.toLowerCase().includes(search.toLowerCase())))
        } else {
            setFiltered([])
        }
    }, [search])
    return (
        <section className='users_layout'>
            {
                openCreater ? <ItemsCreate setClose={setOpenCreate} /> : null
            }
            <div className='container'>
                <LayoutHead text={'Предметы'} placeText='Найти предмет в странице...' setSearch={setSearch} setClose={setOpenCreate} />
                <Subjects payload={filteredData.length ? { ...subjects, data: {...subjects, data: filteredData} } : subjects} >
                    <Pagination pageCount={subjects?.data?.totalPages} page={page} setPage={setPage} />
                </Subjects>
            </div>
        </section>
    )
}
