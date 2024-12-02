type RoomEventName = "join" | "leave" | "reveal" | "reset" | "point"

type RoomEvent<TValue =  null | undefined> = {
    time: string;
    roomEvent: RoomEventName,
    roomId: string,
    userId: string,
    userDisplayName: string,
    value: TValue
}

export type { RoomEvent, RoomEventName }