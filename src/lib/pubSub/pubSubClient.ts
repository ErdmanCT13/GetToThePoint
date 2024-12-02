import type { RoomEvent } from "$lib/models/roomEvent";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import { HandleRoomMessage } from "./eventHandlers";

export function SetupRoomListener(clientAccessUri: string, currentUserId: string): WebPubSubClient{ // Uri should contain group and user id info
    const pubSubClient = new WebPubSubClient(clientAccessUri);
    ListenForGroupMessages(pubSubClient, currentUserId);
    pubSubClient.start();

    return pubSubClient;
}

function ListenForGroupMessages(client: WebPubSubClient, currentUserId: string = ""){
    client.on('group-message', (e) => {
        const roomEvent: RoomEvent = JSON.parse(e.message.data.toString()) as RoomEvent;
        if(IsOwnEvent(roomEvent, currentUserId)) return;
        HandleRoomMessage(roomEvent);
    });
}

function IsOwnEvent(event: RoomEvent, currentUserId: string): boolean{
    console.log("is own event: ", event.userId == currentUserId);
    return event.userId == currentUserId;
}


