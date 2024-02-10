import { FC } from 'react'
import s from './style.module.css'
import Link from 'next/link'
import Image from 'next/image'
import CommentsChatClipModal from './comments/comments'
import TextFieldClipComment from './TextField/textField'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'
import { createContentAllSelector, setIsOpenOneClipModal } from '@/Redux/Slices/createContent/createContentAll/createContentAll'
import { useTime } from '@/utils/useTime'
import { useGetLikesClipQuery, useAddClipLikeMutation, useRemoveClipLikesMutation } from '@/Redux/Api/User/Galery/Clips/clipsLikes'
import { useDeleteClipMutation } from '@/Redux/Api/User/Galery/Clips/clipsUpload'
import { clipUploadSelector } from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice'

import notFoundAvatar from '@/assets/img/HomePage/avatarNotFound.png'
import likeEmpty from '@/assets/img/HomePage/likes/likeEmpty.svg'
import likeFull from '@/assets/img/HomePage/likes/likeFull.svg'


const ContainerActionsCLipModal: FC = () => {

    const { user, token } = useAppSelector(userSelect)
    const { publishedDateClip } = useAppSelector(createContentAllSelector)
    const { clipId } = useAppSelector(clipUploadSelector)
    const dispatch = useAppDispatch()
    const { time, textTime } = useTime(publishedDateClip, { skip: publishedDateClip ? false : true })
    const { data } = useGetLikesClipQuery({ id: +clipId, token }, { skip: clipId ? false : true })
    const [ remove ] = useRemoveClipLikesMutation()
    const [ create ] = useAddClipLikeMutation()
    const [ removeClip ] = useDeleteClipMutation()

    const fetchAddLike = async () => {
        if(token && clipId)
        try{
            
            await create({ token, id: +clipId }).unwrap()
        } catch {
            alert('Произошла ошибка')
        }
    }

    const fetchDeleteLike = async () => {
        if(token && clipId) 
        try{
           
            await remove({ token, id: +clipId }).unwrap()
        } catch {
            alert('Произошла ошибка')
        } 
    }

    const fetchDeleteClip = async () => {
        if(token && clipId)
        try{
           
            await removeClip({ token, id: clipId }).unwrap()
            dispatch(setIsOpenOneClipModal(false))
        } catch {
            alert('Произошла ошибка')
        }
    }
 
    const userAvatar = user?.avatar ? `${SERVERAPI}${user.avatar}` : notFoundAvatar.src

    const ColorLikesCurrent = data && data.thisUserLike ? `${s.currentsLikes} ${s.red}` : s.currentsLikes

    return (

        <section className={s.root}>
            <div className={s.userInfo}>
                <img src={userAvatar} alt={user?.name} className={s.avatar} />
                <div className={s.column}>
                    <Link href={'/'} className={s.nickName}>{user?.name} {user?.surname}</Link>
                    <p className={s.timePublished}>{time} {textTime} назад</p>
                </div>
            </div>
            <div className={s.actionsRow}>
                <div className={s.likeBody}>
                {
                     data?.thisUserLike === true ?
                    <Image onClick={fetchDeleteLike} src={likeFull} alt={'ненравится'} width={24} height={24} className={s.like} />
                    :
                    <Image onClick={fetchAddLike} src={likeEmpty} alt={'нравится'} width={24} height={24} className={s.like} />
                }
                <div className={ColorLikesCurrent}>{data && data.likes.length > 0 ? data.likes.length : ''}</div>
                </div>
                <span onClick={fetchDeleteClip} className={s.delete}>Удалить</span>
            </div>
            <CommentsChatClipModal />
            <TextFieldClipComment />
        </section>
    )
}

export default ContainerActionsCLipModal