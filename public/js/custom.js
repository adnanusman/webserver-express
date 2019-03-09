fetch('http://localhost:3000/weather?address=Google').then((response) => {
  if(response) {
    return response.json();
  }
}).then((data) => {
  console.log(data);
})