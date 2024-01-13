'use client';

import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginUserMutation } from '@/Redux/Api/User/Auth/authApi';
import { useRouter } from 'next/navigation';
import nookies from 'nookies'
import s from './style.module.css'
import Image from 'next/image'
import logo from '@/assets/img/RegistrationPage/logo.png'
import qr from '@/assets/img/RegistrationPage/qr.png'


interface FormData {
    phone: string,
    password: string
}


const LoginForm: FC = () => {

    const [ check, setCheck ] = useState<boolean>(false)
    const [ reqLogin, { isLoading } ] = useLoginUserMutation()
    const [ error, setError ] = useState<string>('')
    const { push } = useRouter()

    const {
       register,
       formState: { isValid },
       handleSubmit
    } = useForm<FormData>({
       defaultValues: {
         phone: '',
         password: ''
       }
    })

    const getCheck = () => {
        if(check) return setCheck(false)

        return setCheck(true)
    } 
 
    const loginUser = async (data: FormData) => {
        try{
           const res = await reqLogin(data).unwrap()
           nookies.set(null, 'tokenAuth', JSON.stringify(res.access_token), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
           })
           setError('')
           push('/')
        } catch (e: any) {
            setError(e.data.message)
        }
    }

    const submit: SubmitHandler<FormData> = (data) => {
       loginUser(data)
    } 

    return (

        <section className={s.root}>
            <div className={s.headForm}>
               <Image src={logo} alt="logo" className={s.logo} width={48} height={48} />
               <h3 className={s.title}>Вход ВКонтакте</h3>
            </div>
            <form onSubmit={handleSubmit(submit)} className={s.form}>
                <input type="text" className={s.input} placeholder='Телефон' {...register('phone', { required: true, minLength: 10, maxLength: 17 })} />
                <input type="text" className={`${s.input} ${s.pass}`} placeholder='Пароль' {...register('password', { required: true, minLength: 6, maxLength: 50 })} />
                <div className={s.checkBoxRow}>
                    <div onClick={getCheck} className={check ? `${s.checkBox} ${s.check}` : s.checkBox}></div>
                    <p className={s.text}>
                    Сохранить вход
                    </p>
                </div>
                <button disabled={!isValid || isLoading} type='submit' className={isValid ? s.btn : `${s.btn} ${s.dis}`}>Войти</button>
                {
                error &&
                <div className={s.error}>{error}</div>
                }
            </form>
            <div className={s.qrBlock}>
                <Image src={qr} alt='qr' width={68} height={68} />
                <div className={s.column}>
                    <span className={s.qrTitle}>Быстрый вход по QR‑коду</span>
                    <span className={s.qrSubtitle}>Наведите камеру телефона</span>
                    <span className={s.link}>Подробнее</span>
                </div>
            </div>
        </section>
    )
}

export default LoginForm