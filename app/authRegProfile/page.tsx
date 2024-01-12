'use client';

import { FC, useState } from 'react'
import s from './style.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import SelectRegSexModal from '@/components/Registration/SelectModal/modal';
import { authSelector, setOpenSexModal } from '@/Redux/Slices/Auth/Auth';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks';
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineCameraAlt } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";


interface FormData {
    name: string
    middlename: string
    surname: string
    birthday: string
    pass: string
}


const AuthSmsPage: FC = () => {

    const {
        register,
        formState: {errors, isValid},
        handleSubmit 
    } = useForm<FormData>({
        defaultValues: {
           name: '',
           middlename: '',
           surname: '',
           birthday: '',
           pass: '',
        },
       mode: 'all'
    })
     const { sex, isOpenSexModal } = useAppSelector(authSelector)
     const dispatch = useAppDispatch()
     const [ image, setImage ] = useState<string>('')
     const { push } = useRouter()


     const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            sessionStorage.setItem('imgReg', JSON.stringify(URL.createObjectURL(e.target.files[0])))
          }
     } 

     const openModal = () => {
        if(isOpenSexModal) return dispatch(setOpenSexModal(false))

        return dispatch(setOpenSexModal(true))
     }

     const submit: SubmitHandler<FormData> = data => {
        sessionStorage.setItem('myInfoReg', JSON.stringify(data))
        sessionStorage.setItem('sexUser', sex)
        push('/regContactInfo')
     }

    return (

        <main className={s.root}>
             <div className={s.content}>
                <h3 className={s.title}>Информация о себе</h3>
                <form onSubmit={handleSubmit(submit)} className={s.form}>
                    <div className={s.containerAvatarAndName}>
                          <div className={s.uploadFiles}>
                            <MdOutlineCameraAlt className={s.camera} />
                            <input onChange={addImage} type="file" className={s.fileInput} />
                            {
                                image &&
                                <img src={image} alt='icon' className={s.avatarImg  } />
                            }
                          </div>
                          <div className={s.nameandsurname}>
                            <input type="text" className={s.inputName} placeholder='Имя' {...register('name', { required: true, minLength: 2, maxLength: 20 })} />
                            <input type="text" placeholder='Отчество' {...register('middlename', { required: true, minLength: 3, maxLength: 20 })} />
                            <input type="text" className={s.inputSurname} placeholder='Фамилия' {...register('surname', { required: true, minLength: 2, maxLength: 30 })} />
                          </div>
                    </div>
                    <input type="date" className={s.birthDayInput} placeholder='День Рождения' {...register('birthday', { required: true, minLength: 10, maxLength: 10 })} />
                    <div onClick={openModal} className={s.select}>
                        {sex}
                         <IoIosArrowDown className={s.arrow} />
                         <SelectRegSexModal/>
                    </div>
                    <input type="text" className={s.password} placeholder='Пароль' {...register('pass', { required: true, minLength: 6, maxLength: 50 } )} />
                    <button disabled={isValid === true && sex !== 'Пол' ? false : true} className={isValid === true && sex !== 'Пол' ? s.btn : `${s.btn} ${s.dis}`}>Продолжить</button>
                </form>
                <Link href={'/registration'} className={s.exitBody}><FaArrowRight className={s.exit} /></Link>
             </div>
        </main>
    )
}

export default AuthSmsPage