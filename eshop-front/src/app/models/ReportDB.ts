export class ReportDB {
    id: number;
    topic: string;
    message: string;
    isReviewed: boolean;

    constructor(id: number, topic: string, message: string, isReviewed: boolean) {
        this.id = id;
        this.topic = topic;
        this.message = message;
        this.isReviewed = isReviewed;
    }
}
