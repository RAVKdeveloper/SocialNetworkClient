import React, { FC, useEffect, useRef, useState } from 'react'
import s from './style.module.css'

import { useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'
import { useAddCommentMutation } from '@/Redux/Api/User/Galery/comments'
import { createContentAllSelector } from '@/Redux/Slices/createContent/createContentAll/createContentAll'


const TextFielsCommentsPhoto: FC = () => {

    const { user, token } = useAppSelector(userSelect)
    const { photoId } = useAppSelector(createContentAllSelector)
    const [ isTexting, setIsTexting ] = useState<boolean>(false) 
    const [ value, setValue ] = useState<string>('')
    const textRef = useRef<HTMLTextAreaElement>(null)
    const [ create ] = useAddCommentMutation()

    const openTextModal = () => setIsTexting(true)

    const closeModal = () => setIsTexting(false)

    const changeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(value.length <= 120) setValue(e.target.value)
        else alert('Превышен размер комментария')
    }

    const createComment = async () => {
        if(token && photoId) {
            try{
              
                const obj = {
                    token,
                    text: value,
                    photoId
                }

                await create(obj).unwrap()

                setValue('')
                setIsTexting(false)
            } catch {
                alert('Произошла ошибка при отправке комментария')
            }
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
                        <button onClick={createComment} className={s.btnConfirm}>Отправить</button>
                     </div>
                  </div> 
                 :
                  <div className={s.preview}>
                    {
                        user &&
                        <img src={`${SERVERAPI}${user.avatar}`} alt={user.name} className={s.avatarPreview} />
                    }
                    <div onClick={openTextModal} className={s.previewText}>Написать комментарий...</div>
                  </div>
            }
        </section>
    )
}

export default TextFielsCommentsPhoto