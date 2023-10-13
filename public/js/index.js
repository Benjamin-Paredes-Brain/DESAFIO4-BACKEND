const socket = io();

document.getElementById("addProductForm").addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("add_input").value;

    socket.emit("addProduct", { title });

    document.getElementById("add_input").value = "";
});


document.getElementById("deleteProductForm").addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("delete_input").value;

    socket.emit("deleteProduct", { title });

    document.getElementById("delete_input").value = "";
});


socket.on("updateProducts", (data) => {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    data.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.textContent = product.title;
        productList.appendChild(productDiv);
    });
});
