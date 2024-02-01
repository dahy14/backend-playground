const spann = document.getElementById("get-this-bitch");

fetch("http://localhost:1234/v1", {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
