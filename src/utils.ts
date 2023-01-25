import {lang, Language} from "./lang/language";
import {onDestroy} from "svelte";

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
    let text: Language;
    const unsubscribeLang = lang.subscribe(langData => {text = langData;});
    onDestroy(unsubscribeLang);
    return `<span class='money-export'>`+
        k?.toLocaleString(text.lang,
            {minimumFractionDigits: 2, maximumFractionDigits: 2}
        )+ "</span>"
        || `${k}`
}

export const formatColor = (k: number, format: string): string => {
    if (k === 0) return ''
    return `<span style="background-color: ${picker(k, "#dfffdf", "#fed4d4")}">`+ format + "</span>"
}

export const sum = (a: number[]) => a.length ? a.reduce((b, c) => b+c): 0;
export const picker = (nbr: number, positive: any, negative: any) => nbr > 0 ? positive : (nbr < 0 ? negative : "");
