import { FC, memo } from "react";
import s from './style.module.css'
import HeadTabsWall from "./Tabs/tabs";

import { useAppSelector } from "@/Redux/hooks/hooks";
import { headWallSelector } from "@/Redux/Slices/Wall/headWall";


const HeadWall: FC = memo(() => {

    const { activeHead } = useAppSelector(headWallSelector)

    return (

        <section className={s.root}>
            {
                activeHead === 'filterTabs' ?
                  <HeadTabsWall />
                :
                  null
            }
        </section>
    )
})

export default HeadWall