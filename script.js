const API_KEY = "pat2vyyvaf2AIREq1.a63aeb49c64a3d009439291ec53082e518f6ffced9eae7428a9610bea0355686";
const BASE_ID = "appdtQMz1VcWrGaY2";

const USERS_URL = `https://api.airtable.com/v0/${BASE_ID}/Users`;
const VISITS_URL = `https://api.airtable.com/v0/${BASE_ID}/Visits`;
const TREATMENTS_URL = `https://api.airtable.com/v0/${BASE_ID}/Treatment`;

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

async function fetchData(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.records;
}

async function createUsersTable(users, visits, treatments) {
  const treatmentMap = treatments.reduce((map, record) => {
    map[record.id] = record.fields.Name;
    return map;
  }, {});

  const userTable = new DataTable("user-table-container", ["Name", "Surname", "Email", "Issues", "Needs", "Visits", "Description"]);

  users.forEach((user) => {
    const userVisits = user.fields.Visits || [];
    const visitNames = userVisits
      .map((visitId) => {
        const visit = visits.find((v) => v.id === visitId);
        return visit ? treatmentMap[visit.fields.Treatment[0]] : "No Treatment";
      })
      .join(", ");

    const userData = [user.fields.Name, user.fields.Surname, user.fields.Email, user.fields.Issues, user.fields.Needs, visitNames, user.fields.Description];
    userTable.addRow(userData);
  });
}

async function createTreatmentsTable(visits, treatments) {
  const visitMap = visits.reduce((map, visit) => {
    visit.fields.Treatment.forEach((treatmentId) => {
      if (!map[treatmentId]) {
        map[treatmentId] = [];
      }
      map[treatmentId].push(visit.fields.Date);
    });
    return map;
  }, {});

  const treatmentTable = new DataTable("treatment-table-container", ["Name", "Description", "Price", "Visits"]);

  treatments.forEach((treatment) => {
    const treatmentVisits = visitMap[treatment.id] || [];
    const treatmentData = [treatment.fields.Name, treatment.fields.Description, treatment.fields.Price, treatmentVisits.join(", ")];
    treatmentTable.addRow(treatmentData);
  });
}

async function createVisitsTable(users, visits, treatments) {
  const userMap = users.reduce((map, user) => {
    map[user.id] = `${user.fields.Name} ${user.fields.Surname}`;
    return map;
  }, {});

  const treatmentMap = treatments.reduce((map, treatment) => {
    map[treatment.id] = treatment.fields.Name;
    return map;
  }, {});

  const visitTable = new DataTable("visit-table-container", ["User", "Date", "Treatment", "Price", "Comments"]);

  visits.forEach((visit) => {
    const visitData = [
      visit.fields.User.map((userId) => userMap[userId]).join(", "),
      visit.fields.Date,
      visit.fields.Treatment.map((treatmentId) => treatmentMap[treatmentId]).join(", "),
      visit.fields.Price,
      visit.fields.Comments,
    ];
    visitTable.addRow(visitData);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [users, visits, treatments] = await Promise.all([fetchData(USERS_URL), fetchData(VISITS_URL), fetchData(TREATMENTS_URL)]);

    createUsersTable(users, visits, treatments);
    createTreatmentsTable(visits, treatments);
    createVisitsTable(users, visits, treatments);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
