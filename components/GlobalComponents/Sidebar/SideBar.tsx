import { FC } from 'react'
import s from './style.module.css'
import Link from 'next/link';

import { FaRegUserCircle } from "react-icons/fa";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { BsChat } from "react-icons/bs";
import { MdOutlineSlowMotionVideo } from "react-icons/md";



const SideBar: FC = () => {

    return (

        <aside className={s.root}>
            <Link href={'/'} className={s.card}>
               <FaRegUserCircle className={s.icon} />
               Моя страница
            </Link>
            <Link href={'/news'} className={s.card}>
               <HiOutlineNewspaper className={s.icon} />
                 Новости
            </Link>
            <Link href={'/'} className={s.card}>
               <BsChat className={s.icon} />
               Мессенджер
            </Link>
            <Link href={'/'} className={s.card}>
               <LiaUserFriendsSolid className={s.icon} />
               Друзья
            </Link>
            <Link href={'/clips/upload'} className={s.card}>
               <MdOutlineSlowMotionVideo className={s.icon} />
               Клипы
            </Link>
        </aside>
    )
}

export default SideBar