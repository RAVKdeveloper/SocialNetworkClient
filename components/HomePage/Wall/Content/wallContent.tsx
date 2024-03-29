import { FC, memo, useEffect, useState } from 'react'
import s from './style.module.css'
import dynamic from 'next/dynamic'
const PostWall = dynamic(() => import('./Post/post'), { ssr: false })

import { useInView } from 'react-intersection-observer'
import { useGetWallPostsQuery } from '@/Redux/Api/Wall/Post/wallPost'
import { useAppSelector } from '@/Redux/hooks/hooks'
import { headWallSelector } from '@/Redux/Slices/Wall/headWall'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { IPost } from '@/Redux/Api/Wall/Post/wallPost'

import { MdOutlineWebAsset } from "react-icons/md";


// eslint-disable-next-line react/display-name
const WallContentHomePage: FC = memo(() => {

    const { ref, inView } = useInView({ threshold: 1 })
    const [ page, setPage ] = useState<number>(1)
    const [ posts, setPosts ] = useState<IPost[]>([])
    const [ isVisible, setIsVisible ] = useState<boolean>(false)
    const { searchValue, activeHead } = useAppSelector(headWallSelector)
    const { token } = useAppSelector(userSelect)
    const { data } = useGetWallPostsQuery({
        page: page,
        limit: 10,
        action: 'all',
        searchText: '',
        token
    }, { skip: 
      (token ? false : true) || 
      (activeHead === 'search' ? true : false) || 
      (window.location.href === 'http://localhost:3000/' ? false : true) 
    })

    useEffect(() => {

       if(data && activeHead === 'filterTabs' && window.location.href === 'http://localhost:3000/') setPosts(prev => [...prev, ...data[0]])
       else { setPosts([]), setPage(1) }

    }, [data, activeHead, searchValue, window.location.href])

    useEffect(() => {
       setTimeout(() => setIsVisible(true), 1000)
    }, [])

    useEffect(() => {
       if(inView && data && (posts.length < data[1])) {
        setPage(prev => prev += 1)
        const bottomGap = Number(document.documentElement.scrollHeight - 950)
        window.scrollTo(0, bottomGap)
       }
    }, [ inView, data ])

    return (

        <section className={s.root}>
            {
                 posts.length > 0 ?
                 <>
                 {
                   posts.map((post, i) => (
                     <PostWall 
                       key={`${post.id}${i}`}
                      {...post}
                     />
                   ))
                 }
                 {  isVisible &&
                     <div ref={ref} style={{ height: 40 }}></div>
                 }
                  </>
                :
                <div className={s.empty}>
                     <MdOutlineWebAsset className={s.emptyIcon} />
                     <p className={s.emptyText}>          
                        На стене пока нет ни одной записи.
                     </p>
                </div>
            }
        </section>
    )
})

export default WallContentHomePage