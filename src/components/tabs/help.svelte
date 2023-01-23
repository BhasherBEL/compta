<script>
    import Icon from "../icon.svelte"
</script>

<div class="card">
    <h3>
        Les différents onglets disponibles
    </h3>
    <h4>
        Infos et comptes
    </h4>
    <p>
        Cet onglet permet de remplir les informations générales concernant votre
        kot-à-projet ainsi que les différents comptes tenus
        par le projet (compte courant, épargne, caisse, ...).<br>
        Pour chaque compte en banque, il est possible de définir le montant de
        départ ainsi que le montant réel sur compte.<br>
        Si le montant réel ne correspond pas au montant calculé après que les
        différents flux d'argent aient été ajouté au montant de départ,
        un avertissement s'affiche.
    </p>
    <h4>
        Flux d'argent
    </h4>
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
    <h4>
        Bilans détaillés
    </h4>
    <p>
        Vous pouvez consulter les bilans de vos comptes par évènements et par
        nature, présenté de la même façon que dans l'Excel de trésorerie. <br>
        Vous pouvez également utiliser le bouton
        <Icon title="copier dans le presse-papier" icon="clipboard"/> afin de pouvoir facilement copier les tableaux
        dans l'Excel de Bilan.
    </p>
    <h3>
        Besoin d'aide ?
    </h3>
    <p>
        En cas de bug ou soucis technique rencontré durant l'utilisation de
        cette application, n'hésitez pas à contacter le Louvain-li-Nux,
        par <a href="mailto:info@louvainlinux.org">mail</a>,
        sur <a href="https://www.facebook.com/LouvainliNuxKap">Facebook</a>
        ou par <a href="https://discord.gg/JFRT2f3pEV">Discord</a>.
    </p>
</div>
