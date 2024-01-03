import React, { useEffect, useState } from 'react'
import '../../styles/Users_style.scss'
import LayoutHead from '../../components/UI/LayoutHead'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '../../components/UI/Pagination'
import { FetchAllRegions } from '../../redux/slice/regions'
import Regions from '../../components/tables/Regions'
import RegionsCreate from '../../components/create/RegionsCreate'
import { RegionsType } from '../../types/model'

export default function index() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [openCreater, setOpenCreate] = useState(false)
    const regions = useSelector((state: any) => state.regions)
    const [filteredData, setFiltered] = useState<RegionsType[] | null>([])
    const [search, setSearch] = useState('')


    useEffect(() => {
        dispatch(FetchAllRegions({ search, offset: page }) as any)
    }, [page])

    useEffect(() => {
        if (search && regions.data) {
            setFiltered(regions.data.data.filter((item: RegionsType) => item.title.toLowerCase().includes(search.toLowerCase()) || item?.title_kg?.toLowerCase().includes(search.toLowerCase())))
        } else {
            setFiltered(null)
        }
    }, [search])
    
    return (
        <section className='users_layout'>
            {
                openCreater ? <RegionsCreate setClose={setOpenCreate} /> : null
            }
            <div className='container'>
                <LayoutHead placeText='Найти регион в странице...' text='Регионы' setSearch={setSearch} setClose={setOpenCreate} />
                <Regions payload={filteredData != null ? {...regions, data: {...regions.data, data: filteredData}} : regions} >
                    <Pagination pageCount={regions?.data?.totalPages} page={page} setPage={setPage} />
                </Regions>
            </div>
        </section>
    )
}
