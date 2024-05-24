// import router
import {setRouter} from "../router/router.js";

// Set Router
setRouter();


const backendURL = "http://ling-backend.test";

let userId;

// Get Logged User Profile Name
async function getLoggedUser(){

    // Access User Profile API Endpoint
    const response = await fetch(
      backendURL + "/api/profile/show",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
      }
    );
  
  // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
      console.log(json);

      // FULL NAME (firstname + lastname)
      // Using getElementsByClassName instead of getElementById
      const userLoggedNameElements = document.getElementsByClassName("user_logged_name");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedNameElements.length; i++) {
          userLoggedNameElements[i].innerHTML = json.firstname + " " + json.lastname;
      }

      // Starts Here
      
      // FULL NAME
      // Using getElementById instead of getElementsByClassName
      const userLoggedName = document.getElementById("user_name");

      // Check if the element exists before updating its content
      if (userLoggedName) {
          userLoggedName.innerHTML = json.name;
      }

      // EMAIL
      // Using getElementById instead of getElementsByClassName
      const userLoggedEMail = document.getElementById("user_email");

      // Check if the element exists before updating its content
      if (userLoggedEMail) {
          userLoggedEMail.innerHTML = json.email;
      }

      // PHONE
      // Using getElementById instead of getElementsByClassName
      const userLoggedPhone = document.getElementById("user_phone");

      // Check if the element exists before updating its content
      if (userLoggedPhone) {
          userLoggedPhone.innerHTML = json.phone;
      }

      // ADDRESS
      // Using getElementById instead of getElementsByClassName
      const userLoggedAddress = document.getElementById("user_address");

      // Check if the element exists before updating its content
      if (userLoggedAddress) {
         userLoggedAddress.innerHTML = json.address;
      }

      // USERNAME
      // Using getElementById instead of getElementsByClassName
      const userLoggedUsername = document.getElementById("user_username");

      // Check if the element exists before updating its content
      if (userLoggedUsername) {
          userLoggedUsername.innerHTML = json.username;
      }

      // Assuming `element` is passed as an argument to the function
function getLoggedUser(element) {
  // Ensure `element` is defined and has the `created_at` property
  if (element && element.created_at) {
      // Format the date
      const created_at = new Date(element.created_at).toLocaleString();

      // Use getElementById instead of getElementsByClassName
      const userLoggedCreatedAt = document.getElementById("user_created_at");

      // Check if the element exists before updating its content
      if (userLoggedCreatedAt) {
          userLoggedCreatedAt.innerHTML = created_at; // Use the formatted date
      }
  } else {
      console.error('Invalid element or missing created_at property');
  }
}

// Example usage:
// Assuming you have a JSON object with a created_at property
const exampleElement = {
  created_at: '2023-05-23T12:34:56Z'
};

// Call the function with the exampleElement
getLoggedUser(exampleElement);



      // Ends Here


      // Display user's image
      const imagePath = backendURL + "/storage/" + json.image;
      // Using getElementsByClassName instead of getElementById
      const userLoggedImageElements = document.getElementsByClassName("user_logged_image");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedImageElements.length; i++) {
          userLoggedImageElements[i].src = imagePath;
      }

      // ROLE
      // Using getElementsByClassName instead of getElementById
      const userLoggedRoleElements = document.getElementsByClassName("user_logged_role");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedRoleElements.length; i++) {
        const element = userLoggedRoleElements[i];
        element.innerHTML = element.value = json.role;
      }

      // FIRSTNAME
      // Using getElementsByClassName instead of getElementById
      const userLoggedFirstNameElements = document.getElementsByClassName("user_logged_firstname");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedFirstNameElements.length; i++) {
        const element = userLoggedFirstNameElements[i];
        element.innerHTML = element.value = json.firstname;
      }

      // LASTNAME
      // Using getElementsByClassName instead of getElementById
      const userLoggedLastNameElements = document.getElementsByClassName("user_logged_lastname");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedLastNameElements.length; i++) {
        const element = userLoggedLastNameElements[i];
        element.innerHTML = element.value = json.lastname;
      }

      // EMAIL
      // Using getElementsByClassName instead of getElementById
      const userLoggedEmailElements = document.getElementsByClassName("user_logged_email");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedEmailElements.length; i++) {
        const element = userLoggedEmailElements[i];
        element.innerHTML = element.value = json.email;
      }

      // EMAIL (using ID selector)
      const userLoggedEmailElement = document.getElementById("user_logged_email");

      if (userLoggedEmailElement) {
        userLoggedEmailElement.innerHTML = userLoggedEmailElement.value = json.email;
      }


      // USER ID
      // Sets value to the input field with id "user_id"
      const UserId = document.getElementById("user_id");

      // Check if the element exists before updating its content
      if (UserId) {
        UserId.value = json.id;
      }
      
    }

  // Get response if 400 or 500 status code
    else {
      const json = await response.json();
  
      errorNotification(json.message, 10);
  
    }
};

