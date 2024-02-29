import { FC, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import s from './style.module.css'

const OptionsModal = dynamic(() => import('../Post/modal/modal'))
const ActionsRowPostModal = dynamic(() => import('./actionsRow/actions'))
const CommentsWidget = dynamic(() => import('../Post/CommentsWidget/comments'))

import { postactionsSelector, setIsOpenPostModal, setPostId } from '@/Redux/Slices/Wall/postActions'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { useGetOnePostQuery } from '@/Redux/Api/Wall/Post/wallPost'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'

import { SlOptions } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";


const PostWallModal: FC = () => {

    const { token } = useAppSelector(userSelect)
    const { isOpenPostModal, postId, isOpenCommentsPostModal } = useAppSelector(postactionsSelector)
    const dispatch = useAppDispatch()
    const [ openOptions, setOpenOptions ] = useState<boolean>(false)

    const { data } = useGetOnePostQuery({ token, id: postId ? postId : 0 }, { skip: postId ? false : true })

    const changeOptions = () => {
        if(openOptions) return setOpenOptions(false)

        return setOpenOptions(true)
    }

    const closeModal = () => {
        dispatch(setIsOpenPostModal(false))
        dispatch(setPostId(null))
    }

    const isOpen = isOpenPostModal ? `${s.root} ${s.active}` : s.root

    const timeStemd = data && new Date(data.createAt).toLocaleDateString(navigator.language, 
        { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })

    if(!data)  return;

    return (

        <section className={isOpen}>
            <article className={s.modal}>
                <div className={s.titleRow}>
                        <div className={s.userInfo}>
                          <img src={`${SERVERAPI}${data.user.avatar}`} alt={data.user.surname} className={s.avatar} />
                          <div className={s.column}>
                             <Link href={`/${data.user.id}`} className={s.nickName}>{data.user.name} {data.user.surname}</Link>
                             <span className={s.time}>{timeStemd}</span>
                          </div>
                        </div>
                   <div className={s.options}>
                     <SlOptions onClick={changeOptions} className={s.optionsIcon} />
                     { openOptions && <OptionsModal isComments={data.isComments} /> }
                   </div>
                </div>
                <div className={s.content}>
                    <p className={s.text}>{data.text}</p>
                    {
                        data.typeContentMedia === 'image' &&
                        <Image 
                         loader={() => `${SERVERAPI}${data.contentMedia}`}
                         src={`${SERVERAPI}${data.contentMedia}`} 
                         alt={data.contentMedia} className={s.image} 
                         width={605.4}
                         height={351}
                         />
                    }
                    {
                        data.typeContentMedia === 'video' &&
                        <video controls src={`${SERVERAPI}${data.contentMedia}`} className={s.video} /> 
                    }
                </div>
                <ActionsRowPostModal 
                 length={data.likes.length} 
                 likes={data.likes} 
                 visible={data.visible} 
                 postId={data.id}
                 />
                 <div className={s.comments}>
                {
                    isOpenCommentsPostModal &&
                    <CommentsWidget length={data.comments.length} userId={data.user.id} />
                }
                 </div>
            </article>
            <IoMdClose onClick={closeModal} className={s.close} />
        </section>
    )
}

export default PostWallModal