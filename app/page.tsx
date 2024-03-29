'use client';

import s from './style.module.css'

import Header from "@/components/GlobalComponents/Header/header"
import SideBar from '@/components/GlobalComponents/Sidebar/SideBar'
import UserInfoHomePage from '@/components/HomePage/UserInfo/userInfo'
import CreateContentBannerHome from '@/components/HomePage/CreateContetnBanner/createContent'
import CreateWallContent from '@/components/HomePage/CreateWallContent/content'
import WallHomePage from '@/components/HomePage/Wall/wall'
import FrientsWidget from '@/components/HomePage/Friends/Friends';


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
              <div className={s.left}>
               <CreateContentBannerHome />
               <CreateWallContent />
               <WallHomePage />
              </div>
              <div className={s.right}>
                 <FrientsWidget />
              </div>
            </div>
          </div>
       </div>
    </main>
    </>
  )
}
