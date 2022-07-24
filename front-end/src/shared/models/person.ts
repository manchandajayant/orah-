export interface Person {
    id: number
    first_name: string
    last_name: string
    photo_url?: string
    rollValue?: string
}

export type order = string

export const PersonHelper = {
    getFullName: (p: Person, order: order) =>
        order === "first"
            ? `${p.first_name} 
${p.last_name}`
            : `${p.last_name} ${p.first_name}`,
}
