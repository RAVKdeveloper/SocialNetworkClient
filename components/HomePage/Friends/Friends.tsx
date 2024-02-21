import { FC } from 'react'
import Image from 'next/image'
import s from './style.module.css'

import { useGetFriendsPreviewQuery } from '@/Redux/Api/Friends/friendsApi'
import { useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'


const FrientsWidget: FC = () => {

    const { token } = useAppSelector(userSelect)
    const { data } = useGetFriendsPreviewQuery({ token, limit: 4 }, { skip: token ? false : true })

    if(!data) return

    return (

        <section className={s.root}>
            <h5 className={s.title}>Друзья {data[1]}</h5>
            {
                 data[0].length > 0 && data[1] > 0 &&
                 <article className={s.row}>
                    {
                        data[0].map(({ id, friend }) => (
                            <div key={id} className={s.card}>
                               <Image 
                                className={s.icon}
                                loader={() => `${SERVERAPI}${friend.avatar}`}
                                src={`${SERVERAPI}${friend.avatar}`}
                                alt={friend.surname}
                                width={64}
                                height={64}
                               />
                              <p className={s.name}>{friend.name}</p>
                            </div>
                        ))
                    }
                 </article>
            }
            {
                 data[0].length === 0 &&
                  <article className={s.empry}>
                    hello
                  </article>
            }
        </section>
    )
}

export default FrientsWidget