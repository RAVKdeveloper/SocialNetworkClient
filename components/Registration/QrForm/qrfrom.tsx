import { FC } from 'react'
import s from './style.module.css'
import qr from '../../../assets/img/RegistrationPage/qr.png'
import Image from 'next/image'


const QrFormReg: FC = () => {

    return (

        <section className={s.root}>
            <div className={s.content}>
                <Image src={qr} alt='qr' className={s.qr} />
                <h5 className={s.title}>Быстрый вход по QR-коду</h5>
                <p className={s.subtitle}>
                Отсканируйте QR-код сканером  в приложении ВКонтакте  или камерой устройства
                </p>
                <p className={s.link}>Подробнее</p>
            </div>
        </section>
    )
}

export default QrFormReg