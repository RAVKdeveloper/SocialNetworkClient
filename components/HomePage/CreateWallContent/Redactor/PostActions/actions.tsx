import { FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { createWallContentSelect, setIsOpenVisibleActionModal, setVisibleAction } from '@/Redux/Slices/createContent/createContentAll/createWallContent'

import { IoIosArrowDown } from "react-icons/io";


const arrActions = [
    {
        id: 1,
        preview: 'Видно всем',
        value: 'all'
    },
    {
        id: 2,
        preview: 'Видно друзьям',
        value: 'friends'
    },
    {
        id: 3,
        preview: 'Только мне',
        value: 'me'
    }
] 


const PostActionsCreateWallContent: FC = () => {

    const { visibleAction, isOpenVisibleActionModal } = useAppSelector(createWallContentSelect)
    const dispatch = useAppDispatch()

    const openModal = () => dispatch(setIsOpenVisibleActionModal(true))

    const changePreview = (preview: string, value: string) => {
         dispatch(setVisibleAction({ preview, value }))
         dispatch(setIsOpenVisibleActionModal(false))
    }

    const isOpen = isOpenVisibleActionModal ? `${s.modal} ${s.active}` : s.modal

    return (

        <section className={s.root}>
            <span onClick={openModal} className={s.action}>{visibleAction.preview} <IoIosArrowDown className={s.arrow} /></span>
            <article className={isOpen}>
                {
                    arrActions.map(({ id, preview, value }) => (
                        <div key={id}
                         onClick={() => changePreview(preview, value)}
                         className={visibleAction.value === value ? `${s.card} ${s.active}` : s.card}>
                        {preview}
                        </div>
                    ))
                }
            </article>
        </section>
    )
}

export default PostActionsCreateWallContent