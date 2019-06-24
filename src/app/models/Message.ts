export class Message {

    private content: string;
    private user: string;
    private date: string;

    constructor(content, user, date) {
        this.content = content;
        this.user = user;
        this.date = date;
    }

    public getContent() {
        return this.content;
    }

    public getUser() {
        return this.user;
    }

    public getDate() {
        return this.date;
    }

    public getMessage() {
        return this;
    }
}