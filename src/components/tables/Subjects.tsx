import { ReactNode, useState } from 'react'
import Styles from '../../styles/UI.module.scss'
import { ItemsType } from '../../types/model';
import Loading from '../UI/Loading';
import '../../styles/pagination_style.scss'
import ConfSelect from '../UI/ConfSelect';
import Confirm from '../UI/Confirm';
import { useDispatch } from 'react-redux';
import axios from '../../axios'
import ErrorField from '../UI/ErrorField';
import { InitiaItemsType, deleteSubject } from '../../redux/slice/items';
import SubjectView from '../view/SubjectView';
import SubjectUpdate from '../update/SubjectUpdate';


export const DateFormat = (date: string) => {
    let myDate = new Date(date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', options as any);
    const formattedDate = dateFormatter.format(myDate);
    return formattedDate
}


export default function Subjects({ payload, children }: { payload: InitiaItemsType, children?: ReactNode }) {
    let { data, loading, error } = payload
    const dispatch = useDispatch()
    const [selected, setSelected] = useState<ItemsType | null>(null)
    const [loadingState, setLoadingState] = useState(false)
    const [errorList, setErrorList] = useState(error ?? '')
    const [deleted, setDeleted] = useState<ItemsType | null>(null)
    const [viewElement, setView] = useState<ItemsType | null>(null)
    const [updated, setUpdated] = useState<ItemsType | null>(null)
    const handleDelete = () => {

        if (deleted) {
            setLoadingState(true)
            const response = axios.delete(`/subjects/${deleted.id}`)
            response.then(doc => {
                setDeleted(null)
                dispatch(deleteSubject(deleted))
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
                deleted ?
                    <Confirm callBack={handleDelete} setState={setDeleted} />
                    : null
            }
            {

                errorList ? <ErrorField setError={setErrorList} text={errorList} /> : null
            }
            {
                viewElement ? <SubjectView element={viewElement} setClose={setView} /> : null
            }
            {
                loading || loadingState ? <Loading /> : null
            }
            {
                updated ? <SubjectUpdate element={updated} setClose={setUpdated} /> : null
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
                        data?.data && data?.data.map((item: ItemsType) => (
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
