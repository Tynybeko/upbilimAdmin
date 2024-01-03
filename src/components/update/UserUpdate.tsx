import React, { ChangeEvent, FormEvent, SetStateAction, useState } from 'react'
import { UserType } from '../../types/model'
import Modal from '../Modal'
import '../../styles/userCreate_style.scss'
import Input from '../UI/Input'
import Styles from '../../styles/UI.module.scss'
import axios from '../../axios'
import Select from '../UI/Select'
import { useDispatch } from 'react-redux'
import { setUser, updateUser } from '../../redux/slice/users'
import Loading from '../UI/Loading'


type ErrorVal = {
    lastName: string,
    firstName: string,
    email: string,
    username: string,
    role: string,
    password: string,
    phone: string
}

const data = [
    {
        id: 1,
        title: 'Менеджер',
        value: 'manager'
    },
    {
        id: 2,
        title: 'Админ',
        value: 'admin'
    },
    {
        id: 3,
        title: 'Учитель',
        value: 'teacher'
    },
    {
        id: 4,
        title: 'Клиент',
        value: 'user'
    },
]

export default function UserUpdate({ element, setClose, setErrorList }: { element: UserType, setClose: React.Dispatch<SetStateAction<null | any>>, setErrorList?: React.Dispatch<SetStateAction<string>> }) {
    const dispatch = useDispatch()
    const [userValue, setUserValue] = useState<UserType | undefined>(element)
    const [loadind, setLoading] = useState(false)
    const [error, setError] = useState<ErrorVal>({
        lastName: '',
        firstName: '',
        email: '',
        username: '',
        role: '',
        password: '',
        phone: '',
    })

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        let formData = new FormData(e.target as HTMLFormElement)
        let data = Object.fromEntries(formData.entries())
        axios.patch(`/users/${element.id}`, data, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                setLoading(false)
                dispatch(updateUser(res.data))
                setClose(null)
            }).catch(e => {
                let data = e.response?.data
                if (data) {
                    for (let key in data) {
                        let myKey = key.slice(0, -1)

                        if (myKey == 'role') {
                            setError(prev => ({ ...prev, role: 'Выберите один из ролей' }))
                            continue
                        }
                        setError(prev => ({ ...prev, [myKey]: data[key][0] }))
                    }
                }
                setLoading(false)
            })

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let key = e.target.name
        let value = e.target.value
        setUserValue((prev: any) => ({ ...prev, [key]: value }))
    }

    return (
        <Modal>
            {loadind ? <Loading /> : null}
            <section className='user-create'>
                <div className='user-create_head'>
                    <h1>Изменение данных пользователя</h1>
                    <button onClick={() => setClose((prev: any) => null)}>
                        <svg className="feather feather-x" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
                    </button>

                </div>
                <form onChange={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setError({
                        lastName: '',
                        firstName: '',
                        email: '',
                        username: '',
                        role: '',
                        password: '',
                        phone: '',
                    })
                }} onSubmit={handleSubmit} className='user-create_form' action="">
                    <div className='user-create_form_block'>
                        <Input onChange={handleChange} value={userValue?.username} placeholder='Ivandurov' required type='text' name='username'>
                            <div>
                                <p>Логин</p>
                                <p className='error-text'>{error.username}</p>
                            </div>
                        </Input>
                        <Input onChange={handleChange} value={userValue?.phone} pattern='^\+996\d{9}$' placeholder='+996500000000' required type='phone' name='phone'>
                            <div>
                                <p>Телефон</p>
                                <p className='error-text'>{error.phone}</p>
                            </div>
                        </Input>
                    </div>
                    <div className='user-create_form_block'>
                        <Input onChange={handleChange} value={userValue?.firstName} placeholder='Иван' required type='text' name='firstName'>
                            <p>Имя</p>
                        </Input>
                        <Input onChange={handleChange} value={userValue?.lastName} placeholder='Иванов' required type='text' name='lastName'>
                            <p>Фамилия</p>
                        </Input>
                    </div>
                    <input name='isActive' value={'true'} hidden type="text" />
                    <div className='user-create_form_block'>
                        <Input value={userValue?.email} onChange={handleChange} placeholder='example@gmail.com' required type='email' name='email'>
                            <div>
                                <p>Email</p>
                                <p className='error-text'>{error.email}</p>
                            </div>
                        </Input>
                        <div className='user-create_form_block-item'>
                            <div>
                                <p>Роль</p>
                                <p className='error-text'>{error.role}</p>
                            </div>
                            <Select defaultValue={userValue?.role} attr={{ name: 'role', onChange: handleChange }} selectData={data} />
                        </div>
                    </div>
                    <div className="user-create_form_block br-t">
                        <button className={Styles['btn-action'] + ' sel-no'} type='submit'>Отправить</button>
                        <button onClick={() => setClose(null)} className={Styles['btn-action'] + ' sel-no'} type='button'>Отменить</button>
                    </div>

                </form>

            </section>
        </Modal>
    )
}
