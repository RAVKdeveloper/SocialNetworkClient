import { FC } from 'react'
import s from './style.module.css'
import Image from 'next/image'
import Link from 'next/link'
import CommentsPhotoGalery from './Comments/comments'
import TextFielsCommentsPhoto from './TextField/field'

import { useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { useGetOnePhotoQuery } from '@/Redux/Api/User/Galery/galeryApi'
import { createContentAllSelector } from '@/Redux/Slices/createContent/createContentAll/createContentAll'
import { useGetLikeQuery, useDeleteLikeMutation, useAddLikeMutation } from '@/Redux/Api/User/Galery/LikesPhoto'
import { useTime } from '@/utils/useTime'
import { SERVERAPI } from '@/assets/config'

import likeEmpty from '@/assets/img/HomePage/likes/likeEmpty.svg'
import likeFull from '@/assets/img/HomePage/likes/likeFull.svg'


const ChatPhotoGalery: FC = () => {

    const { token, user } = useAppSelector(userSelect)
    const { photoId } = useAppSelector(createContentAllSelector)
    const { data } = useGetOnePhotoQuery({ token, id: photoId }, { skip: photoId ? false : true })

    const { data: isLike } = useGetLikeQuery({ token, photoId }, { skip: photoId ? false : true })
    const [ createLike ] = useAddLikeMutation()
    const [ deleteLike ] = useDeleteLikeMutation()
    const { time, textTime } = useTime(data?.updateAt, { skip: data ? false : true })

    const addLike = async () => {
        console.log(photoId)
        try {
            if(token && photoId) await createLike({ token, photoId: photoId }).unwrap()
        } catch {
            alert('Произошла ошибка') 
        }
    }

    const removeLike = async () => {
        try {
            if(token && photoId) await deleteLike({ token, photoId }).unwrap()
        } catch {
            alert('Произошла ошибка')
        }
    }

    const hrefuser = user?.id === data?.user.id ? '/' : `user/${data?.user.id}`

    const countLikes = data && data.likesPhoto.length > 0 ? data.likesPhoto.length : ''

    return (

        <section className={s.root}>
            <div className={s.avtorRow}>
               {
                data &&  
                <>
                  <Link href={hrefuser}>
                   <img src={`${SERVERAPI}${data.user.avatar}`} alt={data.user.surname} className={s.avatar} />
                  </Link>
                   <div className={s.avatarInfo}>
                       <Link href={hrefuser} className={s.name}>{data.user.name} {data.user.surname}</Link>
                       <span className={s.createdDate}>{time} {textTime} назад</span>
                   </div>
                </>    
               }
            </div>
            <div className={s.likesRow}>
                <div className={s.countLikeRow}>
                {
                    isLike && data &&
                    isLike.thisUserLike ?
                        <Image onClick={removeLike} src={likeFull} alt='ненравиться' className={s.likeFull} />
                        :
                        <Image onClick={addLike} src={likeEmpty} alt='нравиться' className={s.likeEmpty} />
                    }
                    <span className={s.count}>{countLikes}</span>
                </div>
            </div>
            <CommentsPhotoGalery />
            <TextFielsCommentsPhoto />
        </section>
    )
}

export default ChatPhotoGalery