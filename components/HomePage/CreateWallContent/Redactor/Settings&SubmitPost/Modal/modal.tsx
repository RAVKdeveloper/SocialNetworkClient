import { FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { createWallContentSelect, setIsComments, setIsNotification } from '@/Redux/Slices/createContent/createContentAll/createWallContent'


const SettingModalWallRedactor: FC = () => {

    const { isComments, isNotification, isOpenSettingsModal } = useAppSelector(createWallContentSelect)
    const dispatch = useAppDispatch()

    const onClickCheckBoxComment = () => {
        if(isComments) return dispatch(setIsComments(false))

        return dispatch(setIsComments(true))
    }

    const onClickCheckBoxNotific = () => {
        if(isNotification) return dispatch(setIsNotification(false))

        return dispatch(setIsNotification(true))
    }

    const isChecked = isComments ? `${s.checkBox} ${s.on}` : s.checkBox

    const isCheckedNotific = isNotification ? `${s.checkBoxNotific} ${s.on}` : s.checkBoxNotific

    const isOpen = isOpenSettingsModal ? `${s.root} ${s.active}` : s.root

    return (

        <article className={isOpen}>
            <div className={s.commentsCheckBoxRow}>
                <div onClick={onClickCheckBoxComment} className={isChecked}></div>
                <p className={s.text}>Выключить комментарии</p>
            </div>
            <div className={s.notificCheckBoxRow}>
                <div onClick={onClickCheckBoxNotific} className={isCheckedNotific}></div>
                <p className={s.text}>Не отправлять уведомления</p>
            </div>
        </article>
    )
}

export default SettingModalWallRedactor