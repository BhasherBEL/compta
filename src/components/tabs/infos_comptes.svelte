<script lang="ts">
    import { Account, CashFlow, accounts, infos, cashFlows } from "../../store";
    import Icon from "../icon.svelte"
    import EditableValue from '../editableValue.svelte'
    import { GenericColumn, formatMoney, sum } from "../../utils"

    const columns: {[key: keyof Account]: GenericColumn} = {
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
            format: (_, account) => formatMoney(sum(
                $cashFlows
                    .filter(k => k.account === account.name && k.amount > 0)
                    .map(k => k.amount)
            ))
        },
        expense: {
            name: "Sortie",
            type: "number",
            nature: "computed",
            format: (_, account) => formatMoney(sum(
                $cashFlows
                    .filter(k => k.account === account.name && k.amount < 0)
                    .map(k => k.amount)
            ))
        },
        profit: {
            name: "Profit",
            type: "number",
            nature: "computed",
            format: (_, account) => formatMoney(sum(
                $cashFlows
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

    let newAccount= {};

    function addNewAccount() {
        accounts.update((a) => [...a, newAccount as Account])
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
                <input bind:value={$infos.dates} id="date-start" type="date">
                <label for="date-end">Date fin</label>
                <input bind:value={$infos.dates} id="date-end" type="date">
            </div>
        </div>
    </div>
</div>
<br>
<div class="card">
    <h2>Comptes</h2>
    <table class="striped">
        <colgroup>
            <col style="width: 16%;" span="6">
        </colgroup>
        <tr>
            {#each Object.entries(columns) as [key, item]}
                <th>{item.name}</th>
            {/each}
        </tr>
        {#each $accounts as account, index}
            <tr>
                {#each Object.entries(columns) as [key, item]}
                    <td>
                        {item.format ? item.format(account[key], account) : account[key]}
                    </td>
                {/each}
                <th class="grouped gapless">
                    <button class="button outline icon-only">
                        <Icon icon="pencil"/>
                    </button>
                    <a id="delete-{index}" href="#delete-{index}"
                       class="button outline icon-only"
                       on:click={() => cashFlows.remove(index)}>
                        <Icon icon="close"/>
                    </a>
                </th>
            </tr>
        {/each}
        <tr>
            <form id="account-new" on:submit|preventDefault={addNewAccount}></form>
            {#each Object.entries(columns) as [key, item]}
                <td>
                {#if item.nature === "input"}
                    <EditableValue bind:value={newAccount[key]} type="{item.type}" placeholder="{item.name}" required="{item.required}" form="account-new"/>
                    {:else }
                    <i class="text-grey">Valeur calculée</i>
                    {/if}
                </td>
                {/each}
            <td>
                <label class="button icon-only">
                    <input type="submit" class="is-hidden" form="account-new">
                    <Icon icon="plus"/>
                </label>
            </td>
        </tr>
    </table>
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
