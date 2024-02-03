import { FC } from 'react'
import s from './style.module.css'

import { useGetOneClipQuery } from '@/Redux/Api/User/Galery/Clips/clipsUpload'
import { useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { clipUploadSelector } from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice'
import { SERVERAPI } from '@/assets/config'

import { FaExternalLinkAlt } from "react-icons/fa";

const PhotoBannerInfoClipUpload: FC = () => {

    const { token } = useAppSelector(userSelect)
    const { clipId } = useAppSelector(clipUploadSelector)
    const { data } = useGetOneClipQuery({ token, id: clipId ? clipId : '14' })

    return (

        <section className={s.root}>
            {
                data &&
            <>
            <video src={`${SERVERAPI}${data.video}`} className={s.video} />
            <div className={s.content}>
                <article className={s.nameColumn}>
                    <span className={s.titleColumn}>Название файла</span>
                    <span className={s.nameFile}>{data.video}</span>
                </article>
                <article className={s.linkColumn}>
                    <span className={s.titleColumn}>Ссылка на клип</span>
                    <a target='_blank' href={`${SERVERAPI}${data.video}`} className={s.linkClip}>Перейти <FaExternalLinkAlt /></a>
                </article>
            </div>
            </>
            }
        </section>
    )
}

export default PhotoBannerInfoClipUpload