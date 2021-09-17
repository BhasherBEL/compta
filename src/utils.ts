export function unique(value, index, self) {
    return self.indexOf(value) === index;
}

export type GenericColumn = {
    name: string
    type: "date" | "number" | "select" | "text"
    suggestions?: (string | number)[]
    mandatory: boolean
    format: string
}

export const formatMoney = (k: number): string => `${k.toFixed(2)} €`

export const sum = (a) => a.reduce((b, c) => b+c)