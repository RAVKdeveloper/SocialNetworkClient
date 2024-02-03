import { FC } from 'react'
import s from './style.module.css'
import UploadClipsModal from './UploadModal/modal'

import { setIsOpenClipModal } from '@/Redux/Slices/createContent/createContentAll/createContentAll'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { useGetClipsPreviewQuery } from '@/Redux/Api/User/Galery/Clips/clipsUpload'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'

import { MdRemoveRedEye } from "react-icons/md";
import { FaLock } from "react-icons/fa6";


const ClipsContentHomePage: FC = () => {

    const { token } = useAppSelector(userSelect)
    const dispatch = useAppDispatch()
    const { data } = useGetClipsPreviewQuery(token, { skip: token ? false : true })

    const openModal = () => dispatch(setIsOpenClipModal(true)) 

    console.log(data)

    return (

        <section className={s.root}>
            <div className={s.clipsRow}>
                {
                    data && data.length > 0 ?
                     data.map(({ id, views, video, preview, visible }) => (
                       <article key={id} className={s.card}>
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
                     null
                }
            </div>
            <div className={s.btnRow}>
                <button onClick={openModal} className={`${s.uploadBtn} ${s.big}`}>Опубликовать клип</button>
                <button className={`${s.uploadBtn} ${s.big}`}>Показать всё</button>
            </div>
            { 
              data?.length === 0 &&
               <div className={s.empty}>
                <p className={s.emptyText}>Вы ещё не добавили клипы</p>
                <button onClick={openModal} className={s.uploadBtn}>Опубликовать клип</button>
               </div>
            }
            <UploadClipsModal />
        </section>
    )
} 

export default ClipsContentHomePage