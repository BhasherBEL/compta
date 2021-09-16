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
                <label>Adresse</label>
                <input bind:value={$infos.address}>
            </div>
            <div>
                <label>Numéro d'entreprise</label>
                <input bind:value={$infos.company}>
            </div>
            <div>
                <label>Responsable</label>
                <input bind:value={$infos.manager}>
            </div>
            <div>
                <label>Adresse mail</label>
                <input type="email" bind:value={$infos.email}>
            </div>
        </div>
        <div class="col myform">
            <div>
                <label>Année académique</label>
                <input bind:value={$infos.year}>
            </div>
            <div>
                <label>Quadrimestre</label>
                <input bind:value={$infos.quarter}>
            </div>
            <div>
                <label>Date début</label>
                <input type="date" bind:value={$infos.dates}>
                <label>Date fin</label>
                <input type="date" bind:value={$infos.dates}>
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
        {#each $accounts as account}
        <tr>
            <td>{account.name}</td>
            <td>{account.start}</td>
            <td>{account.profit}</td>
            <td>{account.loss}</td>
            <td>{account.net}</td>
            <td>{account.real}</td>
            <td class="grouped gapless">
                <a class="button icon-only outline">
                    <Icon icon="pencil" size="16"/>
                </a>
                <a class="button icon-only outline">
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
                <a class="button icon-only">
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