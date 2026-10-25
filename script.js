const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchCategory = document.querySelector("#search-category");
const categoryCards = [...document.querySelectorAll(".shop-section .box")];
const shopSection = document.querySelector(".shop-section");

if (searchForm && searchInput && searchCategory && shopSection) {
    const searchStatus = document.createElement("p");
    searchStatus.className = "search-status";
    searchStatus.setAttribute("role", "status");
    searchStatus.setAttribute("aria-live", "polite");
    searchStatus.hidden = true;
    shopSection.before(searchStatus);

    const filterCategories = () => {
        const query = searchInput.value.trim().toLowerCase();
        const category = searchCategory.value;
        let visibleCount = 0;

        categoryCards.forEach((card) => {
            const title = card.querySelector("h2")?.textContent.toLowerCase() ?? "";
            const matchesQuery = !query || title.includes(query);
            const matchesCategory = !category || title.includes(category);
            const isVisible = matchesQuery && matchesCategory;

            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        const hasSearch = Boolean(query || category);
        searchStatus.hidden = !hasSearch;
        if (hasSearch) {
            searchStatus.textContent = visibleCount
                ? `${visibleCount} ${visibleCount === 1 ? "category" : "categories"} found`
                : "No categories found. Try a different search.";
        }
    };

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        filterCategories();
    });
    searchInput.addEventListener("input", filterCategories);
    searchCategory.addEventListener("change", filterCategories);
}

document.querySelector("#back-to-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});