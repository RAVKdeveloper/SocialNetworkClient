'use client';

import { FC, useEffect } from 'react'
import s from './style.module.css'
import Header from '@/components/GlobalComponents/Header/header'
import SideBar from '@/components/GlobalComponents/Sidebar/SideBar'
import UploadClipContent from '@/components/Galery/Clips/Upload/uploadClip';

import { setClipId } from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice';
import { useAppDispatch } from '@/Redux/hooks/hooks';

interface Props {
    params: { id: string[] }
}

const ClipUploadPage: FC<Props> = ({ params }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setClipId(params.id))
    }, [params])

    return (

        <>
        <Header/>
        <main className={s.root}>
            <div className={s.container}>
                <SideBar />
                <div className={s.content}>
                    <UploadClipContent />
                </div>
            </div>
        </main>
        </>
    )
}

export default ClipUploadPage