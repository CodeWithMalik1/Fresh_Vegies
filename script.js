const quantities = document.getElementsByClassName("quantity");
const footerLeft = document.getElementById("footer-left");
const footerRight = document.getElementById("footer-right");
const billButton = document.getElementById("billButton");
const searchInput = document.getElementById("input");
const searchButton = document.getElementById("searchButton");

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

const prices = {
    onions: 120,
    potato: 100,
    brinjal: 60,
    cabbage: 50,
    chilly: 100,
    tomato: 80,
    carrot: 90,
    redchilly: 160,
    ladiesfinger: 80,
    beetroot: 120,
    ginger: 200,
    beans: 100,
};

let totalSum = 0;
let itemSums = {};

for (let quantity of quantities) {
    quantity.addEventListener("change", () => {
        let name = quantity.dataset.name;
        let price = prices[name];

        let sum = 0;
        switch (quantity.value) {
            case "quater":
                sum = price / 4;
                break;
            case "half":
                sum = price / 2;
                break;
            case "three-quaters":
                sum = price * 0.75;
                break;
            case "kg":
                sum = price;
                break;
            case "one-quater":
                sum = price * 1.25;
                break;
            case "one-half":
                sum = price * 1.5;
                break;
            default:
                sum = 0;
        }

        itemSums[name] = sum;
    });
}

function generateBill() {
    footerLeft.innerHTML = '';

    for (const [itemName, itemSum] of Object.entries(itemSums)) {
        let div = document.createElement("div");
        div.innerHTML = `${itemName} total Rs : ${itemSum.toFixed(2)}`;
        footerLeft.appendChild(div);
    }

    totalSum = Object.values(itemSums).reduce((acc, curr) => acc + curr, 0);

    footerRight.innerHTML = '';

    let totalDiv = document.createElement("div");
    totalDiv.innerHTML = `Total: Rs ${totalSum.toFixed(2)}`;
    footerRight.appendChild(totalDiv);

    billButton.style.display = 'none';
}

billButton.addEventListener("click", generateBill);

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const veggies = document.getElementsByClassName("veg1");

    Array.from(veggies).forEach((veg) => {
        const vegName = veg.querySelector("h3").innerText.toLowerCase();

        if (vegName.includes(searchTerm)) {
            veg.style.display = "flex";
            veg.style.order = "-1";
        } else {
            veg.style.display = "none";
        }
    });
});
