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
        push: (elem) => update((c) => [ ...c, elem ]),
        remove: (i) => update(c => c.filter((el, index) => i !== index)),
        set,
    }
}

export const infos = writable({})
export const accounts = writable([
    {
        name: "Compte courant",
        start: 345.67,
        real: 456.78,
    },
])
export const cashFlows = createCashFlows()
