<script lang="ts">
    import { Account, accounts, infos, cashFlows } from "../../store";
    import EditableTable from '../editableTable.svelte'
    import {GenericColumn, formatMoney, sum, picker} from "../../utils"
    import { textFR as text } from "../../lang/textFR";

    const totalRow: {[key in keyof Account]: GenericColumn<Account>} = {
        name: {
            name: "Total",
            type: "string",
            required: true,
        },
        initial_money: {
            name: text.initial_money,
            type: "number",
            required: false,
            compute: (_, __, ___) => (
                sum(
                    Object
                        .values($accounts)
                        .map(a => a.initial_money)
                )
            ),
            format: formatMoney
        },
        income: {
            name: text.income,
            type: "number",
            required: false,
            compute: (_, __, ___) => (
                sum(
                    Object
                        .values($cashFlows)
                        .filter(k => k.amount > 0)
                        .map(k => k.amount)
                )
            ),
            format: formatMoney
        },
        expense: {
            name: text.expense,
            type: "number",
            required: false,
            compute: (_, __, ___) => (
                sum(
                    Object
                        .values($cashFlows)
                        .filter(k => k.amount < 0)
                        .map(k => k.amount)
                )
            ),
            format: formatMoney
        },
        profit: {
            name: text.profit,
            type: "number",
            required: false,
            compute: (_, __, ___) => (
                sum(
                    Object
                        .values($cashFlows)
                        .map(k => k.amount)
                )
            ),
            format: (amount, __, _) => {
                return `<span
                            style="background-color: ${picker(amount, '#dfffdf', '#fed4d4')}"
                            class="${picker(amount, 'text-success', 'text-error')}">
                            ${formatMoney(amount)}
                        </span>`;
            }
        },
        current_money: {
            name: text.current_money,
            type: "number",
            required: false,
            compute: (_, __, ___) => (
                sum(
                    Object
                        .values($accounts)
                        .map(a => a.current_money)
                )
            ),
            format: (amount, __, _) => {
                let all_initial_money = sum(Object.values($accounts).map(a => a.initial_money))
                let calculated = sum(
                    Object
                        .values($cashFlows)
                        .map(k => k.amount)
                ) + all_initial_money
                let okay = Math.round(calculated*100) == Math.round(amount*100)
                return `<span class="${okay ? '' : 'text-error'}">${formatMoney(amount)} ${okay ? '' : `(${text.diff_of} ${formatMoney(calculated - amount)})`}</span>`
            }
        },
    }

    const columns: {[key in keyof Account]: GenericColumn<Account>} = {
        name: {
            name: text.account_name,
            type: "string",
            required: true,
        },
        initial_money: {
            name: text.initial_money,
            type: "number",
            required: true,
            format: formatMoney
        },
        income: {
            name: text.income,
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
            name: text.expense,
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
            name: text.profit,
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
            name: text.current_money,
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
                return `<span class="${okay ? '' : 'text-error'}">${formatMoney(amount)} ${okay ? '' : `(${text.diff_of} ${formatMoney(calculated - account.current_money)})`}</span>`
            }
        },
    }

    function validateDelete(_: Account, id: string): boolean {
        return ! Object.values($cashFlows).some((c) => c.account === id)
    }
</script>

<div class="card">
    <h2>{text.infos.gen_info}</h2>
    <div class=" row">
        <div class="col myform">
            <div>
                <label for="orga">{text.infos.orga}</label>
                <input bind:value={$infos.orga} id="orga"/>
            </div>
            <div>
                <label for="address">{text.infos.address}</label>
                <input bind:value={$infos.address} id="address"/>
            </div>
            <div>
                <label for="company">{text.infos.company}</label>
                <input bind:value={$infos.company} id="company"/>
            </div>
            <div>
                <label for="manager">{text.infos.manager}</label>
                <input bind:value={$infos.manager} id="manager"/>
            </div>
            <div>
                <label for="email">{text.infos.email}</label>
                <input bind:value={$infos.email} id="email" type="email"/>
            </div>
        </div>
        <div class="col myform">
            <div>
                <label for="year">{text.infos.year}</label>
                <input bind:value={$infos.year} id="year"/>
            </div>
            <div>
                <label for="quarter">{text.infos.quarter}</label>
                <input bind:value={$infos.quarter} id="quarter"/>
            </div>
            <div>
                <label for="date-start">{text.infos.date_start}</label>
                <input bind:value={$infos.date_start} id="date-start" type="date"/>
                <label for="date-end">{text.infos.date_end}</label>
                <input bind:value={$infos.date_end} id="date-end" type="date"/>
            </div>
        </div>
    </div>
</div>
<br>
<div class="card">
    <EditableTable
        tableName="{text.accounts}"
        dataStore="{accounts}"
        columns="{columns}"
        totalRow="{totalRow}"
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
