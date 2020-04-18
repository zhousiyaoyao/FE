axios.get("https://api.github.com/users/louiszhai")
  .then(function(response){
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });