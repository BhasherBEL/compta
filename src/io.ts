import { get } from "svelte/store"
import { accounts, cashFlows, infos } from "./store"

export function importJSON(text: string) {
    const data = JSON.parse(text)
    infos.set(data.infos)
    cashFlows.set(data.cashFlows)
    accounts.set(data.accounts)
}

export function exportJSON(): string {
    return JSON.stringify({
        infos: get(infos),
        cashFlows: get(cashFlows),
        accounts: get(accounts),
    })
}
