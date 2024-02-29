import { FC, useState, useEffect, memo } from 'react'
import dynamic from 'next/dynamic'
import s from './style.module.css'

const Post = dynamic(() => import('@/components/HomePage/Wall/Content/Post/post'))

import { useInView } from 'react-intersection-observer'
import { IPost, useGetGlobalWallQuery } from '@/Redux/Api/Wall/Post/wallPost'
import { useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { headWallSelector } from '@/Redux/Slices/Wall/headWall'

import { MdOutlineWebAsset } from 'react-icons/md'


// eslint-disable-next-line react/display-name
const GlobalWall: FC = memo(() => {

    const { ref, inView } = useInView({ threshold: 1 })
    const { token } = useAppSelector(userSelect)
    const { globalSortingTabs, observerGlobalPosts } = useAppSelector(headWallSelector)
    const [ page, setPage ] = useState<number>(1)
    const [ posts, setPosts ] = useState<IPost[]>([])
    const [ isVisible, setIsVisible ] = useState<boolean>(false)
    const { data, isLoading } = useGetGlobalWallQuery({ 
        page,
        limit: 8,
        action: 'all',
        searchText: '',
        token
     }, { skip: 
        (token ? false : true) 
        || 
        (window.location.href === 'http://localhost:3000/news' ? false : true)  
        || 
        (observerGlobalPosts)
    })

     useEffect(() => {

        if(data && !observerGlobalPosts) setPosts(prev => [...prev, ...data[0]])
        else if(observerGlobalPosts) { setPosts([]), setPage(1) }

     }, [data, observerGlobalPosts])
 
     useEffect(() => {
        setTimeout(() => setIsVisible(true), 1000)
     }, [])

     useEffect(() => {
        if(inView && data && (posts.length < data[1])) {
         console.log('DONE', posts.length, data[1])
         setPage(prev => prev += 1)
         const bottomGap = Number(document.documentElement.scrollHeight - 950)
         window.scrollTo(0, bottomGap)
        }
     }, [inView, data])

    return (

        <section className={s.root}>
            {
                posts.length > 0 && !isLoading ?
                 <>
                    {
                        posts.map(post => (
                            <Post key={post.id} {...post} />
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
                        На стене пока ниодного поста.
                     </p>
                </div>
            }
        </section>
    )
})

export default GlobalWall