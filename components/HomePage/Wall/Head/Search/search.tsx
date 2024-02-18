import { ChangeEvent, FC, useState, useCallback, memo, useEffect } from 'react'
import s from './style.module.css'
import debounce from 'lodash.debounce';

import { headWallSelector, setActiveHead, setSearchValue } from '@/Redux/Slices/Wall/headWall';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks';

import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


const SearchFieldHeadWall: FC = memo(() => {

    const { searchValue } = useAppSelector(headWallSelector)
    const dispatch = useAppDispatch()
    const [ value, setValue ] = useState<string>('')

    const closeSearchAction = () => {
        dispatch(setSearchValue(''))
        setValue('')
        if(searchValue === '') dispatch(setActiveHead('filterTabs'))
    }

    const updateReduxSearchValue = useCallback(
        debounce((str) => dispatch(setSearchValue(str)), 500)
    , [])

    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateReduxSearchValue(e.target.value)
    }   
 
    return (

        <section className={s.root}>
            <div className={s.inputBox}>
                <IoSearch className={s.searchIcon} />
                <input value={value} onChange={changeInput} type="text" className={s.input} placeholder='Введите фразу или слово' />
            </div> 
            <IoMdClose onClick={closeSearchAction} className={s.close} />
        </section>
    )
})

export default SearchFieldHeadWall