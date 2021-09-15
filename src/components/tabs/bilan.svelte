<script>
    import BilanTable from "../BilanTable.svelte";
    import {cashFlows} from "../../store";

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function generateByNature(data) {
        let events = data.map(n => n.event).filter(onlyUnique)
        let natures = data.map(n => n.nature).filter(onlyUnique)
        //TODO
    }
    $: byNature = generateByNature(cashFlows)
</script>
<div class="row">
    <div class="col card">
        <h3 class="text-center">Bilan par évènements</h3>
        <BilanTable/>
    </div>
    <div class="col card">
        <h3 class="text-center">Bilan par natures</h3>
        <BilanTable/>
    </div>
</div>