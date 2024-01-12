import { FC } from 'react'
import s from './style.module.css'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { authSelector, setOpenSexModal, setSex } from '@/Redux/Slices/Auth/Auth'


const SelectRegSexModal: FC = () => {

    const arrSex = ['Пол', 'Женский', 'Мужской']

    const { sex, isOpenSexModal } = useAppSelector(authSelector)
    const dispatch = useAppDispatch()

    const addSexMail = (str: string) => {
        dispatch(setSex(str))
        dispatch(setOpenSexModal(false))
    }

    return (

        <section className={isOpenSexModal ? `${s.root} ${s.active}` : s.root}>
            {
                arrSex.map((el, i) => (
                    <article onClick={() => addSexMail(el)} key={i} className={sex === el ? `${s.card} ${s.active}` : s.card}>{el}</article>
                ))
            }
        </section>
    )
}

export default SelectRegSexModal