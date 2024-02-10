import { FC, memo } from 'react'
import s from './style.module.css'
import Link from 'next/link';

import { SERVERAPI } from '@/assets/config';
import { useGetClipCommentsQuery, useDeleteClipCOmmentsMutation } from '@/Redux/Api/User/Galery/Clips/clipsComments';
import { useAppSelector } from '@/Redux/hooks/hooks';
import { userSelect } from '@/Redux/Slices/User/userGlobal';
import { clipUploadSelector } from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice';

import { LiaCommentsSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";


const CommentsChatClipModal: FC = memo(() => {

    const { token, user } = useAppSelector(userSelect)
    const { clipId } = useAppSelector(clipUploadSelector)
    const { data } = useGetClipCommentsQuery({ id: +clipId, token }, { skip: clipId ? false : true })
    const [ removeReq ] = useDeleteClipCOmmentsMutation()

    const fetchDeleteComment = async (id: number) => {
        if(token && id)
         try{
        
            await removeReq({ token, id }).unwrap()
        } catch {
            alert('Произошла Ошибка')
        }
    }

    const language = navigator.language

    return (

        <section className={s.root}>
            {
                data && user && data.length > 0 ?
                data.map(comment => (
                  <article key={comment.id} className={s.comment}>
                <div className={s.avatarInfo}>
                        <img src={`${SERVERAPI}${comment.user.avatar}` } alt={comment.user.name} className={s.avatar} />
                    <div className={s.column}>
                        <Link href={user.id === comment.user.id ? '/' : `/user/${comment.user.id}`} className={s.name}>
                            {comment.user.name} {comment.user.surname}
                        </Link>
                        <p className={s.text}>{comment.text}</p>
                        <span className={s.time}>
                            {new Date(comment.updateAt).toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                </div>
                {
                    user.id === comment.user.id &&
                      <div className={s.actionsBody}>
                        <IoMdClose onClick={() => fetchDeleteComment(comment.id)} className={s.icon} />
                     </div>
                }
                  </article>
                ))
                :
                 <div className={s.empty}>
                     <LiaCommentsSolid className={s.emtyIcon} />
                     <p className={s.emptyText}>Будьте первым, кто оставит комментарий к этому клипу</p>
                 </div>
            }
        </section>
    )
})

export default CommentsChatClipModal