import { FC, memo } from 'react'
import s from './style.module.css'
import dynamic from 'next/dynamic'

import HeadWall from './Head/head'
import WallLoader from './Loading/loader'
const WallContentHomePage = dynamic(() => import('./Content/wallContent'), {
    ssr: false,
    loading: () => <WallLoader />
})
const WallSearchContentHomePage = dynamic(() => import('./Content/wallContentSearch'))

import { useAppSelector } from '@/Redux/hooks/hooks'
import { headWallSelector } from '@/Redux/Slices/Wall/headWall'


const WallHomePage: FC = memo(() => {

    const { searchValue } = useAppSelector(headWallSelector)

    return (

        <section className={s.root}>
            <HeadWall />
            {
                searchValue ?
                <WallSearchContentHomePage />
                :
                <WallContentHomePage />
            }
        </section>
    )
})

export default WallHomePage