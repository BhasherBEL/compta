import { Writable, writable } from "svelte/store"

export type IndexedObjectData<T> = {[key: string]: T}

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

export type IndexedObjectStore<T> = Writable<T> & {
    add: (arg0: T) => void;
    remove: (arg0: string) => void;
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
    const store = writable(template)
    return {
        subscribe: store.subscribe,
        update: store.update,
        set: store.set,
        add: (newData: DataType) => {
            store.update((data) => {
                let key = 0
                while (data[key] !== undefined) {
                    key++
                }
                data[key] = newData
                return data
            })
        },
        remove: (i: string) => store.update(d => {delete d[i]; return d})
    }
}

function createCashFlowStore(template: IndexedObjectData<CashFlow>) {
    const store = writable(template)
    return {
        subscribe: store.subscribe,
        update: store.update,
        set: store.set,
        add: (newData: CashFlow) => {
            store.update((data) => {
                const sortedData: IndexedObjectData<CashFlow> = {};
                const keys = [0, 0];
                let flagIsNotAdded = true;
                while (data[keys[0]] !== undefined) {
                    if (newData.date < data[keys[0]].date && flagIsNotAdded) {
                        sortedData[keys[1]] = newData;
                        flagIsNotAdded = false;
                    } else {
                        sortedData[keys[1]] = data[keys[0]];
                        keys[0]++;
                    }
                    keys[1]++;
                }
                if (flagIsNotAdded) { sortedData[keys[1]] = newData; }
                return sortedData;
            })
        },
        remove: (i: string) => {
            let removeData;
            store.update(d => {
                const resultData: IndexedObjectData<CashFlow> = {};
                const index: number = +i;
                removeData = d[i];
                const keys = [0, 0];
                while (d[keys[0]] !== undefined) {
                    if (keys[0] === index) {
                        keys[0]++;
                    }
                    else {
                        resultData[keys[1]] = d[keys[0]];
                        keys[0]++; keys[1]++;
                    }
                }
                return resultData;
            })
            return removeData;
        }
    }
}

export const cashFlows = createCashFlowStore({
    0: {
        date: "2021-06-18",
        amount: -5.25,
        account: "0",
        event: "Sans event",
        nature: "Fonctionnement hors évènement",
        details: "Frais de gestion de compte",
        ref: "BNP0008",
        note: "",
    }, 1: {
        date: "2021-06-19",
        amount: -3.89,
        account: "0",
        event: "Sans event",
        nature: "Fonctionnement hors évènement",
        details: "Frais de carte de débit",
        ref: "BNP0009",
        note: "",
    }, 2: {
        date: "2021-06-24",
        amount: -41.58,
        account: "0",
        event: "Sans event",
        nature: "Fonctionnement hors évènement",
        details: "Matériel, technique et autres frais",
        ref: "BNP0021",
        note: "Gel hydroalcoolique",
    }, 3: {
        date: "2021-09-17",
        account: "0",
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
