import { backendURL, successNotification, errorNotification, getLoggedUser } from "../utils/utils.js";

// calling function - important to execute the code inside the function
getLoggedUser();

document.addEventListener('DOMContentLoaded', () => {
  const form_users = document.getElementById('form_users');

  // Check if form_users exists to avoid errors
  if (form_users) {
    form_users.onsubmit = async (e) => {
      e.preventDefault();

      // Disable button and show spinner
      const submitButton = form_users.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = 
        `<div class="col-sm-12 d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <b class="ms-2">Loading...</b>
        </div>`;

      // Get values of form (input, textarea, select) put it as form-data
      const formData = new FormData(form_users);

      try {
        const response = await fetch(
          backendURL + "/api/history/store",
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
          successNotification("You have successfully make a transaction.", 10);
          // Reset Form
          form_users.reset();

          // Close Modal Form
        document.getElementById("modal_close").click();
        
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
