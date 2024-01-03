import React, { SetStateAction } from 'react'
import Modal from '../Modal'
import { RegionsType } from '../../types/model'
import '../../styles/View_styles.scss'
import { DateFormat } from '../tables/Subjects'


export default function RegionView({ element, setClose }: {
    element: RegionsType,
    setClose: React.Dispatch<SetStateAction<null | RegionsType>>
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
                                <p>Название</p>
                                <h3>{element.title}</h3>
                            </div>
                            <div>
                                <p>Аталышы</p>
                                <h3>{element.title_kg}</h3>
                            </div>
                        </div>
                        <div className='user-viewer_body_block'>
                            <div>
                                <p>Дата создание</p>
                                <h3>{DateFormat(element.createdAt)}</h3>
                            </div>
                            <div>
                                <p>Последнии измения</p>
                                <h3>{DateFormat(element.updatedAt)}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Modal>
    )
}
