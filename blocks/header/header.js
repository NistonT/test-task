import { data } from "../../data.js";

const counts = data.reduce((acc, item) => {
	acc[item.type] = (acc[item.type] || 0) + 1;
	return acc;
}, {});
counts.All = data.length;

export const filterContainer = document.querySelector(".header__tabs__filter");
export const gridContainer = document.querySelector(".section__grid");

if (!filterContainer || !gridContainer) {
	console.error("Не найдены элементы фильтра или сетки");
	throw new Error("DOM elements missing");
}

export { counts, data };

export function updateCounts() {
	const filterBlocks = filterContainer.querySelectorAll(
		".header__tabs__filter__block"
	);
	filterBlocks.forEach(block => {
		const nameEl = block.querySelector(".header__tabs__filter__block__name");
		const lengthEl = block.querySelector(
			".header__tabs__filter__block__length"
		);
		if (nameEl && lengthEl) {
			const typeName = nameEl.textContent.trim();
			lengthEl.textContent = counts[typeName] || 0;
		}
	});
}
