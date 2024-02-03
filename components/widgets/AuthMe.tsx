'use client';

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation"
import nookies from 'nookies'

import { useLazyAuthMeQuery } from "@/Redux/Api/User/Auth/authApi"
import { setUser, setToken } from "@/Redux/Slices/User/userGlobal"
import { useAppDispatch } from "@/Redux/hooks/hooks"


const AuthMeWidget: FC = () => {

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
        <></>
    )
}

export default AuthMeWidget