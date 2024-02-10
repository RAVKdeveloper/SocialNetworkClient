import { ChangeEvent, FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'
import { createWallContentSelect, setTextValueWallContent, setContentMedia } from '@/Redux/Slices/createContent/createContentAll/createWallContent'

import emptyAvatar from '@/assets/img/HomePage/avatarNotFound.png'
import { IoMdClose } from "react-icons/io";


const TextFieldRedactorWallContent: FC = () => {

    const { user } = useAppSelector(userSelect)
    const { textValue, contentMedia } = useAppSelector(createWallContentSelect)
    const dispatch = useAppDispatch() 

    const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if(e.target.value.length < 500) dispatch(setTextValueWallContent(e.target.value))
        else alert('Превышено количество символов')
    }

    const removeMedia = () => dispatch(setContentMedia(null))

    const userAvatar = user && user.avatar ? `${SERVERAPI}${user.avatar}` : emptyAvatar.src 

    return (

        <section className={s.root}>
            <div className={s.mainContent}>
            <img src={userAvatar} alt={user?.surname} className={s.avatar} />
            <textarea value={textValue} onChange={changeText} className={s.textarea} placeholder='Что у вас нового?' />
            </div>
            {
               contentMedia &&
                <div className={s.otherContainer}>
            {
                contentMedia.type === 'image' ?
                <img src={contentMedia.url} alt={contentMedia.url} className={s.image} />
                :
                <video src={contentMedia.url} controls className={s.video} />
            }
            <IoMdClose onClick={removeMedia} className={s.removeContent} />
                </div>
            }
        </section>
    )
}

export default TextFieldRedactorWallContent