import {links} from "./links";
import type {Language} from "./language";

export const textEN: Language = {
    lang: "en",
    tooltips: {
        add_line: "Add a row",
        clipboard: "Copy to clipboard",
        delete_line: "Delete the row",
        edit_line: "Edit the row",
        lang_en: "Change text and formats to ENGLISH",
        lang_fr: "Change texts and formats to FRENCH",
        open_file: "Restore a backup",
        safe_delete: (isLocked: boolean) => (isLocked ? 'Unblock' : 'Block') + " the removal",
        scale_balance: (isExpanded: boolean) => (isExpanded ? "Collapse" : "Expand") + " balance sheet details",
        save_file: "Save changes",
    },
    infos: {
        address: "Address",
        company: "Business Number",
        date_end: "End date",
        date_start: "Start date",
        email: "Email address",
        gen_info: "Background information",
        manager: "Manager",
        orga: "Organization",
        quarter: "Semester",
        year: "Academic year",
    },
    account: "Account",
    account_name: "Account name",
    accounts: "Accounts",
    amount: "Amount",
    and: "and",
    calc_val: "Calculated value",
    cash_flow: "Cash Flow",
    category: "Category",
    current_money: "Actual on account",
    date: "Date",
    detail_balances: "Detailed balance sheets",
    details: "Details",
    diff_of: "difference of",
    event: "Event",
    events_balance: "Balance sheet by Events",
    expense: "Expense",
    help: "Help",
    income: "Income",
    info: "Infos",
    initial_money: "Starting amount",
    nature: "Nature",
    natures_balance: "Balance sheet by Natures",
    note: "Note",
    profit: "Benefit",
    ref: "Reference",
    total: "Grand total",
    total_all: "Overall total",
    footer: {
        created_by: "Created by the",
        see_source_code: "See the source code",
        abstract: "KAP’s Cash Management Tool",
        version: "Version",
        see_release_notes: "See Release Notes"
    },
    help_section: {
        lang_description: "",
        tabs_description: "The different tabs available",
        infos_accounts: "",
        cash_flow: "",
        detail_balances1: "",
        detail_balances2: "",
        detail_balances3: "",
        need_help: "",
    },
}

textEN.help_section.lang_description = `
    <h3>
        The different languages available
    </h3>
    <p>
        This application is available in two languages: English and French. <br>
        Each language can be chosen by clicking on the corresponding flag. <br>
        When you change language, the format of the different numbers will change depending on the language chosen.
    </p>
`

textEN.help_section.infos_accounts = `
    <h4>
        ${textEN.help} ${textEN.and} ${textEN.accounts}
    </h4>
    <p>
        This tab allows you to fill in the general information concerning your
        kot-à-projet as well as the various accounts maintained
        by the project (current account, savings, cash, ...).<br>
        For each bank account, it is possible to define the starting amount
        as well as the actual amount on the account. <br>
        If the actual amount does not match the amount calculated after the
        different cash flows have been added to the original amount,
        a warning is displayed.
    </p>
`

textEN.help_section.cash_flow = `
    <h4>
        ${textEN.cash_flow}
    </h4>
    <p>
        You can create, edit and delete the different entries
        and entries in this tab.<br>
        You are asked to select an account on which the flow is
        made, an account that you must have
        previously created in the "${textEN.help} ${textEN.and} ${textEN.accounts}" tab.<br>
        Custom events and natures can be encoded directly
        and will then be suggested
        in future stream creations.
        The other fields are completely free.
    </p>
`

textEN.help_section.detail_balances1 = `
    <h4>
        ${textEN.detail_balances}
    </h4>
        You can consult the balance sheets of your accounts by events and by
        nature, presented in the same way as in the Treasury Excel. <br>
        You can also use the `
textEN.help_section.detail_balances2 = ` button to expand/collapse the Balance Sheet details as well as the `
textEN.help_section.detail_balances3 = ` button so that you can easily copy the tables (extended or not)
        in the Excel Balance Sheet.
`

textEN.help_section.need_help = `
    <h3>
        Need some help ?
    </h3>
    <p>
        In case of technical problems or bugs encountered during the use of
        this application, do not hesitate to contact the Louvain-li-Nux,
        by <a href="${links.mail}" target="_blank">email</a>,
        on <a href="${links.facebook}" target="_blank">Facebook</a>
        or on <a href="${links.discord}" target="_blank">Discord</a>.
    </p>
`
