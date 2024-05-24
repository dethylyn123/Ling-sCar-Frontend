import { backendURL, successNotification, errorNotification, getLoggedUser } from "../utils/utils.js";

// calling function - important to execute the code inside the function
getLoggedUser();

document.addEventListener('DOMContentLoaded', () => {
  const form_audi = document.getElementById('form_audi');

  // Check if form_audi exists to avoid errors
  if (form_audi) {
    form_audi.onsubmit = async (e) => {
      e.preventDefault();

      // Disable button and show spinner
      const submitButton = form_audi.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = 
        `<div class="col-sm-12 d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <b class="ms-2">Loading...</b>
        </div>`;

      // Get values of form (input, textarea, select) put it as form-data
      const formData = new FormData(form_audi);

      try {
        const response = await fetch(
          backendURL + "/api/audicar/store",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
            },
            body: formData,
          }
        );

        // Get response if 200-299 status code
        if (response.ok) {
          successNotification("Successfully added a new audi car.", 10);
          // Reset Form
          form_audi.reset();
        } 
        // Get response if 422 status code
        else if (response.status === 422) {
          const json = await response.json();
          errorNotification(json.message, 10);
        }
      } catch (error) {
        errorNotification("An error occurred while creating the post.", 10);
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
      }
    };
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const form_audi = document.getElementById('form_ford');

  // Check if form_audi exists to avoid errors
  if (form_ford) {
    form_ford.onsubmit = async (e) => {
      e.preventDefault();

      // Disable button and show spinner
      const submitButton = form_ford.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = 
        `<div class="col-sm-12 d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <b class="ms-2">Loading...</b>
        </div>`;

      // Get values of form (input, textarea, select) put it as form-data
      const formData = new FormData(form_ford);

      try {
        const response = await fetch(
          backendURL + "/api/ford/store",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
            },
            body: formData,
          }
        );

        // Get response if 200-299 status code
        if (response.ok) {
          successNotification("Successfully added a new ford car.", 10);
          // Reset Form
          form_ford.reset();
        } 
        // Get response if 422 status code
        else if (response.status === 422) {
          const json = await response.json();
          errorNotification(json.message, 10);
        }
      } catch (error) {
        errorNotification("An error occurred while creating the post.", 10);
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
      }
    };
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form_audi = document.getElementById('form_bmw');

  // Check if form_audi exists to avoid errors
  if (form_bmw) {
    form_bmw.onsubmit = async (e) => {
      e.preventDefault();

      // Disable button and show spinner
      const submitButton = form_bmw.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = 
        `<div class="col-sm-12 d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <b class="ms-2">Loading...</b>
        </div>`;

      // Get values of form (input, textarea, select) put it as form-data
      const formData = new FormData(form_bmw);

      try {
        const response = await fetch(
          backendURL + "/api/bmw/store",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
            },
            body: formData,
          }
        );

        // Get response if 200-299 status code
        if (response.ok) {
          successNotification("Successfully added a new BMW car.", 10);
          // Reset Form
          form_bmw.reset();
        } 
        // Get response if 422 status code
        else if (response.status === 422) {
          const json = await response.json();
          errorNotification(json.message, 10);
        }
      } catch (error) {
        errorNotification("An error occurred while creating the post.", 10);
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
      }
    };
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form_audi = document.getElementById('form_honda');

  // Check if form_audi exists to avoid errors
  if (form_honda) {
    form_honda.onsubmit = async (e) => {
      e.preventDefault();

      // Disable button and show spinner
      const submitButton = form_honda.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = 
        `<div class="col-sm-12 d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <b class="ms-2">Loading...</b>
        </div>`;

      // Get values of form (input, textarea, select) put it as form-data
      const formData = new FormData(form_honda);

      try {
        const response = await fetch(
          backendURL + "/api/honda/store",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
            },
            body: formData,
          }
        );

        // Get response if 200-299 status code
        if (response.ok) {
          successNotification("Successfully added a new honda car.", 10);
          // Reset Form
          form_honda.reset();
        } 
        // Get response if 422 status code
        else if (response.status === 422) {
          const json = await response.json();
          errorNotification(json.message, 10);
        }
      } catch (error) {
        errorNotification("An error occurred while creating the post.", 10);
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
      }
    };
  }
});
