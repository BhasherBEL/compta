export function unique(value: any, index: number, self: any[]): boolean {
    return self.indexOf(value) === index;
}

export type GenericColumn<T> = {
    name: string
    type: "date" | "number" | "select" | "string"
    nature?: "input" | "computed"
    suggestions?: (string | number)[]
    suggestions_keys?: (string|number)[]
    required: boolean
    format?: (a: any, b: T, c: any) => string
    default?: any
}

export const formatMoney = (k: number): string => k?.toLocaleString(
    undefined,
    {minimumFractionDigits: 2, maximumFractionDigits: 2}
)+" €" || `${k}`

export const formatMoneyForExport = (k: number): string => {
    if (k === 0) return ''
    return "<span class='money-export'>"+
        k?.toLocaleString(
            undefined,
            {minimumFractionDigits: 2, maximumFractionDigits: 2}
        )+ "</span>"
        || `${k}`
}
export const sum = (a: number[]) => a.length ? a.reduce((b, c) => b+c): 0