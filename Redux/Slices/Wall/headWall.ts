import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { RootState } from "@/Redux/store";


type TabsAction = {
    preview: string
    value: 'all' | 'archive'
}

type TypeGlobalSortingTabs = {
    preview: string
    value: 'all' | 'search'
}

interface Iinitialstate {
    activeHead: 'filterTabs' | 'search'
    tabsAction: TabsAction
    searchValue: string
    globalSearchValue: string,
    globalSortingTabs: TypeGlobalSortingTabs
    observerGlobalPosts: boolean
}


const initialState: Iinitialstate = {
    activeHead: 'filterTabs',
    tabsAction: { preview: 'Все записи', value: 'all' },
    searchValue: '',
    globalSearchValue: '',
    globalSortingTabs: { preview: 'Новости', value: 'all' },
    observerGlobalPosts: false
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
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setGlobalSearchValue: (state, action: PayloadAction<string>) => {
            state.globalSearchValue = action.payload
        },
        setGlobalSortingTabs: (state, action: PayloadAction<TypeGlobalSortingTabs>) => {
            state.globalSortingTabs = action.payload
        },
        setObserverGlobalPosts: (state, action: PayloadAction<boolean>) => {
            state.observerGlobalPosts = action.payload
        }
    }
})


export const headWallSelector = (state: RootState) => state.headWall

export const { 
    setActiveHead, 
    setTabsAction, 
    setSearchValue, 
    setGlobalSearchValue, 
    setGlobalSortingTabs,
    setObserverGlobalPosts 
} = headWall.actions

export default headWall.reducer
