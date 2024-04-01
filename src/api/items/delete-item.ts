import { client } from "../client";

export function deleteItem(id: number){
    return client.delete(`/cart/${id}`)
}