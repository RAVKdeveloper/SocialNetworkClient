import { FC, useEffect } from 'react'
import Image from 'next/image'
import s from './style.module.css'

import { useGetNotificQuery, useAcceptedFriendMutation, useRemoveInviteMutation } from '@/Redux/Api/Notification/notificationApi'
import { SERVERAPI } from '@/assets/config'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { headerModalsSelector, setCountUnread } from '@/Redux/Slices/Header/headerModals'
import { userSelect } from '@/Redux/Slices/User/userGlobal'


const NotificationModal: FC = () => {

    const { user } = useAppSelector(userSelect)
    const { isOpenNotific } = useAppSelector(headerModalsSelector)
    const [ acceptReq ] = useAcceptedFriendMutation()
    const [ removeReq ] = useRemoveInviteMutation()
    const { data = [] } = useGetNotificQuery(null)
    const dispatch = useAppDispatch()

    const fetchAcceptRequest = async (sendFromId: number, notificId: number, friendId: number) => {
         if(sendFromId && notificId && friendId && user) 
           try{
            
            const obj = {
                sendFromId,
                notificId,
                id: friendId,
                accepterId: user.id
            }
            
            await acceptReq(obj).unwrap()

           } catch {
              alert('Произошла ошибка')
           }
    } 

    const fetchRemoveInvite = async (friendId: number) => {
        if(friendId) 
         try{
        
            await removeReq(friendId).unwrap()

        } catch {
            alert('Произошла ошибка')
        }
    }

    useEffect(() => {
       
       const result = data.filter(({ isRead }) => isRead === false).length

       dispatch(setCountUnread(result))

    }, [ data ])

    const isOpen = isOpenNotific ? `${s.root} ${s.open}` : s.root 

    return (

        <section className={isOpen}>
            <h6 className={s.title}>Ваша страница</h6>
            <div className={s.content}>
                    {
                        data.length > 0 &&
                         data.map(({ id, requestTo, status, friendId }) => (
                        <article key={id} className={s.notification}>
                            <Image 
                              loader={() => `${SERVERAPI}${requestTo.avatar}`}
                              src={`${SERVERAPI}${requestTo.avatar}`}
                              alt={`${requestTo.name} ${requestTo.surname}`}
                              width={40}
                              height={40}
                              className={s.avatar}
                            />
                            {
                                status ? 
                                <div className={s.column}>
                                    <span className={s.columnAccept}>Добавлен новый друг</span>
                                    <span className={s.subtitle}>Теперь вы друзья с {requestTo.name} {requestTo.surname}</span>
                                </div>
                                :
                                <div className={s.column}>
                                   <span className={s.titleColumn}>Заявка в друзья</span>
                                   <span className={s.subtitle}><b>{requestTo.name}</b> хочет дружить с вами</span>
                                   <div className={s.btnRow}>
                                   <button 
                                    onClick={() => fetchAcceptRequest(requestTo.id, id, friendId.id)} 
                                    className={s.btnAccept}
                                    >
                                    Принять заявку 
                                    </button>
                                    <div onClick={() => fetchRemoveInvite(friendId.id)} className={s.btnRemoveInvite}>Отклонить</div>
                                   </div>
                                </div>
                            }
                        </article>
                        ))
                    }
            </div>
            <p className={s.allNotification}>Показать все</p>
        </section>
    )
}

export default NotificationModal