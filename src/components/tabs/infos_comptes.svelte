<script lang="ts">
    import { Account, accounts, infos, cashFlows } from "../../store";
    import EditableTable from '../editableTable.svelte'
    import { GenericColumn, formatMoney, sum } from "../../utils"

    const columns: {[key in keyof Account]: GenericColumn<Account>} = {
        name: {
            name: "Nom du compte",
            type: "string",
            required: true,
        },
        initial_money: {
            name: "Montant de départ",
            type: "number",
            required: true,
            format: formatMoney
        },
        income: {
            name: "Entrée",
            type: "number",
            required: false,
            compute: (_, __, id) => (
                sum(
                    Object
                        .values($cashFlows)
                        .filter(k => k.account == id && k.amount > 0)
                        .map(k => k.amount),
                )
            ),
            format: formatMoney
        },
        expense: {
            name: "Sortie",
            type: "number",
            required: false,
            compute: (_, __, id) => sum(
                Object
                    .values($cashFlows)
                    .filter(k => k.account == id && k.amount < 0)
                    .map(k => k.amount)
            ),
            format: formatMoney
        },
        profit: {
            name: "Profit",
            type: "number",
            required: false,
            compute: (_, __, id) => sum(
                Object
                    .values($cashFlows)
                    .filter(k => k.account == id)
                    .map(k => k.amount)
            ),
            format: formatMoney
        },
        current_money: {
            name: "Réel sur le compte",
            type: "number",
            required: true,
            format: (amount, account, id) => {
                let calculated = sum(
                    Object
                        .values($cashFlows)
                        .filter(k => k.account == id)
                        .map(k => k.amount)
                ) + account.initial_money
                let okay = Math.round(calculated*100) == Math.round(account.current_money*100)
                return `<span class="${okay ? '' : 'text-error'}">${formatMoney(amount)} ${okay ? '' : `(écart de ${formatMoney(calculated - account.current_money)})`}</span>`
            }
        },
    }

    function validateDelete(_: Account, id: string): boolean {
        return ! Object.values($cashFlows).some((c) => c.account === id)
    }
</script>

<div class="card">
    <h2>Informations générales</h2>
    <div class=" row">
        <div class="col myform">
            <div>
                <label for="orga">Organisation</label>
                <input bind:value={$infos.orga} id="orga"/>
            </div>
            <div>
                <label for="address">Adresse</label>
                <input bind:value={$infos.address} id="address"/>
            </div>
            <div>
                <label for="company">Numéro d'entreprise</label>
                <input bind:value={$infos.company} id="company"/>
            </div>
            <div>
                <label for="manager">Responsable</label>
                <input bind:value={$infos.manager} id="manager"/>
            </div>
            <div>
                <label for="email">Adresse mail</label>
                <input bind:value={$infos.email} id="email" type="email"/>
            </div>
        </div>
        <div class="col myform">
            <div>
                <label for="year">Année académique</label>
                <input bind:value={$infos.year} id="year"/>
            </div>
            <div>
                <label for="quarter">Quadrimestre</label>
                <input bind:value={$infos.quarter} id="quarter"/>
            </div>
            <div>
                <label for="date-start">Date début</label>
                <input bind:value={$infos.date_start} id="date-start" type="date"/>
                <label for="date-end">Date fin</label>
                <input bind:value={$infos.date_end} id="date-end" type="date"/>
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
