import { FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks';
import { headWallSelector, setTabsAction, setActiveHead } from '@/Redux/Slices/Wall/headWall';

import { IoSearchOutline } from "react-icons/io5";


interface ITabsList {
    id: number
    preview: string
    value: 'all' | 'archive'
}

const tabsList: ITabsList[] = [
    {
        id: 1,
        preview: 'Все записи',
        value: 'all'
    },
    {
        id: 2,
        preview: 'Архив записей',
        value: 'archive'
    }
]

const HeadTabsWall: FC = () => {

    const { tabsAction } = useAppSelector(headWallSelector)
    const dispatch = useAppDispatch()

    const changeTab = (preview: string, value: 'all' | 'archive') => dispatch(setTabsAction({ preview, value }))

    const openSearch = () => dispatch(setActiveHead('search'))

    return (

        <section className={s.root}>
            <div className={s.tabsRow}>
                {
                    tabsList.map(({ id, preview, value }) => (
                      <article 
                      onClick={() => changeTab(preview, value)} 
                      key={id} 
                      className={tabsAction.value === value ? `${s.tab} ${s.active}` : s.tab}
                      >
                         {preview}
                      </article>
                    ))
                }
            </div>
            <IoSearchOutline onClick={openSearch} className={s.searchIcon} />
        </section>
    )
}

export default HeadTabsWall