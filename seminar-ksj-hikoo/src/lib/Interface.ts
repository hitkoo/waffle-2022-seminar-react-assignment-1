import { SetStateAction, Dispatch } from 'react'

export interface ILoginStatus {
    IsLogin: boolean
    LoginUser: string
    UserID: number | null
    Token: string
}

export function initLoginStatus(): ILoginStatus{
    const defaults = {
        IsLogin: false, LoginUser: "", UserID: null, Token: ""
    }
    return{
        ...defaults
    }
}

export interface IStoreStatus {
    id: number
    name: string
    owner: string
}

export function initStoreStatus(): IStoreStatus{
    const defaults = { id: NaN, name: "", owner: "" }
    return{
        ...defaults
    }
}

export interface IMenu {
    created_at: string
    description: string
    id: number
    image: string
    name: string
    owner: IOwner
    price: number
    rating: number
    type: string
    updated_at: string
}

export interface IOwner {
    created_at: string
    id: number
    store_description: string
    store_name: string
    updated_at: string
    username: string
    rating: number
}

export interface ILoginRefresh {
    created_at: string
    id: number
    store_description: string
    store_name: string
    updated_at: string
    username: string
}

export interface IIDContext {
    LoginStatus: ILoginStatus
    setLoginStatus: Dispatch<SetStateAction<ILoginStatus>>
    StoreStatus: IStoreStatus
    setStore: Dispatch<SetStateAction<IStoreStatus>>
}


export interface IMenuContext {
    menuList: IMenu[]
    setMenu: Dispatch<SetStateAction<IMenu[]>>
    selectMenu: IMenu
    setSelect: Dispatch<SetStateAction<IMenu>>
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

export interface IReview{
    id: number
    content : string
    rating: number
    created_at: string
    updated_at: string
    menu : IMenu
    author: IOwner
}