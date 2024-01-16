'use client'

import { useInterval } from "ahooks"
import { useAppDispatch } from "../entities/store/store"
import { updateDate } from "../entities/date/store"
import { DateTime } from "luxon"

const GlobalDateUpdater = () => {
    const dispatch = useAppDispatch()
    useInterval(() => {
        dispatch(updateDate(DateTime.now().setLocale('ru')))
    },1000)
    return <></>
}

export default GlobalDateUpdater