import { data, filterContainer, gridContainer } from "../header/header.js";

function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

const searchInput = document.querySelector(".header__tabs__search__input");

let currentQuery = "";

function getTypeColor(type) {
	const colorMap = {
		Marketing: "#03CEA4",
		Management: "#5A87FC",
		"HR & Recruting": "#F89828",
		Design: "#F52F6E",
		Development: "#7772F1",
	};
	return colorMap[type] || "#03CEA4";
}

export function renderCards(items) {
	gridContainer.innerHTML = items
		.map(
			item => `
        <div class="section__grid__block">
          <div class="section__grid__block__image">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="section__grid__block__wrapper">
            <div 
              class="section__grid__block__wrapper__type"
              style="background-color: ${getTypeColor(item.type)};"
            >
              ${item.type}
            </div>
            <div class="section__grid__block__wrapper__title">${
							item.title
						}</div>
            <div class="section__grid__block__wrapper__info">
              <div class="section__grid__block__wrapper__info__price">$${
								item.price
							}</div>
              <div class="section__grid__block__wrapper__info__divider"></div>
              <div class="section__grid__block__wrapper__info__author">
                by ${item.author}
              </div>
            </div>
          </div>
        </div>
      `
		)
		.join("");
}
export function getActiveCategories() {
	const activeBlocks = filterContainer.querySelectorAll(
		".header__tabs__filter__block__active"
	);
	const categories = Array.from(activeBlocks)
		.map(block =>
			block
				.querySelector(".header__tabs__filter__block__name")
				?.textContent.trim()
		)
		.filter(Boolean);

	if (categories.includes("All")) return null;
	return categories.filter(cat => cat !== "All");
}

export function updateCards() {
	const activeCategories = getActiveCategories();
	const searchInput = document.querySelector(".header__tabs__search__input");
	const query = (searchInput?.value || "").toLowerCase().trim();

	let filteredData = data;

	if (activeCategories !== null) {
		filteredData = filteredData.filter(item =>
			activeCategories.includes(item.type)
		);
	}

	if (query) {
		filteredData = filteredData.filter(item =>
			item.title.toLowerCase().includes(query)
		);
	}

	renderCards(filteredData);
}

if (searchInput) {
	const debouncedSearch = debounce(() => {
		currentQuery = searchInput.value;
		updateCards();
	}, 300);

	searchInput.addEventListener("input", debouncedSearch);
}

filterContainer.addEventListener("click", e => {
	const block = e.target.closest(".header__tabs__filter__block");
	if (!block) return;

	const nameEl = block.querySelector(".header__tabs__filter__block__name");
	if (!nameEl) return;

	const categoryName = nameEl.textContent.trim();
	const isActive = block.classList.contains(
		"header__tabs__filter__block__active"
	);

	if (categoryName === "All") {
		filterContainer
			.querySelectorAll(".header__tabs__filter__block")
			.forEach(b => {
				b.classList.remove("header__tabs__filter__block__active");
			});
		block.classList.add("header__tabs__filter__block__active");
	} else {
		const allBlockReal = Array.from(
			filterContainer.querySelectorAll(".header__tabs__filter__block")
		).find(
			b =>
				b
					.querySelector(".header__tabs__filter__block__name")
					?.textContent.trim() === "All"
		);

		if (allBlockReal) {
			allBlockReal.classList.remove("header__tabs__filter__block__active");
		}

		if (isActive) {
			block.classList.remove("header__tabs__filter__block__active");
		} else {
			block.classList.add("header__tabs__filter__block__active");
		}

		const hasActiveNonAll = Array.from(
			filterContainer.querySelectorAll(".header__tabs__filter__block__active")
		).some(
			b =>
				b
					.querySelector(".header__tabs__filter__block__name")
					?.textContent.trim() !== "All"
		);

		if (!hasActiveNonAll && allBlockReal) {
			allBlockReal.classList.add("header__tabs__filter__block__active");
		}
	}

	updateCards();
});
