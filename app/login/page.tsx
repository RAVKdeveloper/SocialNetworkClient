import { FC } from 'react'
import s from './style.module.css'
import LoginForm from '@/components/Login/Form/form'
import BannerReg from '@/components/Login/regBanner/banner'


const Login: FC = () => {

    return (

        <main className={s.root}>
            <LoginForm/> 
            <BannerReg/>
        </main>
    )
}

export default Login