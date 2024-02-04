<script>
  import Accordion from "$lib/ui/Accordion.svelte";
  import AccordionHeader from "$lib/ui/AccordionHeader.svelte";
  import AccordionContent from "../../lib/ui/AccordionContent.svelte";
</script>

<Accordion width={"feature"}>
  <div class="accordion-item">
    <AccordionHeader header={"Default Location"} />
    <AccordionContent>Some Content soon...</AccordionContent>
  </div>
</Accordion>
