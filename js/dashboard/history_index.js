import { backendURL, getLoggedUser } from "../utils/utils.js";

// Get Logged User Info
getLoggedUser();

// Get Admin Pages
// showNavAdminPages();

// Get All Data
getData();

async function getData() {
  try {
    // Add Loading indicator
    document.getElementById(
      "get_data"
    ).innerHTML = `<div class="col-sm-12 d-flex justify-content-center align-items-center">
                      <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                      </div>
                      <b class="ms-2">Loading Data...</b>
                  </div>`;

    // Get Carousel API Endpoint
    const response = await fetch(backendURL + "/api/history/index", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const json = await response.json();
    console.log(json);

    // Check if json is an array and has length greater than 0
    if (Array.isArray(json) && json.length > 0) {
      let container = "";
      json.forEach((element) => {
        const date = new Date(element.created_at).toLocaleString();
        // const imageUrl = element.image ? `${backendURL}/storage/${element.image}` : '';

        container += `
        <div class="col-lg-4 col-md-6 mb-4">
                                    <div class="card p-2">
                                        <details>
                                            <summary>
                                                <p class="text-center"><strong>${element.name}</strong></p>
                                                <p><strong>Model:</strong> ${element.model}</p>
                                                <p><strong>Rented From:</strong> ${element.rent_from}</p>
                                                <p><strong>Rented To:</strong> ${element.rent_to}</p>
                                                <p><strong>Brought:</strong> ${date}</p>
                                            </summary>
                                            <div>
                                                <p><strong>Mileage:</strong> ${element.mileage}</p>
                                                <p><strong>Horsepower:</strong> ${element.horsepower}</p>
                                                <p><strong>Transmission:</strong> ${element.transmission}</p>
                                                <p><strong>Price:</strong> ${element.price}</p>
                                                
                                            </div>
                                        </details>
                                    </div>
                                </div>`;
      });
      document.getElementById("get_data").innerHTML = container;
    } else {
      document.getElementById("get_data").innerHTML = `
          <span class="text-center">No history available.</span>
        `;
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    // Display error message to the user
    document.getElementById("get_data").innerHTML = `
          <span class="text-center">Failed to fetch posts. Please try again later.</span>
        `;
  }
}
