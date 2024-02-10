import { FC, useRef, useState } from 'react'
import s from './style.module.css'

import { setIsOpenClipModal, createContentAllSelector } from '@/Redux/Slices/createContent/createContentAll/createContentAll';
import { useUploadClipServerMutation } from '@/Redux/Api/User/Galery/Clips/clipsUpload';
import { userSelect } from '@/Redux/Slices/User/userGlobal';
import { useAppSelector, useAppDispatch } from '@/Redux/hooks/hooks';
import { useRouter } from 'next/navigation';

import { IoMdClose } from "react-icons/io";


const UploadClipsModal: FC = () => {

    const { token } = useAppSelector(userSelect)
    const { isOpenClipModal } = useAppSelector(createContentAllSelector)
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const { push } = useRouter()
    const [ create ] = useUploadClipServerMutation()

    const closeModal = () => dispatch(setIsOpenClipModal(false))

    const psevdoInputClick = () => inputRef.current?.click()

    const uploadClip = async (file: File) => {
         if(token)
         try{
           
           const result = await create({ token, file }).unwrap()
           push(`clips/upload/${result.id}`)
           dispatch(setIsOpenClipModal(false))
        } catch {
            alert('Произошла ошибка')
        }
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
         if(e.target.files && e.target.files[0]) uploadClip(e.target.files[0]) 
    }

    const isOpen = isOpenClipModal ? `${s.root} ${s.active}` : s.root

    return (

        <section className={isOpen}>
             <input
             onChange={changeInput} 
             ref={inputRef}
            type="file" 
            accept='video/*,.avi,.mp4,.3gp,.mpeg,.mov,.flv,.f4v,.wmv,.mkv,.webm,.vob,.rm,.rmvb,.m4v,.mpg,.ogv,.ts,.m2ts,.mts,.mxf' 
            size={28} 
             style={{ display: 'none' }} 
            />
             <article className={s.modal}>
                 <h4 className={s.title}>Новый клип</h4>
                 <div className={s.container}>
                     <span className={s.contentTitle}>Загрузка клипа</span>
                     <div className={s.columns}>
                        <p className={s.column}>
                            Выберите или&nbsp; перетащите в&nbsp; это окно вертикальное видео длиной от&nbsp; 1 секунды до&nbsp; 3&nbsp; минут.
                        </p>
                        <p className={s.column}>
                        У&nbsp; роликов с&nbsp; разрешением 1080&nbsp; ×&nbsp; 1920&nbsp; px
                        больше шансов попасть в&nbsp; рекомендации.
                        Другие советы для&nbsp; авторов клипов читайте&nbsp;
                        <a href="https://vk.com/@vkclips-web-publish" target='_blank'>здесь</a> 
                        </p>
                     <button onClick={psevdoInputClick} className={s.btn}>Выбрать файл</button>
                     </div>
                 </div>
                 <div onClick={closeModal} className={s.closeBody}>
                     <IoMdClose className={s.close} />
                 </div>
             </article>
        </section>
    )
}

export default UploadClipsModal