export class PublicRoom {
    room: string;
    user: string;
    token: string;

    constructor(room, user) {
        this.room = room;
        this.user = user;
    }

    getRoomUser() {
        return {
            'room': this.room,
            'user': this.user
        }
    }
}
