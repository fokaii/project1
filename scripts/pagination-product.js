document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll(".product");
    const paginationContainer = document.querySelector(".pagination-product");
    const itemsPerPage = 8;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    let currentPage = 1;

    function showPage(page) {
        products.forEach((product, index) => {
            product.classList.remove("visible");
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                product.classList.add("visible");
            }
        });
    }

    function createPaginationButtons() {
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.addEventListener("click", () => {
                currentPage = i;
                showPage(currentPage);
                updatePaginationButtons();
            });
            paginationContainer.appendChild(button);
        }
    }

    function updatePaginationButtons() {
        const buttons = paginationContainer.querySelectorAll("button");
        buttons.forEach((button, index) => {
            button.classList.toggle("active", index + 1 === currentPage);
        });
    }

    showPage(currentPage);
    createPaginationButtons();
    updatePaginationButtons();
});
