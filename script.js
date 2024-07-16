const API_KEY = "pat2vyyvaf2AIREq1.a63aeb49c64a3d009439291ec53082e518f6ffced9eae7428a9610bea0355686";
const BASE_ID = "appdtQMz1VcWrGaY2";

const USERS_URL = `https://api.airtable.com/v0/${BASE_ID}/Users`;
const TREATMENTS_URL = `https://api.airtable.com/v0/${BASE_ID}/Treatments`;

class DataTable {
  constructor(containerId, headers) {
    this.container = document.getElementById(containerId);
    this.headers = headers;
    this.table = document.createElement("table");
    this.table.className = "ui celled table";
    this.createTable();
  }

  createTable() {
    const thead = this.table.createTHead();
    const headerRow = thead.insertRow();
    this.headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    const tbody = document.createElement("tbody");
    tbody.id = "table-body";
    this.table.appendChild(tbody);
    this.container.appendChild(this.table);
  }

  addRow(data) {
    const tbody = this.table.querySelector("#table-body");
    const row = tbody.insertRow();
    data.forEach((cellData) => {
      const cell = row.insertCell();
      cell.textContent = cellData;
    });
  }
}

function fetchData(url, columnheaders, containerId) {
  fetch(url, {
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
      const dataTable = new DataTable(containerId, columnheaders);
      data.records.forEach((record) => {
        const rowData = columnheaders.map((header) => record.fields[header] || "No Data");
        dataTable.addRow(rowData);
      });
    })
    .catch((error) => {
      console.error(`Error fetching data from ${url}:`, error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const userHeaders = ["Name", "Surname", "Email", "Issues", "Needs", "Description"];
  fetchData(USERS_URL, userHeaders, "user-table-container");

  const treatmentHeaders = ["Name", "Description", "Price"];
  fetchData(TREATMENTS_URL, treatmentHeaders, "treatment-table-container");
});
