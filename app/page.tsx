'use client'

import s from './style.module.css'

import Header from "@/components/GlobalComponents/Header/header"
import SideBar from '@/components/GlobalComponents/Sidebar/SideBar'
import UserInfoHomePage from '@/components/HomePage/UserInfo/userInfo'
import CreateContentBannerHome from '@/components/HomePage/CreateContetnBanner/createContent'

export default function Home() {

  return (
    <>
    <Header/>
    <main className={s.root}>
       <div className={s.container}>
          <SideBar/>
          <div className={s.content}>
            <UserInfoHomePage/>
            <div className={s.row}>
               <CreateContentBannerHome />
            </div>
          </div>
       </div>
    </main>
    </>
  )
}
