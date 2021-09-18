<script>
    import Icon from "../icon.svelte"
</script>

<div class="card">
    <h2>
        Les différentes vues disponibles
    </h2>
    <h3>
        Infos et comptes
    </h3>
    <p>
        Permet de remplir les informations générales concernant votre
        kot-à-projet ainsi que les différents comptes tenu
        par le projet (compte bancaire courant, caisse, ...).<br>
        Pour chaque compte en banque, il est possible de définir le montant de
        départ ainsi que le montant réel sur
        compte.
        Si le montant réel ne correspond pas au montant calculé après que les
        différents flux d'argent aient été ajouté
        au montant de départ, un avertissement s'affiche.
    </p>
    <h3>
        Flux d'argent
    </h3>
    <p>
        Vous pouvez créer, éditer et supprimer les différentes entrées et
        sorties d'argent dans cet onglet.<br>
        Il vous est demandé de sélectionner un compte sur lequel le flux est
        opéré, compte que vous devrez avoir
        préalablement créé dans l'onglet "Infos et comptes".<br>
        Des évènements et natures personnalisés peuvent être encodés directement
        et seront ensuite suggérés lors des
        prochaines créations de flux.
        Les autres champs sont totalement libres.
    </p>
    <h3>
        Bilans détaillés
    </h3>
    <p>
        Vous pouvez consulter les bilans de vos comptes par évènements et par
        nature, présenté de la même façon que dans l'Excel de trésorerie. <br>
        Vous pouvez également utiliser le bouton
        <Icon icon="clipboard"/> afin de pouvoir facilement copier les tableaux
        dans l'Excel de Bilan.
    </p>
</div>
