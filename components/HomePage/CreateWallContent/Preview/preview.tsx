import { FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'
import { setIsPreview } from '@/Redux/Slices/createContent/createContentAll/createWallContent'

import emptyAvatar from '@/assets/img/HomePage/avatarNotFound.png'
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineSlowMotionVideo } from "react-icons/md";


const PreviewCreateWallContent: FC = () => {

    const { user } = useAppSelector(userSelect)
    const dispatch = useAppDispatch()

    const openRedactor = () => dispatch(setIsPreview(false))

    const userAvatar = user && user.avatar ? `${SERVERAPI}${user.avatar}` : emptyAvatar.src

    return (

        <article onClick={openRedactor} className={s.root}>
            {
                user &&
                <>
                <img src={userAvatar} alt={user?.surname} className={s.avatar} />
                <div className={s.content}>
                    <span className={s.text}>Что у вас нового?</span>
                    <div className={s.iconRow}>
                        <IoCameraOutline className={s.icon} />
                        <MdOutlineSlowMotionVideo className={s.icon} />
                    </div>
                </div>
                </>
            }
        </article>
    )
}

export default PreviewCreateWallContent