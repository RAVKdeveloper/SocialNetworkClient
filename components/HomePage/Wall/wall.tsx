import { FC, memo } from 'react'
import s from './style.module.css'
import HeadWall from './Head/head'


const WallHomePage: FC = memo(() => {

    return (

        <section className={s.root}>
            <HeadWall />
        </section>
    )
})

export default WallHomePage