import { FC } from 'react'
import s from './style.module.css'
import TextFieldRedactorWallContent from './TextField/textField'
import PostActionsCreateWallContent from './PostActions/actions'
import SubmitPostWallContent from './Settings&SubmitPost/submitPost'


const CreateWallContentRedactor: FC = () => {

    return (

        <section className={s.root}>
            <TextFieldRedactorWallContent />
            <PostActionsCreateWallContent />
            <SubmitPostWallContent />
        </section>
    )
}

export default CreateWallContentRedactor