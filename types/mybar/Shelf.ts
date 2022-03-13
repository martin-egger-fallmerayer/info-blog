export type Shelf = {
    label: string,
    rows: Array<ShelfRow>

}

export type ShelfRow = {
    label: string,
    items: Array<ShelfItem>
}

export type ShelfItem = {
    name: string,
    img: string
}