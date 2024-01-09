import { FC } from 'react'
import s from './style.module.css'
import FormRegistration from '@/components/Registration/Form/form'
import QrFormReg from '@/components/Registration/QrForm/qrfrom'


const RegistrationPage: FC = () => {

    return (

        <main className={s.root}>
            <QrFormReg/>
            <FormRegistration/> 
        </main>
    )
}

export default RegistrationPage