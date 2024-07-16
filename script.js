const API_KEY = "pat2vyyvaf2AIREq1.a63aeb49c64a3d009439291ec53082e518f6ffced9eae7428a9610bea0355686";
const BASE_ID = "appdtQMz1VcWrGaY2";
const TABLE_NAME = "Users";
const URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

fetch(URL, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const userList = document.getElementById("user-list");
    data.records.forEach((record) => {
      const listItem = document.createElement("tr");
      listItem.innerHTML = `
        <td>${record.fields.Name}</td>
        <td>${record.fields.Surname}</td>
        <td>${record.fields.Email}</td>
        <td>${record.fields.Issues}</td>
        <td>${record.fields.Needs}</td>
        <td>${record.fields.Visits ? record.fields.Visits.join(", ") : "No Visits"}</td>
      `;
      userList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });
