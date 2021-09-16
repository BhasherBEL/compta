<script>
    import BilanTable from "../BilanTable.svelte";
    import {cashFlows} from "../../store";
    import {unique} from "../../utils";

    function convertCashFlows(data) {
        let dict = {}
        console.log(data)
        for (let item of data){
            if (!dict[item.details]){
                dict[item.details] = [0,0]
            }
            if (item.amount > 0){
                dict[item.details][1] -= item.amount
            } else {
                dict[item.details][0] += item.amount
            }
        }
        return dict
    }

    function generateByEvent(data) {
        let events = data.map(n => n.event).filter(unique)
        let natures = data.map(n => n.nature).filter(unique)
        let dict = {}
        for (let event of events){
            for (let nature of natures){
                dict[event] = {}
                dict[event][nature] = convertCashFlows(data.filter(n => (n.event === event && n.nature === nature)))
            }
        }
        return dict
    }
    function generateByNature(data) {
        let natures = data.map(n => n.nature).filter(unique)
        let dict = {}
        for (let nature of natures){
            dict[nature] = convertCashFlows(data.filter(n => (n.nature === nature)))
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