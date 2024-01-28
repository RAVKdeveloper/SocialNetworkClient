'use client';

import { FC, useEffect } from 'react'
import s from './style.module.css'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { headerModalsSelector, setIsOpenSearchModal } from '@/Redux/Slices/Header/headerModals'
import { useLazyGetSearchQuery } from '@/Redux/Api/Headers/allHeadersApi'
import { modalsValueSelector } from '@/Redux/Slices/Header/modalsValue'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config';

import avatarImg from '@/assets/img/HomePage/avatarNotFound.png'


interface Props {
    parent: React.RefObject<HTMLDivElement>
    input: React.RefObject<HTMLInputElement>
}


const SearchHeaderModal: FC<Props> = ({ parent, input }) => {  

    const { isOpenSerch } = useAppSelector(headerModalsSelector)
    const { searchValue } = useAppSelector(modalsValueSelector)
    const { token } = useAppSelector(userSelect)
    const dispatch = useAppDispatch()
    const [ reqsearch, { data, isFetching } ] = useLazyGetSearchQuery()

    const closeModal = (e: Event) => {
        if(e.target !== parent.current && e.target !== input.current) dispatch(setIsOpenSearchModal(false))
        else dispatch(setIsOpenSearchModal(true))
    }

    useEffect(() => {
       window.addEventListener('click', closeModal)

       return () => window.removeEventListener('click', closeModal)
    }, [])

    const fetchSearch = async (token: string) => {
        try{
          await reqsearch({ token, value: searchValue }).unwrap()
        } catch (e) {
          alert('Произошла ошибка')
        }
    }

    useEffect(() => {
        if(token) fetchSearch(token)
    }, [searchValue, isOpenSerch])

    return (

        <section className={isOpenSerch ? `${s.root} ${s.active}` : s.root}>
            <div className={s.peopleSection}>
                <h3 className={s.title}>Люди</h3>
                <div className={s.peopleConteiner}>
                    {
                        data && !isFetching ? 
                          data.map(({ id, name, surname, followers, avatar, city }) => (
                            <article key={id} className={s.card}>
                                {
                                    avatar === 'none' || avatar === '' ?
                                    <Image src={avatarImg} alt="avatar" width={40} height={40} className={s.avatar} />
                                    :
                                    <img src={`${SERVERAPI}${avatar}`} alt='avatar' width={40} height={40} className={s.avatar} />
                                }
                            <div className={s.userInfoColumn}>
                               <p className={s.name}>{name} {surname}</p>
                               <p className={s.dopInfo}>{city ? `${city},` : ''} {followers.toLocaleString()} подписчиков</p>
                            </div>
                            </article>
                          ))
                        : 
                    <div className={s.loaderBody}>
                      <div className={s.loader}></div>
                    </div>
                    }
                    {
                        data?.length === 0 &&
                        <div className={s.empty}>Ничего не найдено</div>
                    }
                </div>
            </div>
            <div className={s.clubSection}>
                <h3 className={s.title}>Сообщества</h3>
                <div className={s.clubContainer}>
                {/* <article className={s.card}>
                     <Image src={avatar} alt="avatar" width={40} height={40} className={s.avatar} />
                     <div className={s.userInfoColumn}>
                        <p className={s.name}>Людмила Щербина</p>
                        <p className={s.dopInfo}>Макеевка, 13 500 подписчиков</p>
                     </div>
                </article>
                <article className={s.card}>
                     <Image src={avatar} alt="avatar" width={40} height={40} className={s.avatar} />
                     <div className={s.userInfoColumn}>
                        <p className={s.name}>Людмила Щербина</p>
                        <p className={s.dopInfo}>Макеевка, 13 500 подписчиков</p>
                     </div>
                </article>
                <article className={s.card}>
                     <Image src={avatar} alt="avatar" width={40} height={40} className={s.avatar} />
                     <div className={s.userInfoColumn}>
                        <p className={s.name}>Людмила Щербина</p>
                        <p className={s.dopInfo}>Макеевка, 13 500 подписчиков</p>
                     </div>
                </article> */}
                </div>
            </div>
        </section>
    )
}

export default SearchHeaderModal  