import {links} from "./links";
import type {Language} from "./language";

export const textFR: Language = {
    lang: "fr",
    tooltips: {
        add_line: "Ajouter une ligne",
        clipboard: "Copier dans le presse-papier",
        delete_line: "Supprimer la ligne",
        edit_line: "Éditer la ligne",
        lang_en: "Changer les textes et formats en ANGLAIS",
        lang_fr: "Changer les textes et formats en FRANÇAIS",
        open_file: "Restaurer une sauvegarde",
        safe_delete: (isLocked: boolean) => (isLocked ? 'Débloquer' : 'Bloquer') + " la suppression",
        scale_balance: (isExpanded: boolean) => (isExpanded ? "Réduire" : "Étendre") + " les détails du bilan",
        save_file: "Sauvegarder les modifications",
    },
    infos: {
        address: "Adresse",
        company: "Numéro d'entreprise",
        date_end: "Date fin",
        date_start: "Date début",
        email: "Adresse mail",
        gen_info: "Informations générales",
        manager: "Responsable",
        orga: "Organisation",
        quarter: "Quadrimestre",
        year: "Année académique",
    },
    account: "Compte",
    account_name: "Nom du compte",
    accounts: "Comptes",
    amount: "Montant",
    and: "et",
    calc_val: "Valeur calculée",
    cash_flow: "Flux d'argent",
    category: "Catégorie",
    current_money: "Réel sur le compte",
    date: "Date",
    detail_balances: "Bilans détaillés",
    details: "Détails",
    diff_of: "écart de",
    event: "Évènement",
    events_balance: "Bilan par évènements",
    expense: "Sortie",
    help: "Aide",
    income: "Entrée",
    info: "Infos",
    initial_money: "Montant de départ",
    nature: "Nature",
    natures_balance: "Bilan par natures",
    note: "Remarque",
    profit: "Profit",
    ref: "Référence",
    total: "Total général",
    total_all: "Grand total",
    footer: {
        created_by: "Créé par le",
        see_source_code: "Voir le code source",
        abstract: "Outil de gestion de trésorerie destiné aux KAP's",
        version: "Version",
        see_release_notes: "Voir les notes de mise à jour"
    },
    help_section: {
        lang_description: "",
        tabs_description: "Les différents onglets disponibles",
        infos_accounts: "",
        cash_flow: "",
        detail_balances1: "",
        detail_balances2: "",
        detail_balances3: "",
        need_help: "",
    },
}

textFR.help_section.lang_description = `
    <h3>
        Les différentes langues disponibles
    </h3>
    <p>
        Cette application est disponible en deux langues: Anglais et Français. <br>
        Chaque langue peut être choisie en cliquant sur le drapeau correspondant. <br>
        Lorsque vous changer de langue, le format des différents nombres changeront en fonction de la langue choisie.
    </p>
`

textFR.help_section.infos_accounts = `
    <h4>
        ${textFR.help} ${textFR.and} ${textFR.accounts}
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
`

textFR.help_section.cash_flow = `
    <h4>
        ${textFR.cash_flow}
    </h4>
    <p>
        Vous pouvez créer, éditer et supprimer les différentes entrées et
        sorties d'argent dans cet onglet.<br>
        Il vous est demandé de sélectionner un compte sur lequel le flux est
        opéré, compte que vous devrez avoir
        préalablement créé dans l'onglet "${textFR.help} ${textFR.and} ${textFR.accounts}".<br>
        Des évènements et natures personnalisés peuvent être encodés directement
        et seront ensuite suggérés lors des
        prochaines créations de flux.
        Les autres champs sont totalement libres.
    </p>
`

textFR.help_section.detail_balances1 = `
    <h4>
        ${textFR.detail_balances}
    </h4>
        Vous pouvez consulter les bilans de vos comptes par évènements et par
        nature, présenté de la même façon que dans l'Excel de trésorerie. <br>
        Vous pouvez également utiliser le bouton `
textFR.help_section.detail_balances2 = ` pour étendre/réduire les détails du Bilan ainsi que le bouton `
textFR.help_section.detail_balances3 = ` afin de pouvoir facilement copier les tableaux (étendus ou non)
        dans l'Excel de Bilan.`

textFR.help_section.need_help = `
    <h3>
        Besoin d'aide ?
    </h3>
    <p>
        En cas de bug ou soucis technique rencontré durant l'utilisation de
        cette application, n'hésitez pas à contacter le Louvain-li-Nux,
        par <a href="${links.mail}" target="_blank">mail</a>,
        sur <a href="${links.facebook}" target="_blank">Facebook</a>
        ou par <a href="${links.discord}" target="_blank">Discord</a>.
    </p>
`
