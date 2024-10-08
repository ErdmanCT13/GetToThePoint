import { writable } from "svelte/store";

export class RoomUser{
    id: string = "";
    name: string = "";
    pointSelection: string | undefined;
}

let testUsers: RoomUser[] = [
    {
        id: "2", 
        name: "Brian",
        pointSelection: "5"
    },
    {
        id: "3", 
        name: "Jeb",
        pointSelection: "5"
    },
    {
        id: "4", 
        name: "Tyler",
        pointSelection: "5"
    },
    {
        id: "5", 
        name: "Tom",
        pointSelection: "5"
    },
    {
        id: "5", 
        name: "Tom",
        pointSelection: "5"
    }
];

export const roomUsers = writable<RoomUser[]>(testUsers);





