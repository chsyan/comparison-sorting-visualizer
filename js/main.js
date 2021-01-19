import Sorter from "./sorter.js";
import Display from "./display.js";

var sorter = new Sorter(1);
var display = new Display();

display.new_arr_dup = function (dup) {
    sorter = new Sorter(dup);
    display.update(sorter);
};

display.sort = function (type) {
    sorter.sort_driver(type);
};

display.update(sorter);
