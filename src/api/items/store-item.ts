import { client } from "../client";

export function storeItem(obj: { name: string, price: number, url: string }) {
    return client.post("/cart", obj)
}