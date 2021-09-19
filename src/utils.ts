export function unique(value: any, index: number, self: Array<any>) {
    return self.indexOf(value) === index;
}

export type GenericColumn = {
    name: string
    type: "date" | "number" | "select" | "string",
    nature?: "input" | "computed",
    suggestions?: (string | number)[]
    required: boolean
    format?: (a: any, b: any) => string
}

export const formatMoney = (k: number): string => k === 0 ? '' : k?.toFixed(2)+" €" || `${k}`
export const formatMoneyForExport = function (k: number): string {
    if (k === 0) return ''
    return "<span"
        + "class='money-export'>"+
        k?.toFixed(2)
            .replace(".", ",")+
        "</span>"
        || `${k}`
}
export const sum = (a: number[]) => a.length ? a.reduce((b, c) => b+c): 0