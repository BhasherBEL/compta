<script>
    import { accounts, infos, cashFlows } from "../../store";
    import Icon from "../icon.svelte"
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
            <col style="width: 16%" span="6">
        </colgroup>
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
                <td>{account.start} €</td>
                <td>{$cashFlows.filter(c => c.account === account.name && c.amount > 0).map(c => c.amount).reduce((a, b) => a+b)} €</td>
                <td>{$cashFlows.filter(c => c.account === account.name && c.amount < 0).map(c => c.amount).reduce((a, b) => a+b)} €</td>
                <td>{$cashFlows.filter(c => c.account === account.name).map(c => c.amount).reduce((a, b) => a+b)} €</td>
                <td>{account.real} €</td>
                <td class="grouped gapless">
                    <a id="edit-{i}" href="#edit-{i}"
                       class="button icon-only outline">
                        <Icon icon="pencil"/>
                    </a>
                    <a id="delete-{i}" href="#delete-{i}"
                       class="button icon-only outline">
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
                <input placeholder="836.49" type="number">
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <input placeholder="913.32" type="number">
            </td>
            <td>
                <a class="button icon-only" href="#add" id="add">
                    <Icon icon="plus"/>
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
    margin: 8px 8px 8px 0;
  }
</style>
