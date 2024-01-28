import { FC, useRef, useState } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks';
import { homeModalsSelector, setOpenAvatarModal } from '@/Redux/Slices/HomeModals/homeModals';
import { useUploadAvatarMutation, useDeleteAvatarMutation } from '@/Redux/Api/User/Auth/authApi';
import { userSelect } from '@/Redux/Slices/User/userGlobal';

import { IoCloseSharp } from "react-icons/io5";


const UploadAvatarModal: FC = () => {

    const [ req ] = useUploadAvatarMutation()
    const [ deleteAvatar ] = useDeleteAvatarMutation()
    const inputRef = useRef<HTMLInputElement>(null) 
    const [ img, setImg ] = useState<File | null>(null)
    const { openAvatarModal } = useAppSelector(homeModalsSelector)
    const { token, user } = useAppSelector(userSelect)
    const dispatch = useAppDispatch()

    const psevdoClick = () => inputRef.current?.click()

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
         if(e.target.files) setImg(e.target.files[0])
    }

    const closeModal = () => dispatch(setOpenAvatarModal(false)) 

    const uploadAvatar = async () => {
        if(img && user) {
            try {
                   const obj = {
                    img: img,
                    token
                   }

                   if(user.avatar && user.avatar !== 'none') {
                    await deleteAvatar({ token, img: user.avatar }).unwrap()
                   }

                  await req(obj).unwrap()
                  dispatch(setOpenAvatarModal(false))
            } catch (e: any) {
               console.log(e)
               alert('Произошла ошибка')
            }
        }
    }

    const isOpenModal = openAvatarModal ? `${s.root} ${s.active}` : s.root

    const isDisabledClass = img ? `${s.btn} ${s.btnUpload}` : `${s.btn} ${s.btnUpload} ${s.dis}`

    const isDisabled = img ? false : true

    return (

        <section className={isOpenModal}>
            <article className={s.modal}>
            <div className={s.titleRow}>
                <h2 className={s.title}>Загрузка новой фотографии</h2>
                <IoCloseSharp onClick={closeModal} className={s.close} />
            </div>
            <div className={s.avatarEditor}>
                <p className={s.text}>
                Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию.
                <br />
                Вы можете загрузить изображение в формате JPG, GIF или PNG.
                </p>
                <button onClick={psevdoClick} className={s.btn}>Выбрать файл</button>
                <input onChange={changeImage} ref={inputRef} type="file" className={s.hiddenInput} />
                <button onClick={uploadAvatar} disabled={isDisabled} className={isDisabledClass}>Загрузить</button>
            </div>
            <div className={s.footer}>
            Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего размера.
            </div>
            </article>
        </section>
    )
}

export default UploadAvatarModal