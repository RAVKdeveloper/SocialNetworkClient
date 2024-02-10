import { FC, useEffect, useRef } from 'react'
import s from './style.module.css'

import { useGetOneClipQuery } from '@/Redux/Api/User/Galery/Clips/clipsUpload'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { clipUploadSelector } from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice'
import { SERVERAPI } from '@/assets/config'
import { setPublishedDateClip, setClipCreatorId, createContentAllSelector } from '@/Redux/Slices/createContent/createContentAll/createContentAll'

const VideoPlayerClipModal: FC = () => {

    const { clipId } = useAppSelector(clipUploadSelector)
    const { isOpenOneClipModal } = useAppSelector(createContentAllSelector)
    const { token } = useAppSelector(userSelect)
    const { data } = useGetOneClipQuery({ id: clipId, token }, { 
        skip: token && clipId ? false : true,
    })
    const dispatch = useAppDispatch()
    const clipRef = useRef<HTMLVideoElement>(null)

    if(data) { 
        dispatch(setPublishedDateClip(data.createAt))
        dispatch(setClipCreatorId(data.user.id))
    }

    useEffect(() => {
         if(clipRef.current && isOpenOneClipModal === false) 
           clipRef.current.pause()
    }, [isOpenOneClipModal])

    return (

        <section className={s.root}>
            {
                data &&
                <video 
                ref={clipRef} 
                className={s.video} 
                controls 
                loop 
                autoPlay 
                width={304} 
                height={531} 
                src={`${SERVERAPI}${data.video}`} 
                />
            }
        </section>
    )
}

export default VideoPlayerClipModal