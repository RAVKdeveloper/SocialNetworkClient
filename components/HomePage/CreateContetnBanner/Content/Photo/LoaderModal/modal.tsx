import { Dispatch, FC, SetStateAction } from 'react'
import s from './style.module.css'
import Image from 'next/image'

import { usePostPhotoMutation } from '@/Redux/Api/User/Galery/galeryApi';
import { useAppSelector } from '@/Redux/hooks/hooks';
import { userSelect } from '@/Redux/Slices/User/userGlobal';

import { IoCloseSharp } from "react-icons/io5";

interface Props {
    file: File
    setFile: Dispatch<SetStateAction<File | null>>
}

const LoaderPhotoGaleryModal: FC<Props> = ({ file, setFile }) => {

    const [ postReq ] = usePostPhotoMutation()
    const { token } = useAppSelector(userSelect)

    const removeImage = () => setFile(null)

    const fetchSavePhoto = async () => {
         if(token && file) {
            try{
               
              await postReq({ file, token }).unwrap()
              setFile(null)
              alert('Фото добавлено')
            } catch {
              alert('Произошла ошибка')
            }
         }
    }

    const isDisabled = file ? false : true

    return (

        <section className={s.root}>
            <article className={s.modal}>
              <h5 className={s.title}>Загрузка фото <IoCloseSharp onClick={removeImage} className={s.close} /></h5>
              <div className={s.imageContainer}>
                <Image src={URL.createObjectURL(file)} alt="image" width={294} height={294} className={s.image} />
              </div>
              <div className={s.btnRow}>
                <button onClick={removeImage} className={s.canselBtn}>Отмена</button>
                <button disabled={isDisabled} onClick={fetchSavePhoto} className={s.confirmBtn}>Сохранить</button>
              </div>
            </article>
        </section>
    )
}

export default LoaderPhotoGaleryModal