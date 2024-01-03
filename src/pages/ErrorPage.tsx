import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/ErrorPage_style.scss'
export default function ErrorPage() {

    return (
        <section className='sel-no error-page'>
            <div className='error-page_block'>
                <img src="/3747371.jpg" alt="404" />
                <h1>Not Found</h1>
            </div>

        </section>
    )
}
