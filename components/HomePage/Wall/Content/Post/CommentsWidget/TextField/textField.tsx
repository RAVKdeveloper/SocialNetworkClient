import React, { FC, useRef, useState } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'
import { useUploadCommentImageMutation, useCreateWallCommentMutation } from '@/Redux/Api/Wall/Comments/wallComents'
import { postactionsSelector, setValue, setAnswerNick } from '@/Redux/Slices/Wall/postActions'

import { GoPaperclip } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { IoMdSend } from "react-icons/io";


const TextFildCreateCommentWallPost: FC = () => {

    const { token, user } = useAppSelector(userSelect)
    const { commentsPostId, value, answerNick } = useAppSelector(postactionsSelector)
    const [ media, setMedia ] = useState<File | null>(null)
    const [ contentPreview, setContentPreview ] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)
    const [ createReq ] = useCreateWallCommentMutation()
    const [ uploadReq ] = useUploadCommentImageMutation()
    const dispatch = useAppDispatch() 

    const onClickInput = () => inputRef.current?.click() 

    const getCommentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(e.target.value.length < 240) dispatch(setValue(e.target.value))
        else alert('Превышено количество символов')
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
         if(e.target.files && e.target.files[0]) {
             setContentPreview(URL.createObjectURL(e.target.files[0]))
             setMedia(e.target.files[0])
         } 
    }

    const removeMedia = () => {
        setContentPreview('')
        setMedia(null)
    }

    const clear = () => {
        dispatch(setValue(''))
        setMedia(null)
        setContentPreview('')
        dispatch(setAnswerNick(''))
    }

    const fetchUploadImage = async (id: number) => {
        if(token && id && media)
        try{
              console.log('upload')
             
            const obj = {
                id,
                token,
                file: media
            }

            await uploadReq(obj).unwrap()
            clear()

          } catch {
            alert('Произошла ошибка')
          }
    }

    const fetchCreateComment = async () => {
         if(token && commentsPostId && (value || media))
           try{
              
              const obj = {
                id: commentsPostId,
                token,
                text: value,
                answerRef: answerNick
              }

              const res = await createReq(obj).unwrap()
              
              if(res) fetchUploadImage(res.id)

              clear()

           } catch {
            alert('Произошла ошибка')
           }
    }

    const isDisabled = value || media ? `${s.send} ${s.active}` : s.send

    if(!user) return;

    return (

        <>
        <section className={s.root}>
            <input 
            onChange={onChangeInput} 
            ref={inputRef} 
            type="file" 
            style={{ display: 'none' }} 
            accept='image/png, image/jpg, image/jpeg, image/webp'
            />
            <img src={`${SERVERAPI}${user.avatar}`} alt={user.surname} className={s.avatar} />
            <article className={s.textField}>
                <textarea value={value} onChange={getCommentValue} className={s.textarea} placeholder='Напишите комментарий' />
                <GoPaperclip onClick={onClickInput} className={s.uploadIcon} />
            </article>
            <IoMdSend onClick={fetchCreateComment} className={isDisabled} />
        </section>
        {
          media && contentPreview &&
             <div className={s.mediaPreview}>
               <img src={contentPreview} alt={contentPreview} className={s.imagepreview} />
               <div onClick={removeMedia} className={s.closeBody}>
               <IoIosClose className={s.deletePhoto} />
               </div>
             </div>
        }
        </>
    )
}

export default TextFildCreateCommentWallPost