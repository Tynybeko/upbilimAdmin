import React, { useEffect, useState } from 'react'
import LayoutHead from '../../components/UI/LayoutHead'
import Pagination from '../../components/UI/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllItems } from '../../redux/slice/items'
import Subjects from '../../components/tables/Subjects'
import CitiesCreate from '../../components/create/CitiesCreate'
import Cities from '../../components/tables/Cities'
import { FetchAllCities } from '../../redux/slice/cities'

export default function index() {
    const dispatch = useDispatch()
    const cities = useSelector((state: any) => state.cities)
    const [openCreater, setOpenCreate] = useState(false)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(FetchAllCities({ search, offset: page }) as any)
    }, [search, page])



    return (
        <section className='users_layout'>
            {
                openCreater ? <CitiesCreate setClose={setOpenCreate} /> : null
            }
            <div className='container'>
                <LayoutHead text={'Города и районы'} setSearch={setSearch} setClose={setOpenCreate} />
                <Cities payload={cities} >
                    <Pagination pageCount={cities?.data?.totalPages} page={page} setPage={setPage} />
                </Cities>
            </div>
        </section>
    )
}
