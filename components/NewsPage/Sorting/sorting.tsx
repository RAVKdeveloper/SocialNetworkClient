import { FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { headWallSelector, setGlobalSortingTabs } from '@/Redux/Slices/Wall/headWall'


const arr: { preview: string, value: 'all' | 'search' }[] = [
    {
        preview: 'Новости',
        value: 'all'
    },
    {
        preview: 'Поиск',
        value: 'search'
    }
]


const SortingGlobalWall: FC = () => {

    const { globalSortingTabs } = useAppSelector(headWallSelector)
    const dispatch = useAppDispatch()

    const changeTabs = (preview: string, value: 'all' | 'search') => {
         dispatch(setGlobalSortingTabs({ preview, value }))
    }

    return (

        <section className={s.root}>
           <ul>
            {
                arr.map(({ preview, value }, i) => (
                    <li 
                     key={i} 
                     className={globalSortingTabs.preview === preview ? `${s.card} ${s.active}` : s.card}
                     onClick={() => changeTabs(preview, value)}
                     >
                      {preview}
                    </li>
                ))
            }
           </ul>
        </section>
    )
}

export default SortingGlobalWall