import {
    backendURL,
    successNotification,
    errorNotification,
    getLoggedUser,
  } from "../utils/utils.js";
  
  // Get Logged User Info
  getLoggedUser();
  
  // Get Admin Pages
//   showNavAdminPages();
  
  // Get All Data
  getData();
  
  async function getData() {
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
    const response = await fetch(backendURL + "/api/honda/all", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
    });
  
    // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
      console.log(json);
  
      // Handle both possible structures: json.data and json directly
      const data = json.data || json;
  
      // Check if data is an array before iterating
      if (Array.isArray(data) && data.length > 0) {
        // Get Each Json Elements and merge with Html element and put it into a container
        let container = "";
        data.forEach((element) => {
          const date = new Date(element.created_at).toLocaleString();
  
          container += `
    <div class="col-lg-3 col-md-4 col-sm-6">
        <div style="border: 1px solid #ccc; padding: 20px;">
            <div class="single-featured-cars">
                <div class="featured-img-box">`;

// Show edit and delete functionality only for Admin
if (localStorage.getItem("role") === "Admin") {
    container += `
        <div class="dropdown float-end">
            <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
            <ul class="dropdown-menu">
                <li>
                    <a class="dropdown-item text-danger" href="#" id="btn_delete" data-id="${element.id}"> Delete</a>
                </li>
            </ul>
        </div>`;
}

container += `
                    <div class="featured-cars-img">
                        <img src="${backendURL}/storage/${element.image}" alt="cars" style="max-width: 100%; height: auto;">
                    </div>
                    <div class="featured-model-info">
                        <p>
                            <span>Model:</span> ${element.model} <br>
                            <span class="featured-mi-span">Mileage:</span> ${element.mileage} <br>
                            <span class="featured-hp-span">Horsepower:</span> ${element.horsepower} <br>
                            <span>Transmission:</span> ${element.transmission}
                            <br>
                            <button style="padding: 8px 16px; font-size: 14px; background-color: #001e3f; color: #fff; border: none; margin-top: 5px; border-radius: 5px; cursor: pointer; box-shadow: 0 4px 8px rgba(0,123,255,0.2);" class="btn btn-secondary btn-sm" type="button" aria-expanded="false"><a class="text-white" href="#" id="btn_edit" data-id="${element.id}"> Buy or Rent Now</a></button>
                        </p>                                
                    </div>
                </div>
            </div>
        </div>
    </div>`;

        });
        // Use the container to display the fetched data
        document.getElementById("get_data").innerHTML = container;
      } else {
        // Display a message when no results are found
        document.getElementById("get_data").innerHTML = `
            <span class="text-center">No results found.</span>
          `;
      }
  
      // Assign click event on Edit Btns
      document.querySelectorAll("#btn_edit").forEach((element) => {
        element.addEventListener("click", editAction);
      });
  
      // Assign click event on Delete Btns
      document.querySelectorAll("#btn_delete").forEach((element) => {
        element.addEventListener("click", deleteAction);
      });
    } else {
      // Get response if 400+ or 500+ status code
      errorNotification("HTTP-Error: " + response.status);
    }
  }
  
  // Submit Form Functionality; This is for Create and Update
  const form_users = document.getElementById("form_users");
  
  form_users.onsubmit = async (e) => {
    e.preventDefault();
  
    // Disable Button
    document.querySelector("#form_users button[type='submit']").disabled = true;
    document.querySelector(
      "#form_users button[type='submit']"
    ).innerHTML = `<div class="spinner-border me-2" role="status">
                        </div>
                        <span>Loading...</span>`;
  
    // Get Values of Form (input, textarea, select) set it as form-data
    const formData = new FormData(form_users);
  
    let response;
    // Check if for_update_id is empty, if empty then it's create, else it's update
    if (for_update_id == "") {
      // Fetch API User Item Store Endpoint
      response = await fetch(backendURL + "/api/honda/store", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
        body: formData,
      });
    } else {
      // Add Method Spoofing to cater Image upload coz you are using FormData; Comment if no Image upload
      formData.append("_method", "PUT");
      // Fetch API User Item Update Endpoint
      response = await fetch(backendURL + "/api/user/" + for_update_id, {
        method: "POST", // Change to PUT/PATCH if no Image Upload
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
        // Comment body below; if with Image Upload; form-data equivalent
        body: formData,
        // Uncomment body below; if no Image Upload; form-urlencoded equivalent
        // body: new URLSearchParams(formData)
      });
    }
  
    // Get response if 200-299 status code
    if (response.ok) {
      // Uncomment for debugging purpose
      // const json = await response.json();
      // console.log(json);
  
      // Reset Form
      form_users.reset();
  
      successNotification(
        "Successfully " + (for_update_id == "" ? "Added" : "updated") + "car.",
        10
      );
  
      // Close Modal Form
      document.getElementById("modal_close").click();
  
      // Reload Page
      getData();
    } else if (response.status == 422) {
      const json = await response.json();
  
      // Close Modal Form
      document.getElementById("modal_close").click();
  
      errorNotification(json.message, 10);
    }
  
    // Always reset for_update_id to empty string
    for_update_id = "";
  
    document.querySelector("#form_users button[type='submit']").disabled = false;
    document.querySelector("#form_users button[type='submit']").innerHTML =
      "Submit";
  };
  
  // Delete Functionality
  const deleteAction = async (e) => {
    // Get Id from data-id attribute within the btn_delete anchor tag
    const id = e.target.getAttribute("data-id");
  
    // Find the card element and change its style
    const cardElement = document.querySelector(`.card[data-id="${id}"]`);
    if (cardElement) {
      cardElement.style.border = "lightRed";
    }
  
    // Use JS Confirm to ask for confirmation; You can use bootstrap modal instead of this
    if (confirm("Are you sure you want to delete?")) {
      // Fetch API User Item Delete Endpoint
      const response = await fetch(backendURL + "/api/honda/destroy/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
      });
  
      // Get response if 200-299 status code
      if (response.ok) {
        // Uncomment for debugging purpose
        // const json = await response.json();
        // console.log(json);
  
        successNotification("Successfully deleted car.", 10);

      // Reload Page
      getData();
  
        // Remove the Card from the list
        if (cardElement) {
          cardElement.remove();
        }
      } else {
        errorNotification("Unable to delete!", 10);
  
        // Revert the border style if unable to delete
        if (cardElement) {
          cardElement.style.border = "white";
        }
      }
    } else {
      // Revert the border style if deletion is canceled
      if (cardElement) {
        cardElement.style.border = "white";
      }
    }
  };
  
  // Update Functionality
  const editAction = async (e) => {
    // Get Id from data-id attribute within the btn_edit anchor tag
    const id = e.target.getAttribute("data-id");
  
    // Show Functionality function call
    showData(id);
  
    // Show Modal Form
    document.getElementById("modal_show").click();
  };
  
  // Storage of Id of chosen data to update
  let for_update_id = "";
  
  // Show Functionality
  const showData = async (id) => {
    // Find the card element and change its style
    const cardElement = document.querySelector(`.card[data-id="${id}"]`);
    if (cardElement) {
      cardElement.style.border = "blue";
    }
  
    // Fetch API User Item Show Endpoint
    const response = await fetch(backendURL + "/api/honda/show/" + id, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
    });
  
    // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
      // console.log(json);
  
      // Store id to a variable; id will be utilized for update
      for_update_id = json.id;
  
      // Display json response to Form tags; make sure to set id attribute on tags (input, textarea, select)
      document.getElementById("name").value = json.name;
      document.getElementById("model").value = json.model;
      document.getElementById("mileage").value = json.mileage;
      document.getElementById("horsepower").value = json.horsepower;
      document.getElementById("transmission").value = json.transmission;
      document.getElementById("price").value = json.price;
  
      // Change Button Text using textContent; either innerHTML or textContent is fine here
      document.querySelector("#form_users button[type='submit']").innerHTML =
        "Submit";

    // Change Button Text using textContent; either innerHTML or textContent is fine here
    document.querySelector("#form_modal h1.modal-title").innerHTML =
    "BUY OR Rent A CAR";

    // Hide the element with class "hide"
    document.querySelector("#form_users div.hide").style.display = "none";

    document.querySelector("#form_users p.show").innerHTML = `
    <!-- Transaction field -->
    <div class="row mb-3">
        <div class="col-sm-3">
            <label for="transaction">Transaction Type</label>
        </div>
        <div class="col-sm-9">
        <select 
            class="form-control" 
            id="transaction" 
            name="transaction" 
            type="text"
        />
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
        </select>
        </div>
    </div>
    <p class="text-danger">*fillout the remaining fields below if the transaction is rent, leave it blanck if not.</p>
    <!-- Rent from field -->
    <div class="row mb-3">
        <div class="col-sm-3">
            <label for="rent_from">Rent from</label>
        </div>
        <div class="col-sm-9">
        <input 
            class="form-control" 
            id="rent_from" 
            name="rent_from" 
            type="date"
            />
        </div>
    </div>
    <!-- Rent to field -->
    <div class="row mb-3">
        <div class="col-sm-3">
            <label for="rent_to">Rent to</label>
        </div>
        <div class="col-sm-9">
        <input 
            class="form-control" 
            id="rent_to" 
            name="rent_to" 
            type="date"
            />
        </div>
    </div>`;

    } else {
      errorNotification("Unable to show!", 10);
  
      // Revert the border style if unable to show
      if (cardElement) {
        cardElement.style.border = "white";
      }
    }
  };
  