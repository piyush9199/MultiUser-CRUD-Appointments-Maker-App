import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ToDoIndex } from './components'
import { UserRegistration } from './components/user-registration'
import { UserLogin } from './components/user-login'
import { UserPanel } from './components/user-panel'
import { AddAppointment } from './components/add-appointment'
import { ModifyAppointment } from './components/modify-appointment'
import { ErrorPage } from './components/error-page'


function App() {
  return (
    <div className='bg-picture'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ToDoIndex />} />
          <Route path='/register' element={<UserRegistration />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='user-panel' element={<UserPanel />}></Route>
          <Route path='add-appointment' element={<AddAppointment />} ></Route>
          <Route path='/modify-appointment/:id' element={<ModifyAppointment />}></Route>
          <Route path='*' element={<ErrorPage />} ></Route>
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App
