import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Moder from '../pages/Moder'
import ModerLogin from '../pages/ModerLogin'

export default function Main() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<ModerLogin />} />
                <Route path='/moder' element={<Moder />} />
            </Routes>
        </div>
    )
}
