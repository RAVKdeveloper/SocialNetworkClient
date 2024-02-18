import { FC } from 'react'
import s from './style.module.css'
import dynamic from 'next/dynamic'

const SortingCommentsModal = dynamic(() => import('./SortingModal/modal'), { ssr: false })

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { useGetWallCommentsQuery, useDeleteWallCommentMutation } from '@/Redux/Api/Wall/Comments/wallComents'
import { postactionsSelector, setIsOpenSortingCommentsModal, setAnswerNick, setValue } from '@/Redux/Slices/Wall/postActions'
import { SERVERAPI } from '@/assets/config'

import { IoIosArrowDown } from "react-icons/io";
import { IoIosClose } from "react-icons/io";


const ChatCommentsWallPost: FC<{ userId: number }> = ({ userId: useCreatorId }) => {

    const { token } = useAppSelector(userSelect)
    const { commentsPostId, sortingComments, isOpenSortingCommentsModal } = useAppSelector(postactionsSelector)
    const dispatch = useAppDispatch()
    const { data = [] } = useGetWallCommentsQuery(
        { id: commentsPostId ? commentsPostId : 1, token, order: sortingComments.value },
        { skip: commentsPostId ? false : true }) 
    const [ removeReq ] = useDeleteWallCommentMutation()

    const openModal = () => {
        if(isOpenSortingCommentsModal) return dispatch(setIsOpenSortingCommentsModal(false))

        return dispatch(setIsOpenSortingCommentsModal(true))
    }

    const fetchDeleteComment = async (id: number) => {
         if(token && id)
           try{
          
            await removeReq({ id, token }).unwrap()
          } catch {
            alert('Произошла ошибка')
          }
    }

    const changeAnswerNick = (name: string) => { 
      dispatch(setAnswerNick(name))
      dispatch(setValue(`${name},`))
    }

    return (

        <section className={s.root}>
              <article onClick={openModal} className={s.sorting}>
                 {sortingComments.preview} 
                 <IoIosArrowDown className={s.arrow} />
                 <SortingCommentsModal />
              </article>
              <div className={s.chat}>
                {
                data && 
                  data.map(({ id, user, text, createAt, imgUrl }) => (
                    <article key={id} className={s.commentBody}>
                       <img src={`${SERVERAPI}${user.avatar}`} alt={user.name} className={s.avatar} />
                       <div className={s.column}>
                          <p className={s.userRow}>
                            {user.name} 
                            {user.surname} 
                            {user.id === useCreatorId ? <span className={s.isauthor}>Автор</span> : ''}
                          </p>
                          <p className={s.text}>{text}</p>
                          {
                             imgUrl &&
                              <img src={`${SERVERAPI}${imgUrl}`} alt={imgUrl} className={s.commentImg} />
                          }
                          <p className={s.actionRow}>
                            <span className={s.time}>
                                {new Date(createAt).toLocaleDateString(navigator.language, 
                                    { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
                                )}
                            </span>
                            <span onClick={() => changeAnswerNick(user.name)} className={s.action}>Ответить</span>
                          </p>
                       </div>  
                       <IoIosClose onClick={() => fetchDeleteComment(id)} className={s.deleteIcon} />
                    </article>
                  ))
                }
              </div>
        </section>
    )
}

export default ChatCommentsWallPost