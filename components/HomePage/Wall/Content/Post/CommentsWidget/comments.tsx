import { FC } from 'react'
import s from './style.module.css'
import ChatCommentsWallPost from './chat/chat'
import TextFildCreateCommentWallPost from './TextField/textField'

interface Props {
    length: number
    userId: number
}


const CommentsPostWidget: FC<Props> = ({ length, userId }) => {

    return (

        <section className={s.root}>
        {
            length > 0 &&
             <ChatCommentsWallPost userId={userId} />
        }
        <TextFildCreateCommentWallPost />
        </section>
    )
}

export default CommentsPostWidget