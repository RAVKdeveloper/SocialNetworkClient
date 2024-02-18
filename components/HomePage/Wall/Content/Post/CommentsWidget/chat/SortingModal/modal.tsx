import { FC } from 'react'
import s from './style.module.css'

import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { postactionsSelector, setIsOpenSortingCommentsModal, setSortingComments } from '@/Redux/Slices/Wall/postActions'

interface ArrPuncts {
    id: number
    preview: string
    value: 'ASC' | 'DESC'
}

const arrPuncts: ArrPuncts[] = [
    {
        id: 1,
        preview: 'Сначала старые',
        value: 'ASC'
    },
    {
        id: 2,
        preview: 'Сначала новые',
        value: 'DESC'
    }
]

const SortingCommentsModal: FC = () => {

    const { sortingComments, isOpenSortingCommentsModal } = useAppSelector(postactionsSelector)
    const dispatch = useAppDispatch() 

    const changeSortingType = (preview: string, value: 'ASC' | 'DESC') => dispatch(setSortingComments({ preview, value }))

    const isOpen = isOpenSortingCommentsModal ? `${s.root} ${s.active}` : s.root

    return (

        <article className={isOpen}>
            {
                arrPuncts.map(({ id, value, preview }) => (
                    <div 
                    key={id} 
                    className={value === sortingComments.value ? `${s.card} ${s.active}` : s.card}
                    onClick={() => changeSortingType(preview, value)}
                    >
                    {preview}
                    </div>
                ))
            }
        </article>
    )
}

export default SortingCommentsModal