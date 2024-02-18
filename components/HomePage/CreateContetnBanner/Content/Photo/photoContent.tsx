'use client';

import { FC, useRef, useState, memo } from 'react'
import dynamic from 'next/dynamic';
import s from './style.module.css'
import Skeleton from './Skeleton/skeleton';
const LoaderPhotoGaleryModal = dynamic(() => import('./LoaderModal/modal'), { ssr: false })
const PhotoModal = dynamic(() => import('./PhotoModal/modal'), { ssr: false })

import { useGetPreviewPhotoQuery } from '@/Redux/Api/User/Galery/galeryApi'
import { useAppSelector, useAppDispatch } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { SERVERAPI } from '@/assets/config'
import { setIsOpenPhotoModal, setPhotoId } from '@/Redux/Slices/createContent/createContentAll/createContentAll';


const UserPhotoGaleryPrewiev: FC = memo(() => {

    const { token } = useAppSelector(userSelect)
    const [ image, setImage ] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const { data, isLoading } = useGetPreviewPhotoQuery(token, { skip: token ? false : true })
    const dispath = useAppDispatch()

    const psevdoInputClick = () => inputRef.current?.click()

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
         if(e.target.files) setImage(e.target.files[0])
    }

    const openPhotoModal = (id: string) => {
         dispath(setIsOpenPhotoModal(true))
         dispath(setPhotoId(id))
    }

    return (

        <section className={s.root}>
            <input onChange={changeInput} accept='image/png, image/jpeg, image/jpg' ref={inputRef} type="file"  style={{ display: 'none' }} />
               { 
                  data && !isLoading ?
                data.length > 0 && data[0] !== null ?
                <div className={s.content}>
                  <div className={s.imgRow}>
                    {
                        data.map(({ id, photo }) => (
                            <img key={id} onClick={() => openPhotoModal(id.toString())} src={`${SERVERAPI}${photo}`} alt="image" className={s.image} />
                        ))
                    }
                  </div> 
                  <div className={s.btnRow}>
                     <button onClick={psevdoInputClick} className={`${s.uploadBtn} ${s.big}`}>Загрузить фото</button>  
                     <button className={`${s.uploadBtn} ${s.big}`}>Показать всё</button>  
                  </div>   
                </div>
                :
                <div className={s.empty}>
                <p className={s.emptyText}>Вы ещё не добавили фото</p>
                <button onClick={psevdoInputClick} className={s.uploadBtn}>Загрузить фото</button>
                </div>
                 :
                 <Skeleton />
               }
            {
                image &&
                   <LoaderPhotoGaleryModal file={image} setFile={setImage} />
            }
            <PhotoModal />
        </section>
    )
})

export default UserPhotoGaleryPrewiev