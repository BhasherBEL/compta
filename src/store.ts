import {writable} from 'svelte/store'

type CashFlow = {
    date: string, // YYYY-MM-DD
    amount: number,
    account: string,
    event: string,
    type: string,
    details: string,
    ref: string,
    note: string
}

function createCashFlows() {
    const {subscribe, update} = writable([
        {
            date: "2021-06-18",
            amount: -5.25,
            account: "Compte courant",
            event: "Sans event",
            type: "Fonctionnement hors évènement",
            details: "Frais de gestion de compte",
            ref: "BNP0008",
            note: ""
        },
        {
            date: "2021-06-19",
            amount: -3.89,
            account: "Compte courant",
            event: "Sans event",
            type: "Fonctionnement hors évènement",
            details: "Frais de carte de débit",
            ref: "BNP0008",
            note: ""
        },
        {
            date: "2021-06-24",
            amount: -41.58,
            account: "Compte courant",
            event: "Sans event",
            type: "Fonctionnement hors évènement",
            details: "Matériel, technique et autres frais",
            ref: "BNP0021",
            note: "Gel hydroalcoolique"
        }
    ])
    return {
        subscribe,
        push: (elem) => update((c) => [...c, elem]),
        remove: (i) => update(c => c.filter((el, index) => i !== index))
    }
}

export const cashFlows = createCashFlows()