'use client';

import { FC } from 'react'
import s from './style.module.css'
import Link from 'next/link';

import { useGetCommentsQuery, useDeleteCommentMutation } from '@/Redux/Api/User/Galery/comments';
import { useAppSelector } from '@/Redux/hooks/hooks';
import { userSelect } from '@/Redux/Slices/User/userGlobal';
import { createContentAllSelector } from '@/Redux/Slices/createContent/createContentAll/createContentAll';
import { SERVERAPI } from '@/assets/config';

import { LiaCommentsSolid } from "react-icons/lia";
import { GoPencil } from "react-icons/go";
import { IoMdClose } from "react-icons/io";


const CommentsPhotoGalery: FC = () => {

    const { token, user } = useAppSelector(userSelect)
    const { photoId } = useAppSelector(createContentAllSelector)
    const  { data: comments } = useGetCommentsQuery({ token, id: Number(photoId) }) 
    const [ remove ] = useDeleteCommentMutation()

    const deleteComment = async (id: number) => {
         if(token && photoId) 
         try{
           
           await remove({ token, id }).unwrap()
         } catch {
           alert('Произошла ошибка')
         }
    } 
        
    return (

        <section className={s.root}>
            {
                comments && user && comments.length > 0 ?
                comments.map((comment) => (
                <article key={comment.id} className={s.comment}>
                <div className={s.avatarInfo}>
                        <img src={`${SERVERAPI}${comment.user.avatar}` } alt={comment.user.name} className={s.avatar} />
                    <div className={s.column}>
                        <Link href={`/user/${comment.user.id}`} className={s.name}>{comment.user.name} {comment.user.surname}</Link>
                        <p className={s.text}>{comment.text}</p>
                        <span className={s.time}>{comment.updateAt.substring(0, 10)}</span>
                    </div>
                </div>
                {
                    user.id === comment.user.id &&
                      <div className={s.actionsBody}>
                        {/* <GoPencil className={s.icon} /> */}
                        <IoMdClose onClick={() => deleteComment(comment.id)} className={s.icon} />
                     </div>
                }
                  </article>
                ))
                  :
                  <div className={s.empty}>
                     <LiaCommentsSolid className={s.emtyIcon} />
                     <p className={s.emptyText}>Будьте первым, кто оставит комментарий к этой фотографии</p>
                 </div>
            }
        </section>
    )
}

export default CommentsPhotoGalery