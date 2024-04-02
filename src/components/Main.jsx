import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ModerLogin from '../page/ModerLogin'
import Moder from '../page/Moder'

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
