import { FC } from 'react'
import s from './style.module.css'
import dynamic from 'next/dynamic'
import PreviewCreateWallContent from './Preview/preview'
const CreateWallContentRedactor = dynamic(() => import('./Redactor/redactor'), { 
    ssr: false,
    loading: () => <p>Loading...</p> 
})

import { useAppSelector } from '@/Redux/hooks/hooks'
import { createWallContentSelect } from '@/Redux/Slices/createContent/createContentAll/createWallContent'


const CreateWallContent: FC = () => {

    const { isPreview } = useAppSelector(createWallContentSelect)

    return (

        <section className={s.root}>
            {
                isPreview ? 
                <PreviewCreateWallContent />
                :
                <CreateWallContentRedactor />
            }
        </section>
    )
}

export default CreateWallContent