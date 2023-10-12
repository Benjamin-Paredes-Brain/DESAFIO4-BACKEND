const socket = io();

document.getElementById("addProductForm").addEventListener("submit", event => {

    const title = document.querySelector("input[name='title']").value;

    socket.emit("addProduct", { title });

    document.querySelector("input[name='title']").value = "";
});

document.getElementById("deleteProductForm").addEventListener("submit", event => {

    const id = document.querySelector("input[name='id']").value;

    socket.emit("deleteProduct", { id });

    document.querySelector("input[name='id']").value = "";
});

