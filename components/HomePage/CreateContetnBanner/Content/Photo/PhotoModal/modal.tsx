import { FC } from 'react'
import s from './style.module.css'
import PhotoUserContainer from './Photo/photo'
import ChatPhotoGalery from './Chat/chat'

import { useAppSelector, useAppDispatch } from '@/Redux/hooks/hooks'
import { createContentAllSelector, setIsOpenPhotoModal } from '@/Redux/Slices/createContent/createContentAll/createContentAll'

import { IoCloseSharp } from "react-icons/io5";


const PhotoModal: FC = () => {

    const { isOpenPhotoModal } = useAppSelector(createContentAllSelector)
    const dispatch = useAppDispatch()

    const closeModal = () => dispatch(setIsOpenPhotoModal(false))

    const isOpen = isOpenPhotoModal ? `${s.root} ${s.active}` : s.root

    return (

        <section className={isOpen}>
            <article className={s.modal}>
                <PhotoUserContainer />
                <ChatPhotoGalery/>
                <IoCloseSharp onClick={closeModal} className={s.close} />
            </article>
        </section>
    )
}

export default PhotoModal