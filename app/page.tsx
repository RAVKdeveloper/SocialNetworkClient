'use client'

import s from './style.module.css'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLazyAuthMeQuery } from "@/Redux/Api/User/Auth/authApi"
import nookies from 'nookies'
import { setUser, setToken } from "@/Redux/Slices/User/userGlobal"
import { useAppDispatch } from "@/Redux/hooks/hooks"

import Header from "@/components/GlobalComponents/Header/header"

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
      <h1>Hello</h1>
    </main>
    </>
  )
}
