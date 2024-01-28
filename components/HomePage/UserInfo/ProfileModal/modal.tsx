import { FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks';
import { userSelect } from '@/Redux/Slices/User/userGlobal';
import { homeModalsSelector, setOpenProfileModal } from '@/Redux/Slices/HomeModals/homeModals';

import { MdAlternateEmail } from "react-icons/md";
import { SlPresent } from "react-icons/sl";
import { IoHomeOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";


const ProfileModal: FC = () => {

    const { user } = useAppSelector(userSelect)
    const { openProfileModal } = useAppSelector(homeModalsSelector)
    const dispatch = useAppDispatch()

    const closeModal = () => dispatch(setOpenProfileModal(false))

    const isOpen = openProfileModal ? `${s.root} ${s.active}` : s.root
 
    return (

        <section className={isOpen}>
             <div className={s.modal}>
                  <div className={s.title}>Подробная информация</div>
                  <div className={s.id}>
                      <MdAlternateEmail className={s.icon} />
                      id{user?.id}
                  </div>
                  <div className={s.container}>
                    <article className={s.card}>
                        <SlPresent className={s.icon} />
                        <div className={s.text}>
                        День рождения:
                        <span>{user?.birthday}</span>
                        </div>
                    </article>
                    <article className={s.card}>
                        <IoHomeOutline className={s.icon} />
                        <div className={s.text}>
                        Город:
                        <span>{user?.city ? user?.city : 'Город невыбран'}</span>
                        </div>
                    </article>
                  </div>
                  <div onClick={closeModal} className={s.close}>
                      <IoCloseOutline className={s.closeIcon} />
                  </div>
             </div>
        </section>
    )
}

export default ProfileModal