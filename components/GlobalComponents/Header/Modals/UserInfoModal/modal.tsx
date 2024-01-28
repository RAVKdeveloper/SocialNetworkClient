import { FC } from 'react'
import s from './style.module.css'
import nookies from 'nookies'
import Link from 'next/link';
import { SERVERAPI } from '@/assets/config';

import { IoSettingsOutline } from "react-icons/io5";
import { PiPaintBrushHouseholdBold } from "react-icons/pi";
import { FiHelpCircle } from "react-icons/fi";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import notFOundAvatar from '@/assets/img/HomePage/avatarNotFound.png'
import { MdArrowForwardIos } from "react-icons/md";
import { useAppSelector } from '@/Redux/hooks/hooks';
import { userSelect } from '@/Redux/Slices/User/userGlobal';
import { headerModalsSelector } from '@/Redux/Slices/Header/headerModals';


const UserInfoModalHeader: FC = () => {

    const { user } = useAppSelector(userSelect)
    const { isOpenUserInfo } = useAppSelector(headerModalsSelector)

    const isAvatar = user ? user.avatar === '' || user.avatar === 'none' ? notFOundAvatar : `${SERVERAPI}${user.avatar}` : notFOundAvatar

    const isOpen = isOpenUserInfo ? `${s.root} ${s.active}` : s.root

    const LogOut = () => nookies.destroy(null, 'tokenAuth')

    return (

        <section className={isOpen}>
            <div className={s.userInfo}>
                <div className={s.contentInfo}> 
                    <img src={isAvatar.toString()} alt="avatar" className={s.avatar} />
                    <div className={s.column}>
                        <p className={s.name}>{user?.name} {user?.surname}</p>
                        <p className={s.phone}>{user?.phone}</p>
                    </div>
                </div>
                <MdArrowForwardIos className={s.arrow} />
            </div>
            <ul className={s.linksColumn}>
                    <li>
                       <Link href={'/'} className={s.link}>
                         <IoSettingsOutline className={s.icons} />
                         <span className={s.linkText}>Настройки</span>
                       </Link>
                      </li>
                      <li>
                       <Link href={'/'} className={s.link}>
                         <PiPaintBrushHouseholdBold className={s.icons} />
                         <span className={s.linkText}>Тема</span>
                       </Link>
                      </li>
                      <li>
                       <Link href={'/'} className={s.link}>
                         <FiHelpCircle className={s.icons} />
                         <span className={s.linkText}>Помощь</span>
                       </Link>
                      </li>
                      <li onClick={LogOut}>
                       <Link href={'/login'} className={s.link}>
                         <FaArrowRightFromBracket className={s.icons} />
                         <span className={s.linkText}>Выйти</span>
                       </Link>
                      </li>
            </ul>
        </section>
    )
}

export default UserInfoModalHeader  