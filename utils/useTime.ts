import { useState, useEffect, useCallback } from "react";

interface Options {
    skip?: boolean
}

export const useTime = (timeStempt: string | null | undefined, options?: Options ): { time: number | null, textTime: string } => {

    const [ time, setTime ] = useState<number | null>(null)
    const [ textTime, setTextTime ] = useState<string>('')

    useEffect(() => {
        calcTime()
    }, [timeStempt, options])
    
    const calcTime = useCallback(() => {
        if(options?.skip === false && timeStempt) {
            const getPhotoTimeMinuts = (new Date().getTime() - new Date(timeStempt).getTime()) / 60000
            
            if(getPhotoTimeMinuts >= 60 && getPhotoTimeMinuts < 1440) {
                const newTime = Math.floor(getPhotoTimeMinuts / 60)
                setTime(newTime)
                setTextTime('часов')
            }
            if(getPhotoTimeMinuts < 60) {
               setTime(Math.floor(getPhotoTimeMinuts))
               setTextTime('минут')
            }
            if(getPhotoTimeMinuts >= 1440) {
                const newTime = Math.floor(getPhotoTimeMinuts / 1440)
                setTime(newTime)
                setTextTime('дней')
            }   
        }
    }, [timeStempt, options]) 

    return { time, textTime }
}