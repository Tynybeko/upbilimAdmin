import React, { SetStateAction } from 'react'
import Modal from '../Modal'
import { UserType } from '../../types/model'
import '../../styles/View_styles.scss'



export default function UserView({ element, setClose }: {
    element: UserType,
    setClose: React.Dispatch<SetStateAction<null | UserType>>
}) {
    return (
        <Modal>
            <section className='user-viewer'>
                <div>
                    <div className='user-viewer_head'>
                        <h1>Данные пользователя </h1>
                        <button onClick={() => setClose(null)}><svg className="feather feather-x" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg></button>
                    </div>
                    <div className='user-viewer_body'>
                        <div className='user-viewer_body_block'>
                            <div>
                                <p>Имя</p>
                                <h3>{element.firstName}</h3>
                            </div>
                            <div>
                                <p>Фамилия</p>
                                <h3>{element.lastName}</h3>
                            </div>
                        </div>
                        <div className='user-viewer_body_block'>
                            <div>
                                <p>Email</p>
                                <h3>{element.email}</h3>
                            </div>
                            <div>
                                <p>Телефон</p>
                                <h3>{element.phone}</h3>
                            </div>
                        </div>
                        <div className='user-viewer_body_block'>
                            <div>
                                <p>Роль</p>
                                <h3>{element.role}</h3>
                            </div>
                            <div>
                                <p>Статус</p>
                                <h3>{element.isActive ? 'Активный' : 'Деактивный'}</h3>
                            </div>
                        </div>
                        <div className='user-viewer_body_block'>
                            <div>
                                <p>Фото</p>
                                {
                                    !element.avatar ?
                                        <img src={'https://smmplanner.com/blog/content/images/2022/05/Mum2l7LDm6cE9orWCkwUu6asJA8e5aXbmi1xfURZTCSpZXKJX_cDDC8HmKlTlSoV1nCuVO85.jpg'} alt="Фото профиля" />
                                        : <h3>Нету фото</h3>
                                }
                            </div>
                          
                        </div>
                    </div>
                </div>
            </section>
        </Modal>
    )
}
