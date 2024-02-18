import { FC, useState, useEffect } from 'react'
import s from './style.module.css'
import dynamic from 'next/dynamic'
const PostWall = dynamic(() => import('./Post/post'), { ssr: false })

import { IPost } from '@/Redux/Api/Wall/Post/wallPost'
import { useGetWallPostsQuery } from '@/Redux/Api/Wall/Post/wallPost'
import { useAppSelector } from '@/Redux/hooks/hooks'
import { headWallSelector } from '@/Redux/Slices/Wall/headWall'
import { userSelect } from '@/Redux/Slices/User/userGlobal'

import { MdOutlineWebAsset } from 'react-icons/md'


const WallSearchContentHomePage: FC = () => {

    const [ posts, setPosts ] = useState<IPost[]>([])
    const [ page, setPage ] = useState<number>(1)
    const { searchValue, activeHead } = useAppSelector(headWallSelector)
    const { token } = useAppSelector(userSelect)
    const { data } = useGetWallPostsQuery({
        page: page,
        limit: 10,
        action: 'search',
        searchText: searchValue,
        token
    }, { skip: activeHead === 'search' ? false : true })


    useEffect(() => {
        if(data) setPosts(data[0])
     }, [data])


    return (

        <section className={s.root}>
        {
             posts.length > 0 ?
             <>
             {
               posts.map(({ id, user, createAt, text, contentMedia, typeContentMedia, isComments, visible, visibleAction, updateAt, likes, comments }) => (
                 <PostWall 
                   key={`${id}search${new Date()}`}
                   id={id}
                   user={user}
                   text={text}
                   createAt={createAt}
                   contentMedia={contentMedia}
                   typeContentMedia={typeContentMedia}
                   isComments={isComments}
                   visible={visible}
                   visibleAction={visibleAction}
                   updateAt={updateAt}
                   likes={likes}
                   comments={comments}
                 />
               ))
             }
              </>
            :
            <div className={s.empty}>
                 <MdOutlineWebAsset className={s.emptyIcon} />
                 <p className={s.emptyText}>
                    По вашему запросу ничего не найденo
                 </p>
            </div>
        }
        </section>
    )
}

export default WallSearchContentHomePage