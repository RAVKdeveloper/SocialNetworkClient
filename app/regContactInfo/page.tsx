'use client';

import { FC, useState } from 'react'
import s from './style.module.css'
import { useRouter } from 'next/navigation';
import nookies from 'nookies'
import { useCreateUserMutation } from '@/Redux/Api/User/Auth/authApi';


const RegContactInfoPage: FC = () => {

    const [ city, setCity ] = useState<string>('')
    const [ reqUser, { isLoading } ] = useCreateUserMutation()
    const { push } = useRouter()

    const createUser = async () => {
        try{
            const infoobj = sessionStorage.getItem('myInfoReg')
            if(infoobj) { 
            const newObj = JSON.parse(infoobj)

           const obj = {
              phone: sessionStorage.getItem('phoneAuth'),
              name: newObj.name,
              middlename: newObj.middlename,
              surname: newObj.surname,
              birthday: newObj.birthday,
              password: newObj.pass,
              avatar: sessionStorage.getItem('imgReg') ? sessionStorage.getItem('imgReg') : '',
              city: city ? city : '',
              sex: sessionStorage.getItem('sexUser'),
              email: newObj.email
           }

          const res = await reqUser(obj).unwrap()
          nookies.set(null, 'tokenAuth', JSON.stringify(res.access_token), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
           })
          push('/')
        }
        } catch (e: any) {
           alert('Пользователь с таким email уже существует')
        }
    }

    return (

        <main className={s.root}>
            <section className={s.content}>
                 <h2 className={s.title}>Контактная информация</h2>
                 <p className={s.subtitle}>
                 Вашим друзьям будет проще вас найти, если вы укажете информацию о себе.
                 </p>
                 <div className={s.perCityBody}>
                 <div className={s.perCity}>
                    <span className={s.label}>Город</span>
                    <input onChange={e => setCity(e.target.value)} value={city} type="text" className={s.input} placeholder='Введите название города' />
                 </div>
                 </div>
                 <div className={s.column}>
                 <button onClick={createUser} disabled={city ? false : true} className={city ? s.btn : `${s.btn} ${s.dis}`}>Продолжить</button>
                 <p onClick={createUser} className={s.link}>Указать позже</p>
                 </div>
            </section>
        </main>
    )
}

export default RegContactInfoPage