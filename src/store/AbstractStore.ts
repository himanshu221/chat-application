
export type UserId = string

export interface Chat {
    chatId: number,
    message: string,
    userId: UserId,
    roomId: number,
    upvotes: UserId[]
}
export abstract class AbstractStore {
    constructor(){}

    initRoom(roomId: number){}

    getChats(roomId: number, limit: number, offset: number){}

    addChat(roomId: number, message: String, userId: UserId){}

    upvote(roomId: number, chatId: number, userId: UserId){}
}