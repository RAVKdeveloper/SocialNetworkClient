import { FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { clipUploadSelector, setVisibleValueClip, setIsOpenVisibleClipModal } from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice'


const arrActions = [
    {
        id: 1,
        preview: 'Все пользователи',
        value: 'all'
    },
    {
        id: 2,
        preview: 'Только я',
        value: 'iam'
    }
]

const VisibleModalFormClipUpload: FC = () => {

    const { visibleValue, isOpenVisibleClipModal } = useAppSelector(clipUploadSelector)
    const dispatch = useAppDispatch()

    const changeVisibleValue = (preview: string, value: string) => {
        if(preview && value) {
            dispatch(setVisibleValueClip({ preview, value }))
            dispatch(setIsOpenVisibleClipModal(false))
        }
    } 

    const isOpen = isOpenVisibleClipModal ? `${s.root} ${s.active}` : s.root

    return (

        <article className={isOpen}>
            <ul>
                {
                    arrActions.map(({ id, preview, value }) => (
                        <li 
                        onClick={() => changeVisibleValue(preview, value)} 
                        key={id} 
                        className={visibleValue.value === value ? `${s.action} ${s.active}` : s.action}>
                        {preview}
                        </li>
                    ))
                }
            </ul>
        </article>
    )
}

export default VisibleModalFormClipUpload