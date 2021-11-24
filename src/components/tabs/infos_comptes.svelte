<script lang="ts">
    import { Account, accounts, infos, cashFlows } from "../../store";
    import EditableTable from '../editableTable.svelte'
    import { GenericColumn, formatMoney, sum } from "../../utils"

    const columns: {[key in keyof Account]: GenericColumn<Account>} = {
        name: {
            name: "Nom du compte",
            type: "string",
            nature: "input",
            required: true,
        },
        initial_money: {
            name: "Montant de départ",
            type: "number",
            nature: "input",
            required: true,
            format: formatMoney
        },
        income: {
            name: "Entrée",
            type: "number",
            nature: "computed",
            required: false,
            format: (_, __, id) => {
                return formatMoney(sum(
                    Object
                        .values($cashFlows)
                        .filter(k => k.account == id && k.amount > 0)
                        .map(k => k.amount),
                ))
            }
        },
        expense: {
            name: "Sortie",
            type: "number",
            nature: "computed",
            required: false,
            format: (_, __, id) => formatMoney(sum(
                Object
                    .values($cashFlows)
                    .filter(k => k.account == id && k.amount < 0)
                    .map(k => k.amount)
            ))
        },
        profit: {
            name: "Profit",
            type: "number",
            nature: "computed",
            required: false,
            format: (_, __, id) => formatMoney(sum(
                Object
                    .values($cashFlows)
                    .filter(k => k.account == id)
                    .map(k => k.amount)
            ))
        },
        current_money: {
            name: "Réel sur le compte",
            type: "number",
            nature: "input",
            required: true,
            format: (amount, account, id) => {
                let calculated = sum(
                    Object
                        .values($cashFlows)
                        .filter(k => k.account == id)
                        .map(k => k.amount)
                ) + account.initial_money
                return `<span class="${Math.round(calculated*100) == Math.round(account.current_money*100) ? '' : 'text-error'}">${formatMoney(amount)}</span>`
            }
        },
    }

    function validateDelete(account: Account, id: string): boolean {
        return ! Object.values($cashFlows).some((c) => c.account === id)
    }
</script>

<div class="card">
    <h2>Informations générales</h2>
    <div class=" row">
        <div class="col myform">
            <div>
                <label for="orga">Organisation</label>
                <input bind:value={$infos.orga} id="orga">
            </div>
            <div>
                <label for="address">Adresse</label>
                <input bind:value={$infos.address} id="address">
            </div>
            <div>
                <label for="company">Numéro d'entreprise</label>
                <input bind:value={$infos.company} id="company">
            </div>
            <div>
                <label for="manager">Responsable</label>
                <input bind:value={$infos.manager} id="manager">
            </div>
            <div>
                <label for="email">Adresse mail</label>
                <input bind:value={$infos.email} id="email" type="email">
            </div>
        </div>
        <div class="col myform">
            <div>
                <label for="year">Année académique</label>
                <input bind:value={$infos.year} id="year">
            </div>
            <div>
                <label for="quarter">Quadrimestre</label>
                <input bind:value={$infos.quarter} id="quarter">
            </div>
            <div>
                <label for="date-start">Date début</label>
                <input bind:value={$infos.date_start} id="date-start" type="date">
                <label for="date-end">Date fin</label>
                <input bind:value={$infos.date_end} id="date-end" type="date">
            </div>
        </div>
    </div>
</div>
<br>
<div class="card">
    <h2>Comptes</h2>
    <EditableTable
        dataStore="{accounts}"
        columns="{columns}"
        validateDelete="{validateDelete}"
        colgroup="{[{width: '16%', span: '6'}]}"
    />
</div>

<style>
  .myform > div {
    display: flex;
    align-items: center;
  }

  .myform label {
    text-align: end;
    min-width: 150px;
    margin: 8px 8px 8px 0;
  }
</style>
