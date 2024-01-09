'use client';

import { FC } from 'react'
import s from './style.module.css'
import logo from '../../../assets/img/RegistrationPage/logo.png'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks';
import { authSelector, setPhoneNumber, setRememberMe } from '@/Redux/Slices/Auth/Auth';
import { useForm, Controller } from "react-hook-form";
import { SubmitHandler } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";



const FormRegistration: FC = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        control
    } = useForm<{ phone: string }>({
        defaultValues: {
            phone: '+7'
        },
        mode: 'all'
      })
    const { rememberMe } = useAppSelector(authSelector)
    const dispatch = useAppDispatch()

    const getCheckbox = () => {
        if(rememberMe) return dispatch(setRememberMe(false))

        return dispatch(setRememberMe(true))
    }

    const submit: SubmitHandler<{ phone: string }> = data => {
        const value = data.phone.replace(/[a-zа-яё]/gi, '')
        dispatch(setPhoneNumber(value.trim()))
        console.log(data.phone.trim())
    }

    return (

        <section className={s.root}>
            <div className={s.headForm}>
                <img src={logo.src} alt="logo" className={s.logo} />
                <h4 className={s.title}>Введите номер</h4>
                <p className={s.subtitle}>
                Ваш номер телефона будет использоваться для входа в аккаунт
                </p>
            </div>
            <form onSubmit={handleSubmit(submit)} className={s.form}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                  validate: (value) => isValidPhoneNumber(value)
                  }}
                 render={({ field: { onChange, value } }) => (
               <PhoneInput
                className={s.input}
                value={value}
                onChange={onChange}
                defaultCountry="RU"
                placeholder='Введите номер телефона'
                id="phone"
            />
          )}
        />
                <div className={s.checkBoxRow}>
                    <div onClick={getCheckbox} className={rememberMe ? `${s.checkbox} ${s.check}` : s.checkbox}></div>
                    <p className={s.textCheckBox}>
                    Сохранить вход
                    </p>
                </div>
                <button disabled={!isValid} type='submit' className={isValid ? s.btn : `${s.btn} ${s.dis}`}>Продолжить</button>
            </form>
            <p className={s.politikKondishenal}>
            Нажимая «Продолжить», вы принимаете пользовательское соглашение и политику конфиденциальности
            </p>
        </section>
    )
}

export default FormRegistration

