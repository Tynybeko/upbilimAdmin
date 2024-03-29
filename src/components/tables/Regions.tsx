import { ReactNode, useState } from 'react'
import Styles from '../../styles/UI.module.scss'
import { RegionsType } from '../../types/model';
import Loading from '../UI/Loading';
import '../../styles/pagination_style.scss'
import ConfSelect from '../UI/ConfSelect';
import Confirm from '../UI/Confirm';
import { useDispatch } from 'react-redux';
import axios from '../../axios'
import ErrorField from '../UI/ErrorField';
import { InitialRegionsType, deleteRegion } from '../../redux/slice/regions';
import RegionView from '../view/RegionView';
import RegionUpdate from '../update/RegionUpdate';


export const DateFormat = (date: string) => {
    let myDate = new Date(date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', options as any);
    const formattedDate = dateFormatter.format(myDate);
    return formattedDate
}


export default function Regions({ payload, children }: { payload: InitialRegionsType, children?: ReactNode }) {
    let { data, loading, error } = payload
    const dispatch = useDispatch()
    const [selected, setSelected] = useState<RegionsType | null>(null)
    const [loadingState, setLoadingState] = useState(false)
    const [errorList, setErrorList] = useState(error ?? '')
    const [deleted, setDeleted] = useState<RegionsType | null>(null)
    const [viewElement, setView] = useState<RegionsType | null>(null)
    const [updated, setUpdated] = useState<RegionsType | null>(null)
    const handleDelete = () => {
        if (deleted) {
            setLoadingState(true)
            const response = axios.delete(`/regions/${deleted.id}`)
            response.then(doc => {
                setDeleted(null)
                dispatch(deleteRegion(deleted))
            }).catch(e => {
                setDeleted(null)
                setErrorList('Что пошло не так при удалении!')
            }).finally(() => {
                setLoadingState(false)
            })
        }
    }
    return (
        <>
            {
                deleted ? <Confirm callBack={handleDelete} setState={setDeleted} /> : null
            }
            {
                loading || loadingState ? <Loading /> : null
            }
            {
                errorList ? <ErrorField setError={setErrorList} text={errorList } /> : null
            }
            {
                viewElement ? <RegionView element={viewElement} setClose={setView} /> : null
            }
            {
                updated ? <RegionUpdate element={updated} setClose={setUpdated} /> : null
            }
            < table className={Styles['users-table']}>

                <thead>
                    <tr>
                        <th colSpan={1}>Название/Аталышы</th>
                        <th colSpan={1}>Дата создание</th>
                        <th colSpan={1}></th>
                    </tr>
                </thead>

                <tbody >
                    {
                        data?.data?.length == 0 && (error == '') ? <tr>
                            {/* <td colSpan={1}></td> */}
                            <td colSpan={2}>Пусто</td>
                            <td colSpan={1}>
                            </td>
                        </tr>
                            : null
                    }
                    {
                        data?.data && data?.data.map((item: RegionsType) => (
                            <tr>
                                <td colSpan={1}>{item.title ?? ''}/{item.title_kg ?? ''}</td>
                                <td colSpan={1}>{DateFormat(item.createdAt)}</td>
                                <td colSpan={1}>
                                    <button onClick={() => setSelected(item)}>
                                        <svg className="feather feather-align-center" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="10" y2="10" /><line x1="21" x2="3" y1="6" y2="6" /><line x1="21" x2="3" y1="14" y2="14" /><line x1="18" x2="6" y1="18" y2="18" /></svg>
                                    </button>

                                </td>
                                {selected && selected.id == item.id ? <ConfSelect setUpdated={setUpdated} element={selected} setView={setView} setDeleted={setDeleted} setClose={setSelected} /> : null}
                            </tr>
                        ))
                    }

                </tbody>
                {children}
            </table >
        </>

    )
}
