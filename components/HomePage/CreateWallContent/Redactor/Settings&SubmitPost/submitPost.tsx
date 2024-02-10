import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import s from './style.module.css'
import SettingModalWallRedactor from './Modal/modal'

import { 
    createWallContentSelect, 
    setContentMedia, 
    setIsOpenSettingsModal, 
    setIsSubmitForm, 
    setIsPreview,
    setTextValueWallContent, 
} from '@/Redux/Slices/createContent/createContentAll/createWallContent' 
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/hooks'
import { useCreatePostMutation, useUploadFileMediaMutation } from '@/Redux/Api/Wall/Post/wallPost'
import { userSelect } from '@/Redux/Slices/User/userGlobal'

import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


const SubmitPostWallContent: FC = () => {

    const { 
        isOpenSettingsModal, 
        textValue, 
        isComments, 
        isNotification, 
        visibleAction, 
        isSubmitForm
    } = useAppSelector(createWallContentSelect)
    const { token } = useAppSelector(userSelect)
    const dispatch = useAppDispatch()
    const imageRef = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLInputElement>(null)
    const [ createReq ] = useCreatePostMutation()
    const [ uploadReq ] = useUploadFileMediaMutation()
    const [ media, setMedia ] = useState<File | null>(null)
    const [ postId, setPostId ] = useState<number | null>(null)

    const changeMediaContent = (e: ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
        const file = e.target.files
        if(file && file[0]) {
            const obj = {
                url: URL.createObjectURL(file[0]),
                type
            }
            dispatch(setContentMedia(obj))
            setMedia(file[0])
        }
    }

    const psevdoImageInputClick = () => imageRef.current?.click()
    const psevdoVideoInputClick = () => videoRef.current?.click()

    const openSettingsModal = () => {
        if(isOpenSettingsModal) return dispatch(setIsOpenSettingsModal(false))

        return dispatch(setIsOpenSettingsModal(true))
    }

    const fetchCreatePost = async () => {
        if(token) 
         try{
 
            const obj = {
                text: textValue,
                isComments,
                isNotification,
                visibleAction,
                contentMedia: '',
                typeContentMedia: '',
                token,
                isSendNotific: isNotification
            }

            const res = await createReq(obj).unwrap()
            if(res) {
                dispatch(setIsSubmitForm(true))
                setPostId(res.id)
            }
         } catch {
            alert('Произошла ошибка')
         }
    }

    const fetchUploadMedia = async () => {
        if(token && postId && media)
          try{

              const obj = {
                 id: postId,
                 token,
                 file: media
              } 

             await uploadReq(obj).unwrap()
             dispatch(setIsPreview(true))
             dispatch(setContentMedia(null))
             dispatch(setTextValueWallContent(''))
             alert('Пост создан')
          } catch {
            alert('Произошла ошибка')
          }
    }

    useEffect(() => {
        if(media && isSubmitForm) fetchUploadMedia()
    }, [ media, isSubmitForm ])

    const isDisabled = textValue ? false : true

    return (

        <section className={s.root}>
            <input 
            ref={imageRef}
            type="file" 
            accept='image/png, image/jpeg, image/jpg, image/gif' 
            onChange={(e) => changeMediaContent(e, 'image')} 
            style={{ display: 'none' }}
            />
             <input 
            ref={videoRef}
            type="file" 
            accept='video/*,.avi,.mp4,.3gp,.mpeg,.mov,.flv,.f4v,.wmv,.mkv,.webm,.vob,.rm,.rmvb,.m4v,.mpg,.ogv,.ts,.m2ts,.mts,.mxf' 
            onChange={(e) => changeMediaContent(e, 'video')} 
            style={{ display: 'none' }}
            />
            <div className={s.actionsRow}>
                <IoCameraOutline onClick={psevdoImageInputClick} className={s.icon} />
                <MdOutlineSlowMotionVideo onClick={psevdoVideoInputClick} className={s.icon} />
                <div className={s.settingsBody}>
                <IoSettingsOutline onClick={openSettingsModal} className={s.icon} />
                <SettingModalWallRedactor />
                </div>
            </div>
            <button onClick={fetchCreatePost} disabled={isDisabled} className={s.submitBtn}>Отправить</button>
        </section>
    )
}

export default SubmitPostWallContent