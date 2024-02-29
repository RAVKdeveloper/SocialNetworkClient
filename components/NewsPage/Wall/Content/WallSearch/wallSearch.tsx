import { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import s from '../WallAll/style.module.css'

const Post = dynamic(() => import('@/components/HomePage/Wall/Content/Post/post'))

import { IPost, useGetGlobalWallQuery } from '@/Redux/Api/Wall/Post/wallPost'
import { useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { headWallSelector } from '@/Redux/Slices/Wall/headWall'

import { MdOutlineWebAsset } from 'react-icons/md'


const GlobalWallSearch: FC = () => {

    const { token } = useAppSelector(userSelect)
    const { globalSearchValue, globalSortingTabs } = useAppSelector(headWallSelector)
    const [ posts, setPosts ] = useState<IPost[]>([])
    const { data } = useGetGlobalWallQuery({ 
        page: 1,
        limit: 100,
        action: 'search',
        searchText: globalSearchValue,
        token
     }, { skip: 
        (token ? false : true)
        ||
        (globalSortingTabs.value === 'search' ? false : true) 
        || 
        (globalSearchValue ? false : true)
    })

     useEffect(() => {
        if(data && globalSearchValue) setPosts(data[0])
     }, [data, globalSearchValue])

    return (

        <section className={s.root}>
              {
                posts.length > 0 && globalSearchValue ?
                    posts.map(post => (
                        <Post key={post.id} {...post} />
                    ))
                 :
                <div className={s.empty}>
                     <MdOutlineWebAsset className={s.emptyIcon} />
                     <p className={s.emptyText}>          
                         По вашему запросу ничего не найдено.
                     </p>
                </div>
            }
        </section>
    )
}

export default GlobalWallSearch