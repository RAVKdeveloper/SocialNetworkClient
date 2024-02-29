import { ChangeEvent, FC, useCallback, useState } from 'react'
import s from './style.module.css'

import debounce from 'lodash.debounce'

import { useAppDispatch } from '@/Redux/hooks/hooks'
import { setGlobalSearchValue } from '@/Redux/Slices/Wall/headWall'

import { IoMdClose } from "react-icons/io";


const SearchFieldGlobalWall: FC = () => {

    const [ value, setValue ] = useState<string>('')
    const dispatch = useAppDispatch()

    const getSearch = useCallback(
        debounce((str: string) => dispatch(setGlobalSearchValue(str)), 800),
        []
    )

    const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        getSearch(e.target.value)
    }

    const clearValue = () => {
        setValue('')
        dispatch(setGlobalSearchValue(''))
    }

    return (

        <section className={s.root}>
            <div className={s.inputBox}>
            <input 
             onChange={changeSearch} 
             value={value} 
             type="text" 
             className={s.input} 
             placeholder='Поиск новостей'
             />
             {
                value &&
                 <IoMdClose onClick={clearValue} className={s.close} />
             }
            </div>
        </section>
    )
}

export default SearchFieldGlobalWall