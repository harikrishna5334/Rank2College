const backendBaseUrl = "http://localhost:8080/students";  // This URL might when backend hosted somewhere on internet

function filterByBranch() {
    const rank = document.getElementById("rank").value;
    const branchCode = document.getElementById("branchCode").value;
    const gender = document.getElementById("gender").value;
    const caste = document.getElementById("caste").value;

    if (!rank || !branchCode || !gender || !caste) {
        alert("Please fill all fields.");
        return;
    }

    fetch(`${backendBaseUrl}/filterByBranch?rank=${rank}&gender=${gender}&caste=${caste}&branchCode=${branchCode}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            return res.json();
        })
        .then(data => populateBranchTable(data))
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Error fetching data: " + err.message);
        });
}

function populateBranchTable(colleges) {
    const tbody = document.getElementById("resultTable").querySelector("tbody");
    tbody.innerHTML = "";

    if (!colleges.length) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;">No matching colleges found.</td></tr>`;
        return;
    }

    const caste = document.getElementById("caste").value.toLowerCase();
    const gender = document.getElementById("gender").value.toLowerCase();
    const cutoffKey = caste + (gender === "male" ? "Boys" : "Girls");

    colleges.forEach(college => {
        const row = `
            <tr>
                <td>${college.instCode}</td>
                <td>${college.instituteName}</td>
                <td>${college.branchCode}</td>
                <td>${college.branchName}</td>
                <td>${college.place}</td>
                <td>${college.distCode}</td>
                <td>${college.tuitionFee}</td>
                <td>${college.affiliatedTo}</td>
                <td>${college[cutoffKey]}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
