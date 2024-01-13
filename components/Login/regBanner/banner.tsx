import { FC } from 'react'
import s from './style.module.css'
import Link from 'next/link'


const BannerReg: FC = () => {

    return (

        <section className={s.root}>
            <Link href={'/registration'} className={s.btn}>Зарегистрироваться</Link>
            <p className={s.text}>
                После регистрации вы получите доступ ко&nbsp;всем возможностям VK&nbsp;ID
            </p>
            <p className={s.link}>Узнать больше</p>
        </section>
    )
}

export default BannerReg