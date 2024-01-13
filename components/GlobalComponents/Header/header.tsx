import { FC } from 'react'
import s from './style.module.css'
import Image from 'next/image'
import logo from '@/assets/img/HomePage/vk.png'
import avatar from '@/assets/img/HomePage/avatarNotFound.png'
import { IoSearch } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";


const Header: FC = () => {

    return (

        <header className={s.root}>
            <div className={s.container}>
            <section className={s.left}>
                <div className={s.logoBody}>
                  <Image src={logo} alt="logo" className={s.logo} width={24} height={24} />
                  <h3 className={s.logoText}>ВКОНТАКТЕ</h3>
                </div>
                <div className={s.leftContent}>
                    <div className={s.searchBody}>
                       <IoSearch className={s.serchIcon} />
                       <input type="text" className={s.search} placeholder='Поиск' />
                    </div>
                    <div className={s.bellBody}>
                        <GoBell className={s.bell} />
                        <div className={s.notifiCount}>1</div>
                    </div>
                </div>
            </section>
            <section className={s.right}>
                <Image src={avatar} alt="avatar" className={s.avatar} width={32} height={32} />
                <IoIosArrowDown className={s.arrow} />   
            </section>
            </div>
        </header>
    )
}

export default Header