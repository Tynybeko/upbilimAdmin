import React, { useEffect, useState } from 'react'
import LayoutHead from '../../components/UI/LayoutHead'
import Pagination from '../../components/UI/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import ItemsCreate from '../../components/create/ItemsCreate'
import { RatesType } from '../../types/model'
import { FetchAllRates } from '../../redux/slice/tarifs'
import Rates from '../../components/tables/Rates'

export default function index() {
    const dispatch = useDispatch()
    const rates = useSelector((state: any) => state.rates)
    const [openCreater, setOpenCreate] = useState(false)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [filteredData, setFiltered] = useState<RatesType[]>([])

    useEffect(() => {
        dispatch(FetchAllRates({ search, offset: page }) as any)
    }, [search, page])


    return (
        <section className='users_layout'>
            {
                openCreater ? <ItemsCreate setClose={setOpenCreate} /> : null
            }
            <div className='container'>
                <LayoutHead text={'Тарифы'} setSearch={setSearch} setClose={setOpenCreate} />
                <Rates payload={rates} >
                    <Pagination pageCount={rates?.data?.totalPages} page={page} setPage={setPage} />
                </Rates>
            </div>
        </section>
    )
}
