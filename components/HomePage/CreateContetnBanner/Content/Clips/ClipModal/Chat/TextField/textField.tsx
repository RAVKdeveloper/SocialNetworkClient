import { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react'
import s from './style.module.css'

import { useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { clipUploadSelector } from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice'
import { SERVERAPI } from '@/assets/config'
import { useAddClipCommentMutation } from '@/Redux/Api/User/Galery/Clips/clipsComments'


const TextFieldClipComment: FC = memo(() => {

    const { user, token } = useAppSelector(userSelect)
    const { clipId } = useAppSelector(clipUploadSelector)
    const [ isTexting, setIsTexting ] = useState<boolean>(false)
    const [ value, setValue ] = useState<string>('')
    const textRef = useRef<HTMLTextAreaElement>(null)
    const [ createReq ] = useAddClipCommentMutation()

    const openModal = () => setIsTexting(true)
    const closeModal = () => setIsTexting(false) 

    const changeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
           if(e.target.value.length <= 120) setValue(e.target.value)
           else alert('Превышен размер комментария')
    }

    const fetchCreateComment = async () => {
        if(token && clipId) 
          try{

            await createReq({ id: +clipId, text: value, token }).unwrap()
            setValue('')
            setIsTexting(false)
          } catch {
            alert('Произошла Ошибка')
          }
    }

    useEffect(() => {
       if(isTexting) textRef.current?.focus()
    }, [isTexting])

    return (

        <section className={s.root}>
            {
                isTexting ?
                 <div className={s.container}>
                     <div className={s.textWrapper}>
                     {
                        user &&
                        <img src={`${SERVERAPI}${user.avatar}`} alt={user.name} className={s.avatarText} />
                     }
                        <textarea
                        value={value}
                        ref={textRef} 
                        role="textbox" 
                        placeholder="Написать комментарий..." 
                        className={s.textField} 
                        onChange={changeTextarea}
                        />
                     </div>
                     <div className={s.btnRow}>
                        <button onClick={closeModal} className={s.btnCansel}>Отмена</button>
                        <button onClick={fetchCreateComment} disabled={value ? false : true} className={s.btnConfirm}>Отправить</button>
                     </div>
                 </div>
                 : 
                 <div className={s.preview}>
                    {
                        user &&
                        <img src={`${SERVERAPI}${user.avatar}`} alt={user.name} className={s.avatarPreview} />
                    }
                    <div onClick={openModal} className={s.previewText}>Написать комментарий...</div>
                 </div>
            }
        </section>
    )
})

export default TextFieldClipComment