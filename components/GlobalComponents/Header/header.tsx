import React, { FC, useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import s from './style.module.css'
import debonce from 'lodash.debounce'

import SearchHeaderModal from './Modals/SearchModal/modal'
import UserInfoModalHeader from './Modals/UserInfoModal/modal'
const NotificationModal = dynamic(() => import('./Modals/NotificModal/notificModal'), { ssr: false })

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { headerModalsSelector, setIsOpenSearchModal, setIsOpenUserInfoModal, setIsOpneNotific } from '@/Redux/Slices/Header/headerModals'
import { setSearchValue } from '@/Redux/Slices/Header/modalsValue'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'

import logo from '@/assets/img/HomePage/vk.png'
import avatar from '@/assets/img/HomePage/avatarNotFound.png'
import { IoSearch } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";


const Header: FC = () => {

    const { isOpenUserInfo, isOpenNotific, countUnread } = useAppSelector(headerModalsSelector)
    const { user } = useAppSelector(userSelect)
    const dispatch = useAppDispatch()
    const searchBodyRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [ localSearchValue, setLocalSearchValue ] = useState<string>('')

    const openSearchModal = () => dispatch(setIsOpenSearchModal(true))
    const openUserInfoModal = () => {
       if(isOpenUserInfo) return dispatch(setIsOpenUserInfoModal(false))
       return dispatch(setIsOpenUserInfoModal(true))
    }
    const openNotificModal = () => dispatch(setIsOpneNotific(!isOpenNotific))

    const addSearchValue = useCallback(
        debonce((str: string) => dispatch(setSearchValue(str)), 400),
        []
    )

    const OnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchValue(e.target.value)
        addSearchValue(e.target.value)
    }

    const isAvatar = user && user.avatar && user.avatar !== 'none' ? `${SERVERAPI}${user.avatar}` : avatar 

    const isOpenNotificClass = isOpenNotific ? `${s.bellBody} ${s.open}` : s.bellBody

    return (

        <header className={s.root}>
            <div className={s.container}>
            <section className={s.left}>
                <div className={s.logoBody}>
                  <Image src={logo} alt="logo" className={s.logo} width={24} height={24} />
                  <h3 className={s.logoText}>ВКОНТАКТЕ</h3>
                </div>
                <div className={s.leftContent}>
                    <div ref={searchBodyRef} onClick={openSearchModal} className={s.searchBody}>
                       <IoSearch className={s.serchIcon} />
                       <input value={localSearchValue} onChange={OnChangeSearch} ref={inputRef} type="text" className={s.search} placeholder='Поиск' />
                       <SearchHeaderModal parent={searchBodyRef} input={inputRef} />
                    </div>
                    <div onClick={openNotificModal} className={isOpenNotificClass}>
                        <GoBell className={s.bell} />
                        {
                          countUnread === 0 ? 
                          null 
                          : 
                          <div className={s.notifiCount}>{countUnread}</div>
                        }
                        <NotificationModal />
                    </div>
                </div>
            </section>
            <section onClick={openUserInfoModal} className={isOpenUserInfo ? `${s.right} ${s.open}` : s.right}>
                <img src={isAvatar.toString()} alt="avatar" className={s.avatar} width={32} height={32} />
                <IoIosArrowDown className={s.arrow} />   
                <UserInfoModalHeader/>
            </section>
            </div>
        </header>
    )
}

export default Header