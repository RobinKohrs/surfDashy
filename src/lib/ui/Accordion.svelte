<script>
  export let width;
</script>

<div class="accordion {width}">
  <slot />
  <!-- <div class="accordion-item">
    <input
      id="accordion-trigger-1"
      class="accordion-trigger-input"
      type="checkbox"
    />
    <label class="accordion-trigger" for="accordion-trigger-1">
      <slot name="label" />
    </label>
    <section class="accordion-animation-wrapper">
      <div class="accordion-animation">
        <div class="accordion-transform-wrapper">
          <div class="accordion-content">
            <slot name="content" />
          </div>
        </div>
      </div>
    </section>
  </div> -->
</div>

<style>
  /* The accordion functionality */
  :root {
    --transitionLength: 0.3s;
    --transitionTiming: ease;
  }

  :global(.accordion-animation-wrapper) {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows var(--transitionLength)
      var(--transitionTiming);
  }

  :global(.accordion-trigger-input:checked ~ .accordion-animation-wrapper) {
    grid-template-rows: 1fr;
  }

  :global(.accordion-animation) {
    min-height: 0;
  }

  :global(.accordion-transform-wrapper) {
    transform: translateY(-100%);
    /* visibility: hidden; */
    transition:
      transform var(--transitionLength) var(--transitionTiming),
      visibility 0s var(--transitionLength) var(--transitionTiming);
  }

  :global(
      .accordion-trigger-input:checked
        ~ .accordion-animation-wrapper
        .accordion-transform-wrapper
    ) {
    transform: translateY(0);
    visibility: visible;
    transition:
      transform var(--transitionLength) var(--transitionTiming),
      visibility 0s linear;
  }

  /* Margins inside the container will throw animation height calculations off, better use paddings */
  :global(.accordion-content *) {
    /* margin: 2rem; */
    /* padding: 2rem; */
  }

  /* The styles */

  :global(.accordion) {
    min-width: 260px;
    width: 80%;
    margin: 0 auto;
    background: white;
  }

  :global(.accordion-item) {
    border-top: 2px solid #676767;
    border-bottom: 2px solid #676767;
    margin-bottom: -2px;
  }

  :global(.accordion-trigger-input) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  :global(.accordion-trigger) {
    display: block;
    position: relative;
    padding: 16px;
    transition: box-shadow var(--transitionLength) var(--transitionTiming);
    z-index: 1;
    cursor: pointer;
  }

  :global(.accordion-trigger-input:focus-visible ~ .accordion-trigger) {
    outline: 2px solid;
    outline-offset: -2px;
  }

  :global(.accordion-trigger::after) {
    display: block;
    position: absolute;
    right: 16px;
    top: 18px;
    content: "";
    width: 8px;
    height: 8px;
    border: 2px solid #676767;
    border-bottom: transparent;
    border-left: transparent;
    transform: rotate(135deg);
    transition: transform var(--transitionLength) var(--transitionTiming);
  }

  :global(.accordion-trigger-input:checked ~ .accordion-trigger::after) {
    transform: rotate(135deg) rotateX(180deg) rotateY(180deg) translateY(4px)
      translateX(-4px);
  }

  :global(.accordion-trigger-input:checked ~ .accordion-trigger) {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: box-shadow calc(var(--transitionLength) / 4)
      var(--transitionTiming);
  }

  :global(.accordion-content) {
    /* padding: 16px;
    background: #f8f8f8; */
  }
</style>
