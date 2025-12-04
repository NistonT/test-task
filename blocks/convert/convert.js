import { filterContainer } from "./../header/header.js";
import { updateCards } from "./../section/section.js";

const searchInput = document.querySelector(".header__tabs__search__input");
const gridContainer = document.querySelector(".section__grid"); // ← добавьте этот селектор

export async function resetFiltersAndSearch() {
	if (!gridContainer) return;

	gridContainer.style.opacity = "0";
	gridContainer.style.transform = "translateY(10px)";
	gridContainer.style.transition = "opacity 0.25s ease, transform 0.25s ease";

	await new Promise(resolve => setTimeout(resolve, 250));

	filterContainer
		.querySelectorAll(".header__tabs__filter__block")
		.forEach(block => {
			block.classList.remove("header__tabs__filter__block__active");
		});

	const allBlock = Array.from(
		filterContainer.querySelectorAll(".header__tabs__filter__block")
	).find(b => {
		const nameEl = b.querySelector(".header__tabs__filter__block__name");
		return nameEl?.textContent.trim() === "All";
	});

	if (allBlock) {
		allBlock.classList.add("header__tabs__filter__block__active");
	}

	if (searchInput) {
		searchInput.value = "";
	}

	updateCards();

	gridContainer.style.opacity = "1";
	gridContainer.style.transform = "translateY(0)";
}

document
	.querySelector(".convert__wrapper")
	?.addEventListener("click", function () {
		const img = this.querySelector("img");

		img?.parentElement?.classList.remove("is-rotating");

		void img?.offsetHeight;

		this.classList.add("is-rotating");
	});

const convertBtn = document.querySelector(".convert__wrapper");
convertBtn?.addEventListener("click", () => {
	convertBtn.classList.add("is-rotating");

	resetFiltersAndSearch();
});
