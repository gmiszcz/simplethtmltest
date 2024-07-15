fetch("https://userdatabase-d4a6.restdb.io/rest/users?key=669580b8232bada2fde4d002", {
  method: "GET", // or POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: "https://simplethtmltest-c6bcftjra-patryks-projects-3dac6345.vercel.app",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching users:", error));
