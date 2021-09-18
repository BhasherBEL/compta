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

export const formatMoney = (k: number): string => k === 0 ? '' : k?.toFixed(2)+" €" || `${k}`
export const formatMoneyForExport =
    (k: number): string => k === 0 ? '' : "<span class='money-export'>"+k?.toFixed(2).replace(".", ",")+"</span>" || `${k}`
export const sum = (a) => a.length ? a.reduce((b, c) => b+c): 0