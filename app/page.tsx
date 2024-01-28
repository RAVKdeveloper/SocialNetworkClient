'use client'

import s from './style.module.css'
import nookies from 'nookies'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLazyAuthMeQuery } from "@/Redux/Api/User/Auth/authApi"
import { setUser, setToken } from "@/Redux/Slices/User/userGlobal"
import { useAppDispatch } from "@/Redux/hooks/hooks"

import Header from "@/components/GlobalComponents/Header/header"
import SideBar from '@/components/GlobalComponents/Sidebar/SideBar'
import UserInfoHomePage from '@/components/HomePage/UserInfo/userInfo'
import CreateContentBannerHome from '@/components/HomePage/CreateContetnBanner/createContent'

export default function Home() {

  const [ reqMe ] = useLazyAuthMeQuery()
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const AuthMe = async (token: string) => {
    try{
      const res = await reqMe(token).unwrap()
      dispatch(setUser(res))
      dispatch(setToken(token))
    } catch {
      alert('Неизвестная ошибка')
    }
  }

  useEffect(() => {
      const token = nookies.get().tokenAuth

      if(token) AuthMe(JSON.parse(token))
      else push('/login')

  }, [])

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
