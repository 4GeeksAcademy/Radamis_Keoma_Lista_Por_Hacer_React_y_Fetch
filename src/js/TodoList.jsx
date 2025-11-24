export default function obtenerTareas(){

  return fetch('https://playground.4geeks.com/todo/users/radamis')
    .then(resp => resp.json())
    .catch(error => {
       
        console.log(error);
    }); 
  }

