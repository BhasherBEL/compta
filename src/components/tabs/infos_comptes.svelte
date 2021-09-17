<script>
    import {infos, accounts} from "../../store";
    import Icon from "../icon.svelte"
</script>

<div class="card">
    <h2>Informations générales</h2>
    <div class=" row">
        <div class="col myform">
            <div>
                <label for="orga">Organisation</label>
                <input id="orga" bind:value={$infos.orga}>
            </div>
            <div>
                <label for="address">Adresse</label>
                <input id="address" bind:value={$infos.address}>
            </div>
            <div>
                <label for="company">Numéro d'entreprise</label>
                <input id="company" bind:value={$infos.company}>
            </div>
            <div>
                <label for="manager">Responsable</label>
                <input id="manager" bind:value={$infos.manager}>
            </div>
            <div>
                <label for="email">Adresse mail</label>
                <input id="email" type="email" bind:value={$infos.email}>
            </div>
        </div>
        <div class="col myform">
            <div>
                <label for="year">Année académique</label>
                <input id="year" bind:value={$infos.year}>
            </div>
            <div>
                <label for="quarter">Quadrimestre</label>
                <input id="quarter" bind:value={$infos.quarter}>
            </div>
            <div>
                <label for="date-start">Date début</label>
                <input id="date-start" type="date" bind:value={$infos.dates}>
                <label for="date-end">Date fin</label>
                <input id="date-end" type="date" bind:value={$infos.dates}>
            </div>
        </div>
    </div>
</div>
<br>
<div class="card">
    <h2>Comptes</h2>
    <table class="striped">
        <tr>
            <th>Nom du compte</th>
            <th>Montant de départ</th>
            <th>Entrée</th>
            <th>Sortie</th>
            <th>Profit</th>
            <th>Réel sur le compte</th>
        </tr>
        {#each $accounts as account, i}
        <tr>
            <td>{account.name}</td>
            <td>{account.start}</td>
            <td>{account.profit}</td>
            <td>{account.loss}</td>
            <td>{account.net}</td>
            <td>{account.real}</td>
            <td class="grouped gapless">
                <a id="edit-{i}" href="#edit-{i}" class="button icon-only outline">
                    <Icon icon="pencil" size="16"/>
                </a>
                <a id="delete-{i}" href="#delete-{i}" class="button icon-only outline">
                    <Icon icon="x"/>
                </a>
            </td>
        </tr>
        {/each}
        <tr>
            <td>
                <input placeholder="Compte courant">
            </td>
            <td>
                <input type="number" placeholder="836.49">
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <input type="number" placeholder="913.32">
            </td>
            <td>
                <a id="add" href="#add" class="button icon-only">
                    <Icon icon="plus" size="16"/>
                </a>
            </td>
        </tr>
    </table>
</div>

<style>
    .myform > div {
        display: flex;
        align-items: center;
    }
    label {
        text-align: end;
        min-width: 150px;
        margin: 8px 8px 8px 0
    }
</style>
