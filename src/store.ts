import { Writable, writable } from "svelte/store"

export type CashFlow = {
    date: string, // YYYY-MM-DD
    amount: number,
    account: string,
    event: string,
    nature: string,
    details: string,
    ref: string,
    note: string
}

export type Account = {
    name: string,
    initial_money: number,
    income?: undefined,
    expense?: undefined,
    profit?: undefined
    current_money: number
}

function createCashFlows() {
    const {
        subscribe,
        update,
        set,
    }: Writable<CashFlow[]> = writable<CashFlow[]>([
        {
            date: "2021-06-18",
            amount: -5.25,
            account: "Compte courant",
            event: "Sans event",
            nature: "Fonctionnement hors évènement",
            details: "Frais de gestion de compte",
            ref: "BNP0008",
            note: "",
        },
        {
            date: "2021-06-19",
            amount: -3.89,
            account: "Compte courant",
            event: "Sans event",
            nature: "Fonctionnement hors évènement",
            details: "Frais de carte de débit",
            ref: "BNP0009",
            note: "",
        },
        {
            date: "2021-06-24",
            amount: -41.58,
            account: "Compte courant",
            event: "Sans event",
            nature: "Fonctionnement hors évènement",
            details: "Matériel, technique et autres frais",
            ref: "BNP0021",
            note: "Gel hydroalcoolique",
        },
        {
            date: "2021-09-17",
            account: "Compte courant",
            amount: 100, event: "Sans event",
            nature: "Fonctionnement hors évènement",
            details: "Subsides et financements",
            ref: "BNP0023",
            note: "Subsides Q1"
        }
    ])
    return {
        subscribe,
        push: (elem: CashFlow) => update((c) => [ ...c, elem ]),
        remove: (i: number) => update(c => c.filter((_, index) => i !== index)),
        set,
    }
}

export const infos = writable({
    orga: undefined,
    quarter: undefined,
    year: undefined,
    company: undefined,
    manager: undefined,
    email: undefined,
    date_start: undefined,
    date_end: undefined,
    address: undefined,
})
export const accounts = writable<Account[]>([
    {
        name: "Compte courant",
        initial_money: 345.67,
        current_money: 456.78
    },
])
export const cashFlows = createCashFlows()
