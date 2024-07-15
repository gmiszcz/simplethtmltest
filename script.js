const API_KEY = "66959486232badc18de4d136";
const URL = `https://userdatabase-d4a6.restdb.io/rest/users?key=${API_KEY}`;

fetch(URL, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    // access-controlle-allow-origin is a CORS header that allows you to specify domains that can access your API
    "Access-Control-Allow-Origin": "https://simplethtmltest-git-main-patryks-projects-3dac6345.vercel.app",
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
