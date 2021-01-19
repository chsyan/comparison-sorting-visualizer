const ARRAY_SIZE = Math.floor(document.getElementById("main_view").clientWidth/5) - 5;
var VISUAL_SPEED = 10;
const POINTER_COL = 1
const SWAP_COL = 2;


export default class Sorter { constructor(dup) {
        this.array = [];    // data (height) arr
        this.states = [];   // state of arr col
        if (dup == 1)       // use arr with dup?
        this.new_array_dup();
        else this.new_array_no_dup();
        this.handle_speed_slider();
    }

    handle_speed_slider() {
        var slider = document.getElementById("speed_range");
        var text = document.getElementById("speed_text");
        text.innerHTML = "Speed: " + slider.value;
        VISUAL_SPEED = 510 - slider.value;
        slider.oninput = function() {
            text.innerHTML = "Speed: " + slider.value;
            VISUAL_SPEED = 510 - this.value;
        }
    }

    new_array_dup() {
        var array = [];
        for (let i = 0; i < ARRAY_SIZE; i++)
        {
            var min = 1, max = ARRAY_SIZE + min;
            array[i] = this.rand_int(min, max);
            this.states[i] = 0;
        }
        this.array = array;
    }

    new_array_no_dup() {
        var array = [], off = 1;
        for (let i = off; i < ARRAY_SIZE + off; i++)
        {
            array[i - off] = i;
            this.states[i] = 0;
        }
        for (let i = ARRAY_SIZE - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        this.array = array;
    }

    render_arr() {
        var result = "", root = document.getElementById("main_view");
        var colors = ["palegreen", "palevioletred", "slateblue", "purple"];
        for(var i = 0; i < ARRAY_SIZE; i++) {
            result += "<div className = \"arr_col\" key=\""
                + this.array[i] + "\""
                + "style=\"height: " + this.array[i] * 3 + "px;"
                +         "width: 3px;"
                +         "display: inline-block;"
                +         "margin: 0 1px;"
                +         "background-color: " + colors[this.states[i]] + ";"
                + "\""
                + "></div>";
        }
        root.innerHTML = result;
    }

    async render() {
        while (this.flag == 0) {
            this.render_arr();
            await this.sleep(1);
        }
    }

    async sort_driver(type) {
        this.flag = 0;
        switch (type) {
            case "quicksort_hoare":
                await this.quicksort_hoare_driver();
                break;
            case "quicksort_hoare_async":
                await this.quicksort_hoare_async_driver();
                break;
            case "quicksort_lomuto":
                await this.quicksort_lomuto_driver();
                break;
            case "quicksort_lomuto_async":
                await this.quicksort_lomuto_async_driver();
                break;
            case "mergesort":
                await this.merge_sort_driver();
                break;
            case "mergesort_async":
                await this.merge_sort_async_driver();
                break;
            case "mergesort_place":
                await this.merge_sort_place_driver();
                break;
            case "mergesort_place_async":
                await this.merge_sort_place_async_driver();
                break;
            case "heapsort":
                await this.max_heap_sort_driver();
                break;
            case "introsort":
                await this.intro_sort_driver();
                break;
            case "introsort_async":
                await this.intro_sort_async_driver();
                break;
            case "insertionsort":
                await this.insertion_sort_driver();
                break;
            case "selectionsort":
                await this.selection_sort_driver();
                break;
            case "bubblesort":
                await this.bubble_sort_driver();
                break;
            case "cyclesort":
                await this.cycle_sort_driver();
                break;
        }
        this.render_arr();
    }

    // Quicksort (Hoare)
    async quicksort_hoare_driver() {
        await this.quicksort_hoare(0, ARRAY_SIZE - 1);
    }

    async quicksort_hoare(low, high) {
        if (low < high) {
            let p = await this.partition_hoare(low, high);
            await this.quicksort_hoare(low, p);
            await this.quicksort_hoare(p + 1, high);
        }
    }

    // async
    async quicksort_hoare_async_driver() {
        await this.quicksort_hoare_async(0, ARRAY_SIZE - 1);
    }

    async quicksort_hoare_async(low, high) {
        if (low < high) {
            let p = await this.partition_hoare(low, high);
            await Promise.all([this.quicksort_hoare(low, p), this.quicksort_hoare(p + 1, high)]);
        }
    }

    async partition_hoare(low, high) {
        let pivot = this.array[Math.floor((low + high)/2)];
        let i = low - 1;
        let j = high + 1;
        while (1) {
            do await this.pointer(++i, POINTER_COL, VISUAL_SPEED);
            while(this.array[i] < pivot);
            do await this.pointer(--j, POINTER_COL, VISUAL_SPEED);
            while(this.array[j] > pivot)
            if (i >= j)
                return j;
            await this.swap(i, j, SWAP_COL, VISUAL_SPEED);
        }
    }

    // Quicksort (Lomuto)
    async quicksort_lomuto_driver() {
        await this.quicksort_lomuto(0, ARRAY_SIZE - 1);
    }

    async quicksort_lomuto(low, high) {
        if (low < high) {
            let p = await this.partition_lomuto(low, high);
            await this.quicksort_lomuto(low, p - 1);
            await this.quicksort_lomuto(p + 1, high);
        }
    }

    async quicksort_lomuto_async_driver() {
        await this.quicksort_lomuto_async(0, ARRAY_SIZE - 1);
    }

    async quicksort_lomuto_async(low, high) {
        if (low < high) {
            let p = await this.partition_lomuto(low, high);
            await Promise.all([this.quicksort_lomuto(low, p - 1), this.quicksort_lomuto(p + 1, high)]);
        }
    }

    async partition_lomuto(low, high) {
        let p = low, val = this.array[high];
        for (let i = low; i < high; i++) {
            await this.pointer(i, POINTER_COL, VISUAL_SPEED);
            if (this.array[i] < val) {
                await this.swap(p++ , i, SWAP_COL, VISUAL_SPEED);
            }
        }
        await this.swap(high, p, SWAP_COL, VISUAL_SPEED);
        return p;
    }

    // Merge Sort
    async merge_sort_driver() {
        await this.merge_sort(0, ARRAY_SIZE - 1);
    }

    async merge_sort(start, end) {
        if (start >= end) return;
        var mid = Math.floor((start + end - 1) / 2);
        await this.merge_sort(start, mid);
        await this.merge_sort(mid + 1, end);
        await this.merge(start, mid, end);
    }

    async merge_sort_async_driver() {
        await this.merge_sort_async(0, ARRAY_SIZE - 1);
    }

    async merge_sort_async(start, end) {
        if (start >= end) return;
        var mid = Math.floor((start + end - 1) / 2);
        await Promise.all([this.merge_sort(start, mid), this.merge_sort(mid + 1, end)]);
        await this.merge(start, mid, end);
    }

    async merge(start, mid, end) {
        var left = this.array.slice(start, mid + 1),
            right = this.array.slice(mid + 1, end + 1);
        var i = 0, j = 0, k = start;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) this.array[k] = left[i++];
            else this.array[k] = right[j++];
            await this.pointer(k++, POINTER_COL, VISUAL_SPEED);
        }
        while (i < left.length) {
            this.array[k] = left[i++];
            await this.pointer(k++, POINTER_COL, VISUAL_SPEED);
        }
        while (j < right.length) {
            this.array[k] = right[j++];
            await this.pointer(k++, POINTER_COL, VISUAL_SPEED);
        }
    }

    // Merge (in place)
    async merge_sort_place_driver() {
        await this.merge_sort_place(0, ARRAY_SIZE - 1);
        this.flag = 1;
    }

    async merge_sort_place(start, end) {
        if (start >= end) return;
        var mid = Math.floor((start + end - 1) / 2);
        await this.merge_sort_place(start, mid);
        await this.merge_sort_place(mid + 1, end);
        await this.merge_place(start, mid, end);
    }

    async merge_sort_place_async_driver() {
        await this.merge_sort_place_async(0, ARRAY_SIZE - 1);
        this.flag = 1;
    }

    async merge_sort_place_async(start, end) {
        if (start >= end) return;
        var mid = Math.floor((start + end - 1) / 2);
        await Promise.all([this.merge_sort_place(start, mid), this.merge_sort_place(mid + 1, end)]);
        await this.merge_place(start, mid, end);
    }

    async merge_place(start, mid, end) {
        var s = start, m = mid, s2 = mid + 1;
        if (this.array[m] <= this.array[s2]) return;
        while (s <= m && s2 <= end) {
            await this.pointer(s, POINTER_COL, VISUAL_SPEED);
            if (this.array[s] <= this.array[s2]) {
                await this.compare(s, s2, SWAP_COL, VISUAL_SPEED);
                s++;
            }
            else {
                var value = this.array[s2], index = s2;
                while (index != s) {
                    this.array[index] = this.array[--index];
                }
                await this.pointer(s, POINTER_COL, VISUAL_SPEED);
                this.array[s++] = value;
                m++;
                s2++;
            }
        }
    }

    // Heapify impl (for later sorts)
    async max_heap(i, size, start) {
        var temp = this.array[start + i - 1];
        while (i <= size / 2) {
            await this.pointer(i, POINTER_COL, VISUAL_SPEED);
            var child = 2 * i;
            if (child < size && this.array[start + child - 1] < this.array[start + child])
                child++;
            if (temp >= this.array[start + child - 1]) break;
            this.array[start +i - 1] = this.array[start + child - 1];
            i = child;
        }
        this.array[start + i - 1] = temp;
    }

    async max_heapify(start, end, size) {
        for (let i = Math.floor(size / 2); i > 0; i--) {
            await this.pointer(i, POINTER_COL, VISUAL_SPEED);
            await this.max_heap(i, size, start);
        }
    }

    // Heap sort
    async max_heap_sort_driver() {
        await this.max_heap_sort(0, ARRAY_SIZE - 1);
    }

    async max_heap_sort(start, end) {
        let size = end - start;
        await this.max_heapify(start, end, size);
        for (let i = size; i > 0; i--) {
            await this.pointer(i, POINTER_COL, VISUAL_SPEED);
            await this.swap(start, start + i, SWAP_COL, VISUAL_SPEED);
            await this.max_heap(1, i, start);
        }
    }

    // Introspective Sort
    async intro_sort_driver() {
        let max_depth = 2 * Math.floor(Math.log(ARRAY_SIZE) / Math.log(2));
        await this.intro_sort(0, ARRAY_SIZE - 1, max_depth);
    }

    async intro_sort(start, end, max_depth) {
        if (end - start + 1 <= 1) return;
        if (max_depth = 0) await this.heap_sort(start, end);
        else {
            let pivot = await this.find_med(start, start + ((end  - start) / 2) + 1, end);
            await this.swap(pivot, end, SWAP_COL, VISUAL_SPEED);
            let p = await this.partition_lomuto(start, end);
            await this.intro_sort(start, p - 1, max_depth -1);
            await this.intro_sort(p + 1, end, max_depth - 1);
        }
    }

    async intro_sort_async_driver() {
        let max_depth = 2 * Math.floor(Math.log(ARRAY_SIZE) / Math.log(2));
        await this.intro_sort_async(0, ARRAY_SIZE - 1, max_depth);
    }

    async intro_sort_async(start, end, max_depth) {
        if (end - start + 1 <= 1) return;
        if (max_depth = 0) await this.heap_sort(start, end);
        else {
            let pivot = await this.find_med(start, start + ((end  - start) / 2) + 1, end);
            await this.swap(pivot, end, SWAP_COL, VISUAL_SPEED);
            let p = await this.partition_lomuto(start, end);
            await Promise.all([ this.intro_sort(start, p - 1, max_depth -1),
                                this.intro_sort(p + 1, end, max_depth - 1)]);
        }
    }

    async find_med(a, b, c) {
        let max = Math.max(Math.max(this.array[a], this.array[b]), this.array[c]);
        let min = Math.min(Math.min(this.array[a], this.array[b]), this.array[c]);
        if (max != this.array[a] && min != this.array[a]) return a;
        if (max != this.array[b] && min != this.array[b]) return b;
        return c;
    }

    // Insertion Sort
    async insertion_sort_driver() {
        await this.insertion_sort(ARRAY_SIZE);
    }

    async insertion_sort(size) {
        let i = 1;
        while (i < size) {
            await this.pointer(i, POINTER_COL, VISUAL_SPEED);
            let j = i++;
            while (j > 0 && this.array[j-1] > this.array[j]) {
                await this.swap(j, --j, SWAP_COL, VISUAL_SPEED);

            }
        }
    }

    // Selection Sort
    async selection_sort_driver() {
        await this.selection_sort(ARRAY_SIZE);
    }

    async selection_sort(size) {
        for (let i = 0; i < size - 1; i++) {
            let j_min = i;
            for (let j = i + 1; j < size; j++) {
                await this.pointer(j, POINTER_COL, VISUAL_SPEED);
                if (this.array[j] < this.array[j_min])
                    j_min = j;
            }
            if (j_min != i) {
                await this.swap(i, j_min, SWAP_COL, VISUAL_SPEED);
            }
        }
    }

    // Bubble Sort
    async bubble_sort_driver() {
        await this.bubble_sort(ARRAY_SIZE);
    }

    async bubble_sort(size) {
        var n = size;
        do {
            var new_n = 0;
            for (let i = 1; i < n; i++) {
                await this.pointer(i, POINTER_COL, VISUAL_SPEED);
                if (this.array[i-1] > this.array[i]) {
                    await this.swap(i-1, i, SWAP_COL, VISUAL_SPEED);
                    new_n = i;
                }
            }
            n = new_n;
        } while (n > 1);
    }

    // Cycle Sort
    async cycle_sort_driver() {
        await this.cycle_sort(ARRAY_SIZE);
    }

    async cycle_sort(size) {
        for (let cycle_start = 0; cycle_start <= size - 2; cycle_start++) {
            let item = this.array[cycle_start];
            let pos = cycle_start;
            for (let i = cycle_start + 1; i < size; i++) {
                await this.pointer(i, POINTER_COL, VISUAL_SPEED);
                if (this.array[i] < item) {
                    pos++;
                    await this.pointer(pos, POINTER_COL, VISUAL_SPEED);
                }
            }
            if (pos == cycle_start) continue;
            while (item == this.array[pos]) {
                pos++;
                await this.pointer(pos, POINTER_COL, VISUAL_SPEED);
            }
            if (pos != cycle_start) {
                let temp = item;
                item = this.array[pos];
                this.array[pos] = temp;
            }

            while (pos != cycle_start) {
                await this.pointer(pos, POINTER_COL, VISUAL_SPEED);
                pos = cycle_start;
                for (let i = cycle_start + 1; i < size; i++) {
                    await this.pointer(i, POINTER_COL, VISUAL_SPEED);
                    if (this.array[i] < item) {
                        pos++;
                        await this.pointer(pos, POINTER_COL, VISUAL_SPEED);
                    }
                }
                while (item == this.array[pos]) {
                    pos++;
                    await this.pointer(pos, POINTER_COL, VISUAL_SPEED);
                }

                if (item != this.array[pos]) {
                    let temp = item;
                    item = this.array[pos];
                    this.array[pos] = temp;
                }
            }
        }
    }

    // Helpers
    async swap(a, b, col, time) {
        this.states[a] = this.states[b] = col;
        this.render_arr();
        await this.sleep(time/2);

        let temp = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = temp;

        this.render_arr();
        await this.sleep(time/2);
        this.states[a] = this.states[b] = 0;
    }

    async compare(a, b, col, time) {
        this.states[a] = this.states[b] = col;
        this.render_arr();
        await this.sleep(time);
        this.states[a] = this.states[b] = 0;
    }

    get_array() {
        return this.array;
    }

    rand_int(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async pointer(a, col, time) {
        this.states[a] = col;
        this.render_arr();
        await this.sleep(time);
        this.states[a] = 0;
    }
}
