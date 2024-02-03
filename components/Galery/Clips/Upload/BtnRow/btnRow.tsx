import { FC, memo } from 'react'
import s from './style.module.css'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/Redux/hooks/hooks'
import { clipUploadSelector } from '@/Redux/Slices/createContent/createContentAll/clipUploadSlice'
import { useCreateClipMutation, useDeleteClipMutation } from '@/Redux/Api/User/Galery/Clips/clipsUpload'
import { userSelect } from '@/Redux/Slices/User/userGlobal'


const BtnRowUploadClip: FC = memo(() => {

    const { token } = useAppSelector(userSelect)
    const { preview, description, clipId, isComments, visibleValue } = useAppSelector(clipUploadSelector)
    const [ create ] = useCreateClipMutation()
    const [ remove ] = useDeleteClipMutation()
    const { push } = useRouter()
    
    const fetchCreateClip = async () => {
         if(token)
         try{
            
            const obj = {
                preview,
                description,
                isComments,
                visible: visibleValue.value,
                confirm: true,
                token,
                id: clipId
            }

            await create(obj).unwrap()
            push('/')

         } catch (e: any) {
            alert('Что-то пошло не так')
            console.log(e.data)
         }
    } 

    const deleteClip = async () => {
        if(token)
          try{
               
            await remove({ token, id: clipId }).unwrap()
            push('/')
          } catch {
              alert('Что-то пошло не так')
          }
    }

    return (

        <section className={s.root}>
            <p className={s.politicKondishional}>
                 Клип не должен нарушать авторские и смежные права.
                 <a href="https://vk.com/@vkclips-copyrights-description" target='_blank'>Узнать больше</a> 
            </p>
            <div className={s.btnRow}>
                <button onClick={deleteClip} className={s.canselBtn}>Отмена</button>
                <button onClick={fetchCreateClip} className={s.publishBtn}>Опубликовать</button>
            </div>
        </section>
    )
})

export default BtnRowUploadClip