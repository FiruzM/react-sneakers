import { client } from "../client";

export function getItems() {
    return client.get("/items")
}