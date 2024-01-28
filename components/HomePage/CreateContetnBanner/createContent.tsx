import { FC } from 'react'
import s from './style.module.css'
import TabsCreateContent from './Tabs/tabs'


const CreateContentBannerHome: FC = () => {

    return (

        <>
         <section className={s.root}>
            <TabsCreateContent />
         </section>
        </>
    )
}

export default CreateContentBannerHome