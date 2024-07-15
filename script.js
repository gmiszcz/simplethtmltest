const API_KEY = "669580b8232bada2fde4d002";
const URL = `https://userdatabase-d4a6.restdb.io/rest/users?key=${API_KEY}`;

fetch(URL, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
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
    data.forEach((user) => {
      const listItem = document.createElement("li");
      listItem.textContent = user.name;
      userList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });
