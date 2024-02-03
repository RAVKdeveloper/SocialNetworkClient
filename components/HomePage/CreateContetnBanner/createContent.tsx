import { FC } from 'react'
import s from './style.module.css'
import TabsCreateContent from './Tabs/tabs'
import UserPhotoGaleryPrewiev from './Content/Photo/photoContent'
import ClipsContentHomePage from './Content/Clips/clipContent'

import { useAppSelector } from '@/Redux/hooks/hooks'
import { createContentAllSelector } from '@/Redux/Slices/createContent/createContentAll/createContentAll'


const CreateContentBannerHome: FC = () => {

    const { activeTab } = useAppSelector(createContentAllSelector)

    return (

         <section className={s.root}>
             <TabsCreateContent />
            {
                activeTab === 1 &&
                 <UserPhotoGaleryPrewiev />
            }
            {
                activeTab === 2 &&
                <ClipsContentHomePage />
            }
         </section>
    )
}

export default CreateContentBannerHome