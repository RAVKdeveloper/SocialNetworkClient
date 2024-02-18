import { FC, useEffect, useState } from 'react'
import s from './style.module.css'
import Link from 'next/link';
import dynamic from 'next/dynamic';

const PostOptionModal = dynamic(() => import('./modal/modal'), { ssr: false })
const CommentsPostWidget = dynamic(() => import('./CommentsWidget/comments'), { ssr: false })

import { UserType } from '@/Redux/Api/User/Auth/authApi'
import { SERVERAPI } from '@/assets/config';
import { TypeLikesPost } from '@/Redux/Api/Wall/Post/wallPost';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks';
import { userSelect } from '@/Redux/Slices/User/userGlobal';
import { useAddPostLikeMutation, useDeletePostLikeMutation } from '@/Redux/Api/Wall/Likes/wallPostLikes';
import { postactionsSelector, setPostId, setIsOpenOptions, setCommentsPostId, setIsOpenComments } from '@/Redux/Slices/Wall/postActions';
import { WallComment } from '@/Redux/Api/Wall/Comments/wallComents';

import { SlOptions } from "react-icons/sl";
import emptyAvatar from '@/assets/img/HomePage/avatarNotFound.png';
import { IoEye } from "react-icons/io5";
import LikeEmpty from '@/assets/img/HomePage/likes/likeEmpty.svg'
import { FcLike } from "react-icons/fc";
import { IoChatboxOutline } from "react-icons/io5";


interface Props {
    id: number
    text: string
    contentMedia: string
    typeContentMedia: string
    visible: number
    isComments: boolean
    visibleAction: string
    createAt: string
    updateAt: string
    user: UserType
    likes: TypeLikesPost[]
    comments: WallComment[]
}


const PostWall: FC<Props> = ({ 
    id, text, contentMedia, typeContentMedia, visible, 
    isComments, visibleAction, createAt, updateAt, user, likes, comments  
                    }) => {

    const { user: thisUser, token } = useAppSelector(userSelect)
    const [ addLikeReq ] = useAddPostLikeMutation()
    const [ removeReq ] = useDeletePostLikeMutation()
    const [ isLike, setIsLike ] = useState<boolean>(false)
    const [ currentLikes, setCurrentLikes ] = useState<number>(0)
    const { postId, isOpenOptions, deletesPostsId, commentsPostId, isOpenComments } = useAppSelector(postactionsSelector)
    const dispatch = useAppDispatch()
 
    const fetchAddLikePost = async () => {
        if(token)
         try{
         
          await addLikeReq({ id, token })
          setIsLike(true)
          setCurrentLikes(prev => prev += 1)
        } catch {
          alert('Произошла ошибка')
        }
    }

    const fetchDeleteLike = async () => {
       if(token)
         try{
        
          await removeReq({ id, token }).unwrap()
          setIsLike(false)
          setCurrentLikes(prev => prev -= 1)
        } catch {
          alert('Произошла ошибка')
        }
    }

    const getPostId = (id: number) =>  dispatch(setPostId(id))

    const getCommentsPostId = (id: number) =>  dispatch(setCommentsPostId(id))

    const openOptions = (id: number) => {
       getPostId(id)
       if(isOpenOptions) return dispatch(setIsOpenOptions(false))

       return dispatch(setIsOpenOptions(true))
    }

    const openComments = (id: number) => {
        getCommentsPostId(id)
        if(isOpenComments) return dispatch(setIsOpenComments(false))

        return dispatch(setIsOpenComments(true))
    }

    const userAvatar = user.avatar ? `${SERVERAPI}${user.avatar}` : emptyAvatar.src

    const timeStamp = new Date(createAt).toLocaleDateString(navigator.language, 
        { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })

    useEffect(() => {
       (thisUser && 
       likes.map(el => el.filterUserId === thisUser.id).length > 0 
       ? 
       setIsLike(true) 
       : 
       setIsLike(false)
       )
       setCurrentLikes(likes.length)   
    }, [ id ])

    if(deletesPostsId.includes(id)) return <p className={s.deleteText}>Запись удалена.</p>

    return (

        <article key={id} className={s.root}>
              <div className={s.postHeader}>
                  <div className={s.userInfo}>
                     <img src={userAvatar} alt={`${user.name} ${user.surname}`} className={s.avatar} />
                     <div className={s.column}>
                        <Link href={'/'} className={s.name}>{user.name} {user.surname}</Link>
                        <span className={s.time}>{timeStamp}</span>
                     </div>
                  </div>
                  <div className={s.optionBody}>
                  <SlOptions onClick={() => openOptions(id)} className={s.optionsIcon} />
                  {
                  postId && postId === id && isOpenOptions &&
                  <PostOptionModal isComments={isComments} />
                  }
                  </div>
              </div>
              <div className={s.content}>
              <p className={s.text}>
                {text}
              </p>
              {
                contentMedia && typeContentMedia && 
                <div className={s.mediaContainer}>
                    {
                        typeContentMedia === 'image' ?
                          <img src={`${SERVERAPI}${contentMedia}`} alt="image" className={s.image} />
                          :
                          <video src={`${SERVERAPI}${contentMedia}`} controls className={s.video} />
                    }
                </div>
              }
              </div>
              <div className={s.actionsRow}>
                <div className={s.actions}>
                  {
                    
                    isLike ?
                   <div className={s.likeBodyActive}>
                     <FcLike onClick={fetchDeleteLike} className={s.fullLike} />
                    <span className={s.currentLikesActive}>{currentLikes > 0 ? currentLikes : ''}</span>
                   </div>
                    :
                   <div className={s.likeBody}>
                    <img onClick={fetchAddLikePost} src={LikeEmpty.src} alt="не нравится" className={s.like} />
                    <span className={s.currentLikes}>{currentLikes > 0 ? currentLikes : ''}</span>
                   </div>
                  }
                   {
                      isComments &&
                       <div onClick={() => openComments(id)} className={s.likeBody}>
                          <IoChatboxOutline className={s.comments} />
                          {
                            comments.length > 0 &&
                             <span className={s.currentComments}>{comments.length}</span>
                          }
                       </div>
                   }
                </div>
                <div className={s.visible}>
                    <IoEye className={s.eye} />
                    {visible}
                </div>
              </div>
              {
                commentsPostId && commentsPostId === id && isOpenComments &&
                <CommentsPostWidget length={comments.length} userId={user.id} />
              }
        </article>
    )
}

export default PostWall