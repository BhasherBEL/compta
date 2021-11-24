<script lang="ts">
    import BilanTable from "../BilanTable.svelte";
    import { cashFlows, CashFlow, IndexedObjectData } from "../../store";
    import { unique } from "../../utils";

    function convertCashFlows(data: CashFlow[]) {
        let dict = {}
        for (let item of data) {
            if (!dict[item.details]) {
                dict[item.details] = {expense: 0, income: 0 }
            }
            if (item.amount > 0){
                dict[item.details].income += item.amount
            } else {
                dict[item.details].expense += item.amount
            }
        }
        return dict
    }

    function generateByEvent(data: IndexedObjectData<CashFlow>): Object {
        const events = Object.values(data).map(n => n.event).filter(unique)
        let dict = {}
        for (let event of events) {
            const natures = Object.values(data).filter(n => n.event === event).map(n => n.nature).filter(unique)
            dict[event] = {}
            for (let nature of natures) {
                dict[event][nature] = convertCashFlows(Object.values(data).filter(n => (
                    n.event === event && n.nature === nature
                )))
            }
        }
        console.log(dict)
        return dict
    }

    function generateByNature(data: IndexedObjectData<CashFlow>) {
        let natures = Object.values(data).map(n => n.nature).filter(unique)
        let dict = {}
        for (let nature of natures) {
            dict[nature] = convertCashFlows(Object.values(data).filter(n => (
                n.nature === nature
            )))
        }
        return dict
    }
</script>
<div class="row">
    <div class="col card">
        <h3 class="text-center">Bilan par évènements</h3>
        <BilanTable data={generateByEvent($cashFlows)}/>
    </div>
    <div class="col card">
        <h3 class="text-center">Bilan par natures</h3>
        <BilanTable data={generateByNature($cashFlows)}/>
    </div>
</div>
