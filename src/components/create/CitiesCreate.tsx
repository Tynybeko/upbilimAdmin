import React, { FormEvent, SetStateAction, useEffect, useState } from 'react'
import { CitiesType, RegionsType, UserType } from '../../types/model'
import Modal from '../Modal'
import '../../styles/userCreate_style.scss'
import Input from '../UI/Input'
import Styles from '../../styles/UI.module.scss'
import axios from '../../axios'
import { useDispatch } from 'react-redux'
import Loading from '../UI/Loading'
import { setSubject } from '../../redux/slice/items'
import Select from '../UI/Select'
import { setCity } from '../../redux/slice/cities'


type ErrorVal = {
    title_kg: string,
    title: string,
    region: string
}


export default function CitiesCreate({ element, setClose }: { element?: CitiesType, setClose: React.Dispatch<SetStateAction<boolean>> }) {
    const dispatch = useDispatch()
    const [data, setData] = useState<RegionsType[] | undefined>(undefined)
    useEffect(() => {
        let res = axios.get('/regions')
        res.then(data => {
            let myRes = data.data.data.map((item: CitiesType) => ({ ...item, value: item.id }))
            setData(myRes)
        })
    }, [])
    const [loadind, setLoading] = useState(false)
    const [error, setError] = useState<ErrorVal>({
        title: '',
        title_kg: '',
        region: ''
    })
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        let formData = new FormData(e.target as HTMLFormElement)
        let data = Object.fromEntries(formData.entries())
        axios.post('/districts', data, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                setLoading(false)
                console.log(res.data);
                
                dispatch(setCity(res.data))
                setClose(prev => !prev)
            }).catch(e => {
                for (let key in e.response.data) {
                    if (key.slice(0, -1) == 'title') {
                        setError(prev => ({ ...prev, title: 'Такой предмет уже существует!' }))
                    } else if (key.slice(0, -1) == 'title_kg') {
                        setError(prev => ({ ...prev, title_kg: 'Ушундай аталыш бар!' }))
                    } else if (key.slice(0, -1) == 'region') {
                        setError(prev => ({ ...prev, region: 'Выберите один из вариантов!' }))
                    }
                }
                let {message} = e.response.data
                if (message) {
                    setError(prev => ({ ...prev, region: 'Выберите один из вариантов!' }))
                }
                setLoading(false)
            })
    }

    return (
        <Modal>
            {loadind ? <Loading /> : null}
            <section className='user-create'>
                <div className='user-create_head'>
                    <h1>Добавить предмет</h1>
                    <button onClick={() => setClose(prev => !prev)}>
                        <svg className="feather feather-x" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
                    </button>

                </div>
                <form onChange={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setError({
                        title: '',
                        title_kg: '',
                        region: ''
                    })
                }} onSubmit={handleSubmit} className='user-create_form' action="">
                    <div className='user-create_form_block'>
                        <Input placeholder='Физкультура' required type='text' name='title'>
                            <div>
                                <p>Название</p>
                                <p className='error-text'>{error.title}</p>
                            </div>
                        </Input>
                        <Input required placeholder='Дене тарбия' type='text' name='title_kg'>
                            <div>
                                <p>Аталышы</p>
                                <p className='error-text'>{error.title_kg}</p>
                            </div>
                        </Input>
                        <div className='user-create_form_block-item'>
                            <div>
                                <p>Регион</p>
                                <p className='error-text'>{error.region}</p>
                            </div>
                            <Select attr={{ name: "region" }} selectData={data ?? []} />
                        </div>
                    </div>
                    <div className="user-create_form_block br-t">
                        <button className={Styles['btn-action'] + ' sel-no'} type='submit'>Отправить</button>
                    </div>

                </form>

            </section>
        </Modal>
    )
}
