import { saveAs } from "file-saver"
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

export function importFile(f: Event){
    (f.target as HTMLInputElement).files[0].text().then(importJSON)
}

export function exportFile(){
    const data = exportJSON()
    const blob = new Blob([data], {type: "application/json"})
    const infosObj = get(infos)
    saveAs(blob, `Trésorerie_${infosObj.orga || "KAP"}_${infosObj.year || "ANNEE"}_${infosObj.quarter || "QUADRI"}.json`)
}
