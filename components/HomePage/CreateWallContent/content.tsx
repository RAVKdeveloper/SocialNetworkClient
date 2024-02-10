import { FC } from 'react'
import s from './style.module.css'
import PreviewCreateWallContent from './Preview/preview'
import CreateWallContentRedactor from './Redactor/redactor'

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