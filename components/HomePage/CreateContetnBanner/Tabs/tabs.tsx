import { FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks';
import { createContentAllSelector, setActiveTab } from '@/Redux/Slices/createContent/createContentAll/createContentAll';

import { LuImage } from "react-icons/lu";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { PiArticleMedium } from "react-icons/pi";


const TabsCreateContent: FC = () => {

    const { activeTab} = useAppSelector(createContentAllSelector)
    const dispatch = useAppDispatch()

    const changeTabs = (num: number) => dispatch(setActiveTab(num))

    return (

        <section className={s.root}>
            <article onClick={() => changeTabs(1)} className={activeTab === 1 ? `${s.card} ${s.active}` : s.card}>
                <LuImage className={s.icon} />
                Фото
            </article>
            <article onClick={() => changeTabs(2)} className={activeTab === 2 ? `${s.card} ${s.active}` : s.card}>
                <MdOutlineSlowMotionVideo className={s.icon} />
                Клипы
            </article>
        </section>
    )
}

export default TabsCreateContent