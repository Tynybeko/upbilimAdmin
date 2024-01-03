import { ReactNode, useState } from 'react'
import Styles from '../../styles/UI.module.scss'
import { FetchDeleteUser, deleteUser, type InitiaUserlType } from '../../redux/slice/users'
import { UserType } from '../../types/model';
import Loading from '../UI/Loading';
import '../../styles/pagination_style.scss'
import ConfSelect from '../UI/ConfSelect';
import UserView from '../view/UserView';
import Confirm from '../UI/Confirm';
import { useDispatch } from 'react-redux';
import axios from '../../axios'
import ErrorField from '../UI/ErrorField';
import UserUpdate from '../update/UserUpdate';


export default function Users({ payload, children }: { payload: InitiaUserlType, children?: ReactNode }) {
    let { data, loading, error } = payload
    const dispatch = useDispatch()
    const [selected, setSelected] = useState<UserType | null>(null)
    const [loadingState, setLoadingState] = useState(false)
    const [errorList, setErrorList] = useState(error ?? '')
    const [deleted, setDeleted] = useState<UserType | null>(null)
    const [viewElement, setView] = useState<UserType | null>(null)
    const [updated, setUpdated] = useState<UserType | null>(null)
    const handleDelete = () => {
        if (deleted) {
            setLoadingState(true)
            const response = axios.delete(`users/${deleted.id}`)
            response.then(doc => {
                setDeleted(null)
                dispatch(deleteUser(deleted))
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
                loading || loadingState ? <Loading /> : null
            }
            {
                viewElement ? <UserView element={viewElement} setClose={setView} /> : null
            }
            {
                deleted ?
                    <Confirm callBack={handleDelete} setState={setDeleted} />
                    : null
            }
            {

                errorList ? <ErrorField setError={setErrorList} text={errorList} /> : null
            }
            {
                updated ? <UserUpdate setErrorList={setErrorList} element={updated} setClose={setUpdated} /> : null
            }
            <table className={Styles['users-table']}>

                <thead>
                    <tr>
                        <th colSpan={1}>Пользователь</th>
                        <th colSpan={1}>ФИО</th>
                        <th colSpan={1}>Email</th>
                        <th colSpan={1}>Статус</th>
                        <th colSpan={1}></th>
                    </tr>
                </thead>

                <tbody >

                    {
                        data?.data && data?.data.map((item: UserType) => (
                            <tr>
                                <td colSpan={1}>{item.username}</td>
                                <td colSpan={1}>{(item.firstName ?? '') + ' ' + (item.lastName ?? '')}</td>
                                <td colSpan={1}>{item.email}</td>
                                <td colSpan={1}>{item.role}</td>
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
            </table>
        </>

    )
}
