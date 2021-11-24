import { Writable, writable } from "svelte/store"

export type CashFlow = {
    date: string, // YYYY-MM-DD
    amount: number,
    account: number,
    event: string,
    nature: string,
    details: string,
    ref: string,
    note: string
}

export type IndexedObjectData<T> = {[key: number]: T}

export type Account = {
    name: string,
    initial_money: number,
    income?: undefined,
    expense?: undefined,
    profit?: undefined
    current_money: number
}

export type IndexedObjectStore<T> = Writable<T> & {
    add: (arg0: T) => void;
    remove: (arg0: number) => void;
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

function createObjectStore<DataType>(template: IndexedObjectData<DataType>) {
    const store: Writable<object> = writable(template)
    return {
        subscribe: store.subscribe,
        update: store.update,
        set: store.set,
        add: (newData) => {
            store.update((data) => {
                let key = 0
                while (data[key] !== undefined) {
                    key++
                }
                data[key] = newData
                return data
            })
        },
        remove: (i: number) => store.update(d => {delete d[i]; return d})
    }
}

export const cashFlows = createObjectStore({
    0: {
        date: "2021-06-18",
        amount: -5.25,
        account: 0,
        event: "Sans event",
        nature: "Fonctionnement hors évènement",
        details: "Frais de gestion de compte",
        ref: "BNP0008",
        note: "",
    }, 1: {
        date: "2021-06-19",
        amount: -3.89,
        account: 0,
        event: "Sans event",
        nature: "Fonctionnement hors évènement",
        details: "Frais de carte de débit",
        ref: "BNP0009",
        note: "",
    }, 2: {
        date: "2021-06-24",
        amount: -41.58,
        account: 0,
        event: "Sans event",
        nature: "Fonctionnement hors évènement",
        details: "Matériel, technique et autres frais",
        ref: "BNP0021",
        note: "Gel hydroalcoolique",
    }, 3: {
        date: "2021-09-17",
        account: 0,
        amount: 100,
        event: "Sans event",
        nature: "Fonctionnement hors évènement",
        details: "Subsides et financements",
        ref: "BNP0023",
        note: "Subsides Q1"
    }
})

export const accounts = createObjectStore({
    0: {
        name: "Compte courant",
        initial_money: 345.67,
        current_money: 456.78
    }
})