// Show Nav Admin Pages
// function showNavAdminPages() {
//   if (localStorage.getItem("role") == "Admin") {
//    document.getElementById("nav_admin_pages").innerHTML = 
//     ` <!-- Modal -->
//     <div
//     class="modal fade"
//     id="form_modal"
//     data-bs-backdrop="static"
//     data-bs-keyboard="false"
//     tabindex="-1"
//     aria-labelledby="staticBackdropLabel"
//     aria-hidden="true"
//     >
//     <div class="modal-dialog modal-lg">
//         <div class="modal-content">
//         <div class="modal-header">
//             <h1 class="modal-title fs-5" id="staticBackdropLabel">
//             ADD A CAR
//             </h1>
//             <button
//             id="modal_close"
//             type="button"
//             class="btn-close"
//             data-bs-dismiss="modal"
//             aria-label="Close"
//             ></button>
//         </div>
//         <!-- Users Form -->
//         <form id="form_users">
//             <!-- Modal Body -->
//             <div class="modal-body">
//             <!-- User Id Field -->
//             <input type="hidden" name="user_id" id="user_id" />
//             <!-- Image File Field -->
//             <div class="row mb-3 hide">
//                 <div class="col-sm-3">
//                     <label for="image">Image</label>
//                 </div>
//                 <div class="col-sm-9">
//                 <input
//                     class="form-control"
//                     type="file"
//                     name="image"
//                     id="image"
//                     accept="image/*"
//                 />
//                 </div>
//             </div>
//             <!-- Car Name Field -->
//             <div class="row mb-3">
//                 <div class="col-sm-3">
//                     <label for="name">Car Name</label>
//                 </div>
//                 <div class="col-sm-9">
//                 <input
//                     class="form-control"
//                     type="text"
//                     name="name"
//                     id="name"
//                     required
//                 />
//                 </div>
//             </div>
//             <!-- Model Field -->
//             <div class="row mb-3">
//                 <div class="col-sm-3">
//                     <label for="model">Model</label>
//                 </div>
//                 <div class="col-sm-9">
//                 <input
//                     type="text"
//                     class="form-control"
//                     name="model"
//                     id="model"
//                     required
//                 ></input>
//                 </div>
//             </div>
//             <!-- Mileage Field -->
//             <div class="row mb-3">
//                 <div class="col-sm-3">
//                     <label for="mileage">Mileage</label>
//                 </div>
//                 <div class="col-sm-9">
//                 <input
//                     class="form-control"
//                     name="mileage"
//                     id="mileage"
//                     type="text"
//                     required
//                 ></input>
//                 </div>
//             </div>
//             <!-- Horsepower Field -->
//             <div class="row mb-3">
//                 <div class="col-sm-3">
//                     <label for="horsepower">Horsepower</label>
//                 </div>
//                 <div class="col-sm-9">
//                 <input
//                     type="text"
//                     class="form-control"
//                     name="horsepower"
//                     id="horsepower"
//                     required
//                 ></input>
//                 </div>
//             </div>
//             <!-- Transmission field -->
//             <div class="row mb-3">
//                 <div class="col-sm-3">
//                     <label for="transmission">Transmission</label>
//                 </div>
//                 <div class="col-sm-9">
//                 <input 
//                     class="form-control" 
//                     id="transmission" 
//                     name="transmission" 
//                     type="text"
//                     required/>
//                 </div>
//             </div>
//             <!-- Price field -->
//             <div class="row mb-3">
//                 <div class="col-sm-3">
//                     <label for="price">Price</label>
//                 </div>
//                 <div class="col-sm-9">
//                 <input 
//                     class="form-control" 
//                     id="price" 
//                     name="price" 
//                     type="text"
//                     required/>
//                 </div>
//             </div>

//             <!-- Show fields (it will show if the user will rent or order a car) -->
//             <p class="show"></p>

//             <!-- End of fields -->
//             </div>
//             <!-- Modal Footer -->
//             <div class="modal-footer">
//             <button
//                 id="modal_close"
//                 type="button"
//                 class="btn btn-secondary"
//                 data-bs-dismiss="modal"
//             >
//                 Close
//             </button>
//             <button
//                 class="btn btn-primary w-25 d-flex align-items-center justify-content-center"
//                 type="submit"
//             >
//                 Submit
//             </button>
//             </div>
//         </form>
//         <!-- End Slides Form -->
//         </div>
//     </div>
//     </div>
//     <!-- End Modal -->

    
//     <div class="row">
//         <div class="col-sm-12 mb-1">
//         <div class="float-end col-sm-1 d-flex justify-content-center mb-1">
//         <!-- Button trigger modal -->
//         <button
//             id="modal_show"
//             type="button"
//             class="btn btn-primary w-100"
//             data-bs-toggle="modal"
//             data-bs-target="#form_modal"
//         >
            
//         </button>
//         <!-- End Button trigger modal  -->
//         </div>
//     </div>`;
//   }
// }

// Notifications
function successNotification(message, seconds = 0){
  const successAlert = document.querySelector(".alert-success");
  if (successAlert) {
      successAlert.classList.remove('d-none');
      successAlert.classList.add('d-block');
      successAlert.innerHTML = message;

      if (seconds != 0) {
          setTimeout(function () {
              successAlert.classList.remove('d-block');
              successAlert.classList.add('d-none');
          }, seconds * 1000);
      }
  } else {
      console.error("Error: .alert-success element not found");
  }
}

function errorNotification(message, seconds = 0){
  const errorAlert = document.querySelector(".alert-danger");
  if (errorAlert) {
      errorAlert.classList.remove('d-none');
      errorAlert.classList.add('d-block');
      errorAlert.innerHTML = message;

      if (seconds != 0) {
          setTimeout(function () {
              errorAlert.classList.remove('d-block');
              errorAlert.classList.add('d-none');
          }, seconds * 1000);
      }
  } else {
      console.error("Error: .alert-danger element not found");
  }
}


export { backendURL, successNotification, errorNotification, getLoggedUser, userId
};