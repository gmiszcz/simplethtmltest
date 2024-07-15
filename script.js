async function fetchUsers() {
  try {
    const response = await fetch("https://userdatabase-d4a6.restdb.io/rest/users?key=669580b8232bada2fde4d002", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors", // Make sure mode is set to 'cors'
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

fetchUsers();
