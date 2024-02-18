import { FC, memo } from 'react'
import s from './style.module.css'
import dynamic from 'next/dynamic'

const UploadClipsModal = dynamic(() => import('./UploadModal/modal'), { ssr: false })
const ClipModal = dynamic(() => import('./ClipModal/modal'), { ssr: false })
import SkeletonClips from './Skeleton/skeletom'

import { setIsOpenClipModal } from '@/Redux/Slices/createContent/createContentAll/createContentAll'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { useGetClipsPreviewQuery } from '@/Redux/Api/User/Galery/Clips/clipsUpload'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'
import { setClipId } from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice'
import { setIsOpenOneClipModal } from '@/Redux/Slices/createContent/createContentAll/createContentAll'

import { MdRemoveRedEye } from "react-icons/md";
import { FaLock } from "react-icons/fa6";


const ClipsContentHomePage: FC = memo(() => {

    const { token } = useAppSelector(userSelect)
    const dispatch = useAppDispatch()
    const { data } = useGetClipsPreviewQuery(token, { skip: token ? false : true })

    const openModal = () => dispatch(setIsOpenClipModal(true)) 

    const changeOpenClip = (id: number) => {
         dispatch(setClipId(id))
         dispatch(setIsOpenOneClipModal(true))
    }

    return (

        <section className={s.root}>
            <div className={s.clipsRow}>
                {
                    data ?
                     data.map(({ id, views, video, preview, visible }) => (
                       <article onClick={() => changeOpenClip(id)} key={id} className={s.card}>
                          <video 
                          src={`${SERVERAPI}${video}`} 
                          className={s.video} 
                          poster={preview ? `${SERVERAPI}${preview}` : ''} 
                          />
                         <div className={s.viewsBody}><MdRemoveRedEye className={s.eye} /> {views}</div>
                         {
                            visible === 'iam' &&
                             <FaLock className={s.lockIcon} />
                         }
                       </article>
                     ))
                     :
                     <SkeletonClips />
                    }
            </div>
            {
                data?.length !== 0 &&
                   <div className={s.btnRow}>
                     <button onClick={openModal} className={`${s.uploadBtn} ${s.big}`}>Опубликовать клип</button>
                     <button className={`${s.uploadBtn} ${s.big}`}>Показать всё</button>
                   </div>
            }
            { 
              data?.length === 0 &&
               <div className={s.empty}>
                <p className={s.emptyText}>Вы ещё не добавили клипы</p>
                <button onClick={openModal} className={s.uploadBtn}>Опубликовать клип</button>
               </div>
            }
            <UploadClipsModal />
            <ClipModal />
        </section>
    )
})

export default ClipsContentHomePage