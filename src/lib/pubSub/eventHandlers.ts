import type { RoomEvent } from "$lib/models/roomEvent"
import type { RoomUser } from "$lib/models/roomUser";
import { remoteUsers } from "$lib/stores/users.svelte"
import { clientUser } from "$lib/stores/users.svelte";
import { arePointsVisible, pointsValueString } from "$lib/stores/points.svelte";

export function HandleRoomMessage(event: RoomEvent<any>): void { // TODO: work about a better way of arranging this so it's typesafe, we shouldn't use any like this
    switch (event.roomEvent) {
        case 'join': // user joins the room
            HandleRoomJoin(event);
            break;
        case 'leave': // user leaves the room
            HandleRoomLeave(event);
            break;
        case 'reveal': // user reveals points
            HandleRoomReveal(event);
            break;
        case 'reset': // user resets points
            HandleRoomReset(event);
            break;
        case 'point': // user sets points
            HandleRoomPoint(event);
            break;
        case 'update_username':
            HandleRoomUpdateUsername(event);
    }
}

export function HandleRoomJoin(event: RoomEvent): void {
    console.log("user joined room");
    const joiningUser: RoomUser = { id: event.userId, roomId: event.roomId, displayName: event.userDisplayName, pointSelection: 0 }; // init points to 0... this might cause issues if the user selects points right after join
    //remoteUsers.update(users => [...users, joiningUser])
    remoteUsers.value = [...remoteUsers.value, joiningUser];
}

export function HandleRoomLeave(event: RoomEvent): void {
    // not implemented yet
}

export function HandleRoomReveal(event: RoomEvent<boolean>): void {
    console.log("receiver gets the value: ", event.value)
    const newValue: boolean = Boolean(event.value)
    console.log(newValue)
    arePointsVisible.value = newValue;
}

export function HandleRoomReset(event: RoomEvent): void { // TODO: decide whether to use this
    console.log("user reset room")
    // what's the best way to reset the points on the backend?
    // when a user clicks the 'reset' button, a form action should run on the server to handle the resetting. This is the idiomatic Sveltekit way of doing things
    //remoteUsers.update(users => users.map(user => ({...user, pointSelection: 0})));

    // reset the point selection and hide points
    pointsValueString.value = "0";
    arePointsVisible.value = false;
    remoteUsers.value = remoteUsers.value.map(user => ({...user, pointSelection: 0}));
    clientUser.value = {...clientUser.value, pointSelection: 0};
}

export function HandleRoomPoint(event: RoomEvent<number>): void {
    console.log("user pointed room");
    remoteUsers.value = updateUserPoints(remoteUsers.value, event.userId, Number(event.value));
}

// TODO factor out most of this code into a separate method
function updateUserPoints(users: RoomUser[], userId: string,  newPoints: number){
    const userIndex: number = users.findIndex(user => user.id == userId); // find out which index this user is at
    if(userIndex == -1){ throw new Error("unable to update user points, user could not be found in remote users")}; // we didn't find a user with this id, something isn't right
    const updatedUser = {...users[userIndex], pointSelection: newPoints} // copy the old user into a new reference and update the points

    return replaceRoomUser(users, userIndex, updatedUser)
}

function HandleRoomUpdateUsername(event: RoomEvent<string>){
    updateUserDisplayName(remoteUsers.value, event.userId, event.value)
}

// TODO factor out most of this code into a separate method
function updateUserDisplayName(users: RoomUser[], userId: string, newDisplayName: string){
    console.log(newDisplayName, userId)
    const userIndex: number = users.findIndex(user => user.id == userId); // find out which index this user is at
    if(userIndex == -1){ throw new Error("unable to update user points, user could not be found in remote users")}; // we didn't find a user with this id, something isn't right
    //const updatedUser = {...users[userIndex], displayName: newDisplayName} // copy the old user into a new reference and update the points
    
    // TODO why is replaceRoomuser not working here but working in updateUserPoints above? the two functions are nearly identical in what they do.
    users[userIndex].displayName = newDisplayName
    //replaceRoomUser(users, userIndex, updatedUser)
}

function replaceRoomUser(users: RoomUser[], userIndex: number, newUser: RoomUser){
    console.log(newUser, `index: ${userIndex}`, users)
    return users.toSpliced(userIndex, 1, newUser);
}