import { FC, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import s from './style.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper/modules';
import { useGetFriendGlobalWallQuery, useInviteFriendMutation } from '@/Redux/Api/Friends/friendsApi';
import { useAppSelector } from '@/Redux/hooks/hooks';
import { userSelect } from '@/Redux/Slices/User/userGlobal';
import { SERVERAPI } from '@/assets/config';

import 'swiper/css';
import 'swiper/css/navigation';
import './swiper.css'


const RecFriendsGlobalWall: FC = () => {

    const { token, user } = useAppSelector(userSelect)
    const { data } = useGetFriendGlobalWallQuery(
        { token, city: user && user.city, limit: 50 },
        { skip: token ? false : true }
    ) 
    const [ createReq ] = useInviteFriendMutation()
    const [ isInvite, setIsInvite ] = useState<number[]>([])

    const fetchInviteFriend = async (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       e.preventDefault()
        if(id && token) 
          try{
        
            const res = await createReq({ userId: id, token }).unwrap()

            if(res) {
              setIsInvite(prev => [...prev, res.friend.id])
            } 

          } catch {
            alert('Прооизошла ошибка')
          }
    }

    if(!data) return;

    if(data.length === 0) return;

    return (

        <section className={s.root}>
            <h4 className={s.title}>Возможные друзья</h4>
            <div className={s.content}>
              <Swiper
               modules={[Navigation, Virtual]}
               spaceBetween={10}
               slidesPerView={3}
               navigation
               virtual
               className={s.swiper}
              >
                {
                  data.map(({ id, avatar, followers, name, surname, city }) => (
                   <SwiperSlide key={id} className={s.card}>
                   <Link href={`/${id}`}>
                   <Image 
                     className={s.backImage}
                     loader={() => `${SERVERAPI}${avatar === 'none' ? 'default.png' : avatar}`}
                     src={`${SERVERAPI}${avatar === 'none' ? 'default.png' : avatar}`}
                     alt={surname}
                     width={210}
                     height={274}
                   />
                   <div className={s.cardContent}>
                     <div className={s.info}>
                       <span className={s.name}>{name} {surname}</span>
                       <span className={s.city}>{city ? city : `${followers} подписчиков`}</span>
                     </div>
                     {
                        isInvite.includes(id) ?
                        <button className={s.invited}>Запрос добавлен</button>
                        :
                        <button onClick={(e) => fetchInviteFriend(id, e)} className={s.btnAddFriend}>Добавить в друзья</button>
                     }
                   </div>
                   </Link>
                   </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
        </section>
    )
}

export default RecFriendsGlobalWall