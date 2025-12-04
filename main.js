import { resetFiltersAndSearch } from "./blocks/convert/convert.js";
import { updateCounts } from "./blocks/header/header.js";
import { renderCards, updateCards } from "./blocks/section/section.js";
import { data } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
	updateCounts();
	renderCards(data);
	updateCards();
});

document
	.querySelector(".convert__wrapper")
	?.addEventListener("click", resetFiltersAndSearch);
