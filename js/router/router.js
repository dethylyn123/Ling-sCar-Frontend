function setRouter() {
    switch (window.location.pathname) {
        // If you are logged in you cant access outside pages
        case "/login.html":
        case "/signup.html":
        case "/":
            if (localStorage.getItem("token")) {
                window.location.pathname = "/profile.html"
            }
            break;
        // If you are not logged in you can't access profile page
        case "/profile.html":
        case "/audi.html":
        case "/ford.html":
        case "/bmw.html":
        case "/honda.html":
            if (!localStorage.getItem("token")) {
                window.location.pathname = "/login.html";
            }
            break;
        // Redirect to login page if not logged in or not an admin
        case "/addcars.html":
        if (!localStorage.getItem("token") || localStorage.getItem("role") !== "Admin") {
            window.location.pathname = "/index.html";
        }
        break;

    }
}

export {setRouter};