export default class Display {
    constructor(root) {
        this.new_arr_dup = undefined;
        this.sort = undefined;
        this.handle_buttons(document.getElementById("button_panel"));
    }

    update(sorter) {
        sorter.render_arr();
    }

    handle_buttons(root) {
        root.innerHTML = `
        <button id='button_new_dup' class='btn'>New Data (Dup)</button>
        <button id='button_new_no_dup' class='btn'>New Data (No Dup)</button>
        <button id='quicksort_hoare' class='btn_sort'>Quicksort (Hoare)</button>
        <button id='quicksort_hoare_async' class='btn_sort'>Quicksort (Hoare + async)</button>
        <button id='quicksort_lomuto' class='btn_sort'>Quicksort (Lomuto)</button>
        <button id='quicksort_lomuto_async' class='btn_sort'>Quicksort (Lomuto + async)</button>
        <button id='mergesort' class='btn_sort'>Merge Sort</button>
        <button id='mergesort_async' class='btn_sort'>Merge Sort (async)</button>
        <button id='mergesort_place' class='btn_sort'>Merge Sort (In Place)</button>
        <button id='mergesort_place_async' class='btn_sort'>Merge Sort (In Place + async)</button>
        <button id='heapsort' class='btn_sort'>(Max) Heap Sort</button>
        <button id='introsort' class='btn_sort'>Introspective Sort</button>
        <button id='introsort_async' class='btn_sort'>Introspective Sort (async)</button>
        <button id='insertionsort' class='btn_sort'>Insertion Sort</button>
        <button id='selectionsort' class='btn_sort'>Selection Sort</button>
        <button id='bubblesort' class='btn_sort'>Bubble Sort</button>
        <button id='cyclesort' class='btn_sort'>Cycle Sort</button>
        `;
        document.getElementById("button_new_dup").addEventListener("click", () => {
            if (this.new_arr_dup) this.new_arr_dup(1);
        });
        document.getElementById("button_new_no_dup").addEventListener("click", () => {
            if (this.new_arr_dup) this.new_arr_dup(0);
        });
        const sort_buttons = document.querySelectorAll('.btn_sort');
        sort_buttons.forEach(button => {
            button.addEventListener('click', event => {
                if (this.sort) this.sort(event.target.id);
            });
        });
    }
}
