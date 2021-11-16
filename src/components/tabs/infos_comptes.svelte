<script lang="ts">
    import { Account, accounts, infos, cashFlows } from "../../store";
    import EditableTable from '../editableTable.svelte'
    import { GenericColumn, formatMoney, sum } from "../../utils"

    const columns: {[key in keyof Account]: GenericColumn} = {
        id: {
            name: "ID",
            type: "string",
            nature: "computed",
            required: false,
            format: (_, __, id) => id
        },
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
            format: (_, account) => formatMoney(sum(
                Object
                    .values($cashFlows)
                    .filter(k => k.account === account.name && k.amount > 0)
                    .map(k => k.amount)
            ))
        },
        expense: {
            name: "Sortie",
            type: "number",
            nature: "computed",
            required: false,
            format: (_, account) => formatMoney(sum(
                Object
                    .values($cashFlows)
                    .filter(k => k.account === account.name && k.amount < 0)
                    .map(k => k.amount)
            ))
        },
        profit: {
            name: "Profit",
            type: "number",
            nature: "computed",
            required: false,
            format: (_, account) => formatMoney(sum(
                Object
                    .values($cashFlows)
                    .filter(k => k.account === account.name)
                    .map(k => k.amount)
            ))
        },
        current_money: {
            name: "Réel sur le compte",
            type: "number",
            nature: "input",
            required: true,
            format: formatMoney
        },
    }

    let accountsBeingEdited: number[] = []
    let newAccount= {};


    function toggleEditable(index: number) {
        if (accountsBeingEdited.includes(index)) {
            accountsBeingEdited = accountsBeingEdited.filter((v, _) => v
                !== index)
        } else {
            accountsBeingEdited = [ ...accountsBeingEdited, index ]
        }
    }

    function validateAccount(data: Object): boolean {
        for (let k in columns){
            if (columns[k].required && (data[k] === undefined || data[k] === "")){
                return false
            }
        }
        return true
    }

    function addNewAccount() {
        let key = 0
        while ($accounts[key] !== undefined) {
            key++
        }
        accounts.update((a) => {a[key] = newAccount as Account; return a})
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
            validateChange="{validateAccount}"
            colgroup="{[{width: '5%', span: '1'}, {width: '14%', span: '6'}]}"
    />
<!--    <table class="striped">-->
<!--        <colgroup>-->
<!--            <col style="width: 16%;" span="6">-->
<!--        </colgroup>-->
<!--        <tr>-->
<!--            {#each Object.entries(columns) as [_, item]}-->
<!--                <th>{item.name}</th>-->
<!--            {/each}-->
<!--        </tr>-->
<!--        {#each Object.entries($accounts) as [key, account]}-->
<!--            <tr>-->
<!--                {#each Object.entries(columns) as [prop, item]}-->
<!--                    <td>-->
<!--                        {item.format ? item.format(account[prop], account) : account[prop]}-->
<!--                    </td>-->
<!--                {/each}-->
<!--                <th class="grouped gapless">-->
<!--                    <button class="button outline icon-only"-->
<!--                        on:click={() => {}}>-->
<!--                        <Icon icon="pencil"/>-->
<!--                    </button>-->
<!--                    <button class="button outline icon-only"-->
<!--                       on:click={() => {}}>-->
<!--                        <Icon icon="close"/>-->
<!--                    </button>-->
<!--                </th>-->
<!--            </tr>-->
<!--        {/each}-->
<!--        <tr>-->
<!--            <form id="account-new" on:submit|preventDefault={addNewAccount}></form>-->
<!--            {#each Object.entries(columns) as [key, item]}-->
<!--                <td>-->
<!--                {#if item.nature === "input"}-->
<!--                    <EditableValue bind:value={newAccount[key]} type="{item.type}" placeholder="{item.name}" required="{item.required}" form="account-new"/>-->
<!--                    {:else }-->
<!--                    <i class="text-grey">Valeur calculée</i>-->
<!--                    {/if}-->
<!--                </td>-->
<!--                {/each}-->
<!--            <td>-->
<!--                <label class="button icon-only">-->
<!--                    <input type="submit" class="is-hidden" form="account-new">-->
<!--                    <Icon icon="plus"/>-->
<!--                </label>-->
<!--            </td>-->
<!--        </tr>-->
<!--    </table>-->
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
