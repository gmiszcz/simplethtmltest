const API_KEY = "66959486232badc18de4d136";
const URL = `https://userdatabase-d4a6.restdb.io/rest/users`;

fetch(URL, {
  method: "GET",
  headers: {
    // "Content-Type": "application/json",
    "x-apikey": API_KEY,
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
