import { FC } from 'react'
import s from './style.module.css'

import { useGetOnePhotoQuery, useDeletePhotoMutation } from '@/Redux/Api/User/Galery/galeryApi'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { userSelect } from '@/Redux/Slices/User/userGlobal'
import { createContentAllSelector, setIsOpenPhotoModal } from '@/Redux/Slices/createContent/createContentAll/createContentAll'
import { SERVERAPI } from '@/assets/config'


const PhotoUserContainer: FC = () => {

    const { token } = useAppSelector(userSelect)
    const { photoId } = useAppSelector(createContentAllSelector)
    const { data } = useGetOnePhotoQuery({ token, id: photoId })
    const [ reqDelete ] = useDeletePhotoMutation()
    const dispatch = useAppDispatch()

    const deletePhoto = async () => {
        if(token) {
            try {
                await reqDelete({ token, id: photoId }).unwrap()
                dispatch(setIsOpenPhotoModal(false))
                alert('Фото удалено')
            } catch {
                alert('Произошла ошибка')
            }
        }
    }

    return (

        <section className={s.root}>
            {
                data &&
                <img src={`${SERVERAPI}${data.photo}`} alt="image" className={s.image} />
            }
            <div className={s.actionsRow}>
                <span className={s.info}>Фотография пользователя</span>
                <span onClick={deletePhoto} className={s.delete}>Удалить</span>
            </div>
        </section>
    )
}

export default PhotoUserContainer