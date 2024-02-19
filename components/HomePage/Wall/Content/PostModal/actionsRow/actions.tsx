import { FC, useState, useEffect } from 'react'
import Image from 'next/image';
import s from './style.module.css'

import type { TypeLikesPost } from '@/Redux/Api/Wall/Post/wallPost';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks';
import { userSelect } from '@/Redux/Slices/User/userGlobal';
import { useAddPostLikeMutation, useDeletePostLikeMutation } from '@/Redux/Api/Wall/Likes/wallPostLikes';
import { postactionsSelector, setIsOpenCommentsPostModal, setCommentsPostId } from '@/Redux/Slices/Wall/postActions';

import { IoEye } from "react-icons/io5";
import LikeEmpty from '@/assets/img/HomePage/likes/likeEmpty.svg'
import { FcLike } from "react-icons/fc";
import { IoChatboxOutline } from "react-icons/io5";


interface Props {
    length: number
    likes: TypeLikesPost[]
    visible: number
    postId: number
}


const ActionsRowPostModal: FC<Props> = ({ length, likes, visible, postId }) => {

    const { user, token } = useAppSelector(userSelect)
    const { isOpenCommentsPostModal } = useAppSelector(postactionsSelector)
    const [ isLike, setIsLike ] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const [ createReq ] = useAddPostLikeMutation()
    const [ removeReq ] = useDeletePostLikeMutation()

    const fetchActionLikes = async () => {
        if(token && postId)
          try{
        
           if(isLike) await removeReq({ id: postId, token }).unwrap()
           else if(!isLike) await createReq({ id: postId, token }).unwrap()

         } catch {
            alert('Произошла ошибка')
         }
    }

    const openComments = () => {
        dispatch(setCommentsPostId(postId))
        if(isOpenCommentsPostModal) return dispatch(setIsOpenCommentsPostModal(false))

        return dispatch(setIsOpenCommentsPostModal(true))
    }

    useEffect(() => {
       if(user)
        likes.map(el => el.filterUserId === user?.id).length > 0 
        ? setIsLike(true) 
        : 
        setIsLike(false)  
    }, [ likes ])


    const likeTypeClass = isLike ? `${s.btnLike} ${s.active}` : s.btnLike

    return (

        <div className={s.root}>
            {
                length > 0 &&
                  <div className={s.statusRow}>
                    <FcLike className={s.statusLike} />
                    <span className={s.currentLikes}>{length}</span>
                  </div>
            }
            <div className={s.row}>
            <div className={s.actionBtns}>
            <div onClick={fetchActionLikes} className={likeTypeClass}>
                {
                    isLike ?
                    <FcLike className={s.like} />
                    :
                    <Image src={LikeEmpty} alt='не нравиться' className={s.like} />
                }
                <span>Нравиться</span>
            </div>
            <div onClick={openComments} className={s.commentsBody}>
              <IoChatboxOutline className={s.commentsIcon} />
            </div>
            </div>
            {
                visible > 0 &&
                 <div className={s.visible}>
                   <IoEye className={s.eye} />
                   {visible}
                </div>
            }
            </div>
        </div>
    )
}

export default ActionsRowPostModal