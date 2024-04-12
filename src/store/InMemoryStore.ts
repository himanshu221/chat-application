import { AbstractStore, Chat, UserId } from "./AbstractStore";

let globalChatId = 0;
interface Room {
    roomId: number,
    chats: Chat[]
}
export class InMemoryStore implements AbstractStore {
    private store: Map<number, Room>
    constructor(){
        this.store = new Map<number, Room>()
    }

    initRoom(roomId: number){
        this.store.set(roomId, {
            roomId,
            chats: []
        })
    }

    getChats(roomId: number, limit: number, offset: number){
        const room = this.store.get(roomId)

        if(!room)
            return []
        return room.chats.reverse().slice(offset, offset + limit)
    }

    addChat(roomId: number, message: string, userId: UserId){
        const room = this.store.get(roomId)
        if(!room) return
        
        room.chats.push({
            chatId: globalChatId++,
            message,
            userId,
            roomId,
            upvotes: []
        })
    }
    
    upvote(roomId: number, cId: number, userId: UserId){
        const room = this.store.get(roomId)
        if(!room) return 
        const chat = room.chats.find(({chatId}) => chatId == cId)

        if(chat){
            chat.upvotes.push(userId)
        }
    }
}