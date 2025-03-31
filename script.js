stuff = {
    "qty-choco": 3,
    "qty-rose": 2
}

function showDropdownMessage(message) {
    let alertBox = document.getElementById("dropdown-alert");
    alertBox.innerText = message;
    alertBox.classList.add("show");

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".locked").forEach(checkbox => {
        checkbox.addEventListener("click", function (event) {
            event.preventDefault(); // Prevents interaction with the checkbox
            showDropdownMessage(this.dataset.message); // Uses data-message
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const limits = {
        choco: { min: 1, max: 5 },
        rose: { min: 1, max: 3 }
    };


    document.querySelectorAll(".plus, .minus").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.dataset.id;
            const qtyElement = document.getElementById(`qty-${id}`);
            let currentQty = parseInt(qtyElement.innerText);
            let change = this.classList.contains("plus") ? 1 : -1;
            let newQty = currentQty + change;

            if (newQty < limits[id].min) {
                showDropdownMessage("EH! lena toh padega >:(");
                return;
            }
            else if(newQty > limits[id].max){
                showDropdownMessage("abbe ooo itna bhi ameer nhi hoon");
                return;
            }
            stuff[qtyElement.id] = newQty;
            qtyElement.innerText = newQty;
        });
    });

    document.querySelectorAll(".locked").forEach(checkbox => {
        checkbox.addEventListener("click", function (event) {
            event.preventDefault();
            showDropdownMessage("This option cannot be changed!");
        });
    });

    document.getElementById("place-order").addEventListener("click", () => {
        console.log(stuff)
        // Replace this with actual push notifications if needed
    });
});



function sendNotification() {
    const stuff = {
        "qty-choco": document.getElementById("qty-choco").innerText,
        "qty-rose": document.getElementById("qty-rose").innerText
    };

    const note = document.getElementById("delivery-instructions").value.trim(); // Get input value

    const message = `🍫 Chocolates: ${stuff["qty-choco"]} | 🌹 Roses: ${stuff["qty-rose"]}`
                   + (note ? `\n📜 Note: "${note}"` : ""); // Include note if not empty

    fetch("https://ntfy.sh/april_fool_tiyamisu", {
        method: "POST",
        headers: { "Title": "Order Placed", "Priority": "high" },
        body: message
    }).then(response => {
        if (response.ok) {
            showDropdownMessage("📢 Notification sent!");
            window.location.href = "next.html";
        } else {
            showDropdownMessage("⚠️ Failed to send notification.");
        }
    }).catch(() => {
        showDropdownMessage("❌ Error sending notification.");
    });
}

document.getElementById("place-order").addEventListener("click", sendNotification);
