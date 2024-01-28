import { FC } from 'react'
import s from './style.module.css'
import Link from 'next/link'
import ProfileModal from './ProfileModal/modal'
import UploadAvatarModal from './AvatarModal/modal'
import Skeleton from './Skeleton/skeleton'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { setOpenProfileModal, setOpenAvatarModal } from '@/Redux/Slices/HomeModals/homeModals'
import { SERVERAPI } from '@/assets/config'

import notFoundAvatar from '@/assets/img/HomePage/avatarNotFound.png'
import { BsGeoAlt } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";


const UserInfoHomePage: FC = () => {

    const { user } = useAppSelector(userSelect)
    const dispatch = useAppDispatch()

    const openModal = () => dispatch(setOpenProfileModal(true))
    const openAvatarModal = () => dispatch(setOpenAvatarModal(true))

    const isAvatar = user && user.avatar && user.avatar !== 'none' ? `${SERVERAPI}${user.avatar}` : notFoundAvatar 
    
    return (

        <>
        {
            user ?
            <>
            <section className={s.root}>
                <div className={s.contentInfo}>
                    <div onClick={openAvatarModal} className={s.avatarContainer}>
                       <img src={isAvatar.toString()} alt='avatar' width={150} height={150} className={s.avatar} />
                       <div className={s.isOnline}></div>
                    </div>
                    <div className={s.column}>
                        <p className={s.name}>{user?.name} {user?.surname}</p>
                        <div className={s.infoRow}>
                            <article className={s.badge}>
                                <BsGeoAlt className={s.icon} />
                                {user?.city}
                            </article>
                            <article onClick={openModal} className={s.badge}>
                                <IoIosInformationCircleOutline className={s.icon} />
                                Подробнее
                            </article>
                        </div>
                    </div>
                </div>
                <Link className={s.btn} href={'/profile'}>Редактировать профиль</Link>
            </section>
            <ProfileModal/>
            <UploadAvatarModal/>
            </>
            :
            <Skeleton/>
        }
        </>
    )
}

export default UserInfoHomePage