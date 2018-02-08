import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

console.log("Login");

// Ajax call
$.ajax({
  url: "http://localhost:3131"
  data: {
    login: "",
    password: "",
  },
  method: "GET",
  dataType: "json",
  error: (request, status, error) => {
    // Treat error
  },
  success: (data, status, request) => {

  }
});
