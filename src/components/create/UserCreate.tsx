import React, { FormEvent, SetStateAction, useState } from 'react'
import { UserType } from '../../types/model'
import Modal from '../Modal'
import '../../styles/userCreate_style.scss'
import Input from '../UI/Input'
import Styles from '../../styles/UI.module.scss'
import axios from '../../axios'
import Select from '../UI/Select'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slice/users'
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

export default function UserCreate({ element, setClose }: { element?: UserType, setClose: React.Dispatch<SetStateAction<boolean>> }) {
    const dispatch = useDispatch()
    const [view, setView] = useState(false)
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
        console.log(data);
        if (data.password != data.confpass) {
            setError(prev => ({ ...prev, password: 'Пароль и подтверждение пароля не совпадают!' }))
            return
        }
        axios.post('/users', data, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                setLoading(false)
                dispatch(setUser(res.data))
                setClose(prev => !prev)
            }).catch(e => {
                let { message } = e.response?.data
                for (let item of message) {
                    if (item.property == 'role') {
                        setError(prev => ({ ...prev, role: 'Выберите один из ролей' }))
                        continue
                    }
                    setError(prev => ({ ...prev, [item.property]: item?.constraints?.UniqueValidator ?? item?.constraints?.isStrongPassword }))
                }
                setLoading(false)

            })
    }

    return (
        <Modal>
            {loadind ? <Loading /> : null}
            <section className='user-create'>
                <div className='user-create_head'>
                    <h1>Добавить пользователя</h1>
                    <button onClick={() => setClose(prev => !prev)}>
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
                        <Input placeholder='Ivandurov' required type='text' name='username'>
                            <div>
                                <p>Логин</p>
                                <p className='error-text'>{error.username}</p>
                            </div>
                        </Input>
                        <Input pattern='^\+996\d{9}$' placeholder='+996500000000' required type='phone' name='phone'>
                            <div>
                                <p>Телефон</p>
                                <p className='error-text'>{error.phone}</p>
                            </div>
                        </Input>
                    </div>
                    <div className='user-create_form_block'>
                        <Input placeholder='Иван' required type='text' name='firstName'>
                            <p>Имя</p>
                        </Input>
                        <Input placeholder='Иванов' required type='text' name='lastName'>
                            <p>Фамилия</p>
                        </Input>
                    </div>
                    <input name='isActive' value={'true'} hidden type="text" />
                    <div className='user-create_form_block'>
                        <Input placeholder='example@gmail.com' required type='email' name='email'>
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
                            <Select attr={{ name: "role" }} selectData={data} />
                        </div>
                    </div>
                    <div className='user-create_form_block'>
                        <Input placeholder='*********' autoSave='off' autoComplete="off" required type={!view ? `password` : 'text'} name='password'>
                            <div>
                                <p>Пароль</p>
                                <p className='error-text'>{error.password}</p>
                            </div>

                        </Input>
                        <Input autoSave='off' autoComplete="off" placeholder='*********' required type={!view ? `password` : 'text'} name='confpass'>
                            <div>
                                <div className='df'>
                                    <p>Подтверждение пароля</p>
                                    <button type='button'>
                                        {
                                            view ?
                                                <svg onClick={() => setView(prev => !prev)} className="feather feather-eye" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                :
                                                <svg onClick={() => setView(prev => !prev)} className="feather feather-eye-off" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" x2="23" y1="1" y2="23" /></svg>
                                        }
                                    </button>
                                </div>
                                <p className='error-text'>{error.password}</p>
                            </div>

                        </Input>
                    </div>
                    <div className="user-create_form_block br-t">
                        <button className={Styles['btn-action'] + ' sel-no'} type='submit'>Отправить</button>
                    </div>

                </form>

            </section>
        </Modal>
    )
}
