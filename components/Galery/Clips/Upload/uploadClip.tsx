import { FC } from 'react'
import s from './style.module.css'
import Link from 'next/link'
import PhotoBannerInfoClipUpload from './PhotoInfo/photoInfo'
import FormUploadClip from './Form/form'
import BtnRowUploadClip from './BtnRow/btnRow'

import { useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'

import { IoIosArrowForward } from "react-icons/io";


const UploadClipContent: FC = () => {

    const { user } = useAppSelector(userSelect)

    return (

        <section className={s.root}>
            <div className={s.titleRow}>
                 <Link href={'/'} className={s.noactiveTitle}>{user?.name} {user?.surname}</Link>
                 <IoIosArrowForward className={s.arrow} />
                 <h6 className={s.noactiveTitle}>Клипы</h6>
                 <IoIosArrowForward className={s.arrow} />
                 <h6 className={s.activeTitle}>Публикация клипа</h6>
            </div>
            <div className={s.container}>
                <PhotoBannerInfoClipUpload />
                <FormUploadClip />
            </div>
            <BtnRowUploadClip />
        </section>
    )
}

export default UploadClipContent