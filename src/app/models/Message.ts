export class Message {

    private content: string;
    private userName: string;
    private userColor: string;
    private date: string;

    constructor(content, userName, userColor, date) {
        this.content = content;
        this.userName = userName;
        this.userColor = userColor;
        this.date = date;
    }

    public getContent() {
        return this.content;
    }

    public getUser() {
        return this.userName;
    }

    public getUserColor() {
        return this.userColor;
    }

    public getDate() {
        return this.date;
    }

    public getMessage() {
        return this;
    }
}