import { Dispatch, FC, SetStateAction } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { useDeletePostMutation, useUpdateCommentsActionMutation } from '@/Redux/Api/Wall/Post/wallPost'
import { postactionsSelector, setIsOpenOptions, setPostId, setDeletesPostsId, setDisabledComments } from '@/Redux/Slices/Wall/postActions'
import { userSelect } from '@/Redux/Slices/User/userGlobal'


interface Props {
    isComments: boolean
}

const PostOptionModal: FC<Props> = ({ isComments }) => {

    const { token } = useAppSelector(userSelect)
    const { postId, disabledComments } = useAppSelector(postactionsSelector)
    const dispatch = useAppDispatch()

    const [ removeReq ] = useDeletePostMutation()
    const [ commentsReq ] = useUpdateCommentsActionMutation()
    

    const clearRequest = () => {
        dispatch(setPostId(null))
        dispatch(setIsOpenOptions(false))
    }

    const changeCommentsRedux = () => {
        if(postId) {
         return dispatch(setDisabledComments(postId))
        }
    }

    const fetchDeletePost = async () => {
         if(token && postId) 
           try{
              
              await removeReq({ id: postId, token }).unwrap()
              dispatch(setDeletesPostsId(postId))
              alert('Пост удален')
            } catch {
                alert('Произошла ошибка')
            } finally {
                clearRequest()
            }
    }

    const fetchUpdateStatusComments = async (status: boolean) => {
        if(token && postId) 
         try{

            const obj = {
                token,
                id: postId,
                isComments: status
            }

            await commentsReq(obj).unwrap()

            if(status) changeCommentsRedux()
        
        } catch {
            alert('Произошла ошибка')
        } finally {
            clearRequest()
        }
    }

    return (

        <article className={s.root}>
             <ul>
                <li onClick={fetchDeletePost} className={s.action}>Удалить запись</li>
                <li className={s.action}>Архивировать запись</li>
                {
                    isComments && postId && !disabledComments.includes(postId) ?
                    <li onClick={() => fetchUpdateStatusComments(false)} className={s.action}>Выключить комментарии</li>
                    :
                    <li onClick={() => fetchUpdateStatusComments(true)} className={s.action}>Включить комментарии</li>
                }
             </ul>
        </article>
    )
}

export default PostOptionModal