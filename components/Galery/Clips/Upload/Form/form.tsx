import { FC, memo } from 'react'
import s from './style.module.css'
import VisibleModalFormClipUpload from './modal/modal'

import { SERVERAPI } from '@/assets/config'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { 
    clipUploadSelector, 
    setDescriptionClip, 
    setPreviewClip, 
    setIsCommentsUploadClip, 
    setIsOpenVisibleClipModal 
} from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice'


const FormUploadClip: FC = memo(() => {

    const { preview, description, isComments, visibleValue } = useAppSelector(clipUploadSelector)
    const dispatch = useAppDispatch()

    const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(e.target.value.length <= 221) dispatch(setDescriptionClip(e.target.value))
    }

    const changePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length <= 50) dispatch(setPreviewClip(e.target.value))
    }

    const changeCheckBox = () => {
        if(isComments) return dispatch(setIsCommentsUploadClip(false))

        return dispatch(setIsCommentsUploadClip(true))
    }

    const openVisibleModal = () => dispatch(setIsOpenVisibleClipModal(true))

    const isCheck = isComments ? `${s.checkBox} ${s.check}` : s.checkBox

    return (

        <section className={s.root}>
            <div className={s.description}>
            <h6 className={s.titleField}>Описание</h6>
             <textarea value={description} onChange={changeDescription} className={s.textFieldDesc} placeholder='Опишите клип' />
            </div>
            <div className={s.preview}>
            <h6 className={s.titleField}>Обложка</h6>
            <div className={s.textFieldBody}>
                <input onChange={changePreview} value={preview} type="text" className={s.inputPreview} />
                <span className={s.textPreview}>{SERVERAPI}</span>
            </div>
            <div className={s.settings}>
            <h6 className={s.titleField}>Настройки</h6>
               <div className={s.isCommentsRow}>
                 <div onClick={changeCheckBox} className={isCheck}></div>
                 <div className={s.columnText}>
                    <span className={s.checkBoxTitle}>Разрешить комментарии</span>
                    <span className={s.checkBoxSubTitle}>К вашему клипу можно будет оставлять комментарии</span>
                 </div>
               </div>
               <article className={s.visibleClip}>
                    <p className={s.visibleText}>
                        Кто может смотреть этот клип  
                        <span onClick={openVisibleModal}>{visibleValue.preview}</span>
                    </p>
                        <VisibleModalFormClipUpload />
               </article>
            </div>
            </div>
        </section>
    )
})

export default FormUploadClip