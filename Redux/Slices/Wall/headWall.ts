import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


type TabsAction = {
    preview: string
    value: 'all' | 'archive'
}


interface Iinitialstate {
    activeHead: 'filterTabs' | 'search'
    tabsAction: TabsAction
}


const initialState: Iinitialstate = {
    activeHead: 'filterTabs',
    tabsAction: { preview: 'Все записи', value: 'all' }
}



export const headWall = createSlice({
    name: 'headWall',
    initialState,
    reducers: {
        setActiveHead: (state, action: PayloadAction<'filterTabs' | 'search'>) => {
            state.activeHead = action.payload
        },
        setTabsAction: (state, action: PayloadAction<TabsAction>) => {
            state.tabsAction = action.payload
        }
    }
})


export const headWallSelector = (state: RootState) => state.headWall

export const { setActiveHead, setTabsAction } = headWall.actions

export default headWall.reducer