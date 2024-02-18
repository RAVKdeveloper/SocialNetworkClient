import { FC, memo } from "react";
import s from './style.module.css'
import HeadTabsWall from "./Tabs/tabs";
import SearchFieldHeadWall from "./Search/search";

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
                  <SearchFieldHeadWall />
            }
        </section>
    )
})

export default HeadWall 