const addBtn = document.querySelector(".add-btn");
const profileName = document.querySelector(".profile-details h3");
const profileMail = document.querySelector(".profile-details p");

const userName = localStorage.getItem("username");
const userSurname = localStorage.getItem("usersurname");
const userMail = localStorage.getItem("usermail");

const fullName = userName + " " + userSurname;
profileName.textContent = fullName;
profileMail.textContent = userMail;

loadWeeklyChart();

addBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const title = document.getElementById("activity").value.trim();
    const category = document.getElementById("categories").value;

    if (!title) {
        alert("Please enter an activity");
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        alert("You are not logged in");
        return;
    }

    try{

         const response = await fetch("http://localhost:3000/api/activities/add-activity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                catValue: 5,
                category
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        loadWeeklyChart();

        alert("Activity added successfully!");

        // Clear input after success
        document.getElementById("activity").value = "";


    }
    catch(error){
        console.error(error);
        alert(error.message);
    }
});

async function loadWeeklyChart(){
    const token = localStorage.getItem("token");

    try{

        const response = await fetch("http://localhost:3000/api/activities/weekly", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        updateChart(data.categoryTotals);
        updateTotal(data.total);

    }
    catch(error){
        console.error("Error loading weekly data:", error);
    }
}


let weeklyChart; 

function updateChart(categoryTotals) {

    const labels = categoryTotals.map(c => c.cat);
    const values = categoryTotals.map(c => c.total);

    if (weeklyChart) {
        weeklyChart.data.labels = labels;
        weeklyChart.data.datasets[0].data = values;
        weeklyChart.update();
    } else {
        const ctx = document.querySelector(".myChart").getContext("2d");

        weeklyChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                    data: values
                }]
            }
        });
    }
}

function updateTotal(total) {
    document.getElementById("weeklyTotal").textContent = total;
}


