import { FC } from 'react'
import s from './style.module.css'
import VideoPlayerClipModal from './VideoPlayer/videoPlayer'
import ContainerActionsCLipModal from './Chat/chat'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { createContentAllSelector, setIsOpenOneClipModal } from '@/Redux/Slices/createContent/createContentAll/createContentAll'

import { IoCloseSharp } from "react-icons/io5";

const ClipModal: FC = () => {

    const { isOpenOneClipModal } = useAppSelector(createContentAllSelector)
    const dispatch = useAppDispatch()

    const closeModal = () => dispatch(setIsOpenOneClipModal(false))

    const isOpen = isOpenOneClipModal ? `${s.root} ${s.active}` : s.root 

    return (

        <section className={isOpen}>
            <article className={s.modal}>
                <VideoPlayerClipModal />
                <ContainerActionsCLipModal />
                <IoCloseSharp onClick={closeModal} className={s.close} />
            </article>
        </section>
    )
}

export default ClipModal