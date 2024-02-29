import { FC, memo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import s from './style.module.css'

import WallLoader from '@/components/HomePage/Wall/Loading/loader'

const WallAll = dynamic(() => import('./Content/WallAll/wallAll'), { loading: () => <WallLoader />, ssr: false })
const WallSearch = dynamic(() => import('./Content/WallSearch/wallSearch'), { loading: () => <WallLoader /> })
const PostModal = dynamic(() => import('@/components/HomePage/Wall/Content/PostModal/PostModal'))
const SearchField = dynamic(() => import('@/components/NewsPage/SearchField/search'))
const FriendsWidget = dynamic(() => import('@/components/NewsPage/RecFriendsWidget/friends'))

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { headWallSelector, setObserverGlobalPosts } from '@/Redux/Slices/Wall/headWall'


// eslint-disable-next-line react/display-name
const GlobalWall: FC = memo(() => {

    const { globalSortingTabs, observerGlobalPosts } = useAppSelector(headWallSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
       
        if(globalSortingTabs.value === 'all') dispatch(setObserverGlobalPosts(false))
        else dispatch(setObserverGlobalPosts(true))

    }, [observerGlobalPosts, globalSortingTabs.value])

    return (

        <section className={s.root}>
            {
                 globalSortingTabs.value === 'search' ?
                 <>
                  <SearchField />
                  <WallSearch />
                 </>
                 :
                 <>
                 <FriendsWidget />
                 <WallAll />
                 </>
            }
            <PostModal />
        </section>
    )
})

export default GlobalWall