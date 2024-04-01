import { client } from "../client";

export function getCartItems() {
    return client.get("/cart")
}