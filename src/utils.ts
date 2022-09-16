export function unique(value: any, index: number, self: any[]): boolean {
    return self.indexOf(value) === index;
}

export type GenericColumn<T> = {
    name: string
    type: "date" | "number" | "select" | "string"
    suggestions?: (string | number)[]
    suggestions_keys?: (string|number)[]
    required: boolean
    compute?: (a: any, b: T, c: any) => any
    format?: (a: any, b: T, c: any) => string
    default?: any
}

export const formatMoney = (k: number): string => {
    if (k === 0) return ''
    return "<span class='money-export'>"+
        k?.toLocaleString(
            undefined,
            {minimumFractionDigits: 2, maximumFractionDigits: 2}
        )+ "</span>"
        || `${k}`
}
export const sum = (a: number[]) => a.length ? a.reduce((b, c) => b+c): 0