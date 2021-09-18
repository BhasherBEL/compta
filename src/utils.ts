export function unique(value, index, self) {
    return self.indexOf(value) === index;
}

export type GenericColumn = {
    name: string
    type: "date" | "number" | "select" | "text"
    suggestions?: (string | number)[]
    required: boolean
    format: string
}

export const formatMoney = (k: number): string => k === 0 ? '' : k?.toFixed(2)+" " || `${k}`

export const sum = (a) => a.reduce((b, c) => b+c)