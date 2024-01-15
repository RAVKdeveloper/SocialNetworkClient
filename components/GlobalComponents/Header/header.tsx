import React, { FC, useCallback, useRef, useState } from 'react'
import debonce from 'lodash.debounce'
import s from './style.module.css'
import Image from 'next/image'
import SearchHeaderModal from './Modals/SearchModal/modal'
import { useAppDispatch } from '@/Redux/hooks/hooks'
import { setIsOpenSearchModal } from '@/Redux/Slices/Header/headerModals'
import { setSearchValue } from '@/Redux/Slices/Header/modalsValue'
import logo from '@/assets/img/HomePage/vk.png'
import avatar from '@/assets/img/HomePage/avatarNotFound.png'
import { IoSearch } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";


const Header: FC = () => {

    const dispatch = useAppDispatch()
    const searchBodyRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [ localSearchValue, setLocalSearchValue ] = useState<string>('')

    const openSearchModal = () => dispatch(setIsOpenSearchModal(true))

    const addSearchValue = useCallback(
        debonce((str: string) => dispatch(setSearchValue(str)), 400),
        []
    )

    const OnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchValue(e.target.value)
        addSearchValue(e.target.value)
    }

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
                    <div className={s.bellBody}>
                        <GoBell className={s.bell} />
                        <div className={s.notifiCount}>1</div>
                    </div>
                </div>
            </section>
            <section className={s.right}>
                <Image src={avatar} alt="avatar" className={s.avatar} width={32} height={32} />
                <IoIosArrowDown className={s.arrow} />   
            </section>
            </div>
        </header>
    )
}

export default Header