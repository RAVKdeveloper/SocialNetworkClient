'use client';

import { FC } from 'react'
import dynamic from 'next/dynamic';
import s from './style.module.css'

import SideBar from '@/components/GlobalComponents/Sidebar/SideBar'
import Header from '@/components/GlobalComponents/Header/header'
const Wall = dynamic(() => import('@/components/NewsPage/Wall/wall'))
import Sorting from '@/components/NewsPage/Sorting/sorting'


const NewsPage: FC = () => {

    return (
       <>
       <Header />
        <main className={s.root}>
            <div className={s.container}>
                <SideBar />
                <div className={s.row}>
                    <Wall />
                    <Sorting />
                </div>
            </div>
        </main>
       </> 
    )
}

export default NewsPage