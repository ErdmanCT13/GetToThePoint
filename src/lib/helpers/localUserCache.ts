import type { RoomUser } from "$lib/models/roomUser"

const cachedUserKey = "gttp-local-user"

export function getUserIfCached(): RoomUser | null{
    const cachedUser: string | null = localStorage.getItem(cachedUserKey)
    if(cachedUser == null){
        return null
    }
    return JSON.parse(cachedUser);
}

export function clearLocalUserCache(){
    localStorage.removeItem(cachedUserKey)
}

export function setLocalUserCache(user: RoomUser){
    localStorage.setItem(cachedUserKey, user.toString())
}