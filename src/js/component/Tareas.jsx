import React, { useEffect, useState } from "react";


const Tareas = () => {
const [inputValue, setInputValue] = useState("");
const [todos, setTodos] = useState([]);


//Añadir tareas en el input pulsando enter
const añadirTareaEnter = (e) => {
  if (e.key === "Enter" && inputValue.trim() !== ""){
    setTodos([...todos, {label: inputValue, done: false }]);
    setInputValue('')
  } 
};

const añadirTareaBoton = () => {
  if (inputValue.trim() !== ""){
    setTodos([...todos, {label: inputValue, done: false }]);
    setInputValue('')
  }
}


//Eliminar tareas con el ICONO -
const eliminarTareas = (index) => {
  let eliminar = todos.filter((t, i) => i !== index);
  setTodos(eliminar);
};



//METODO GET - Obtener una lista de tareas pendientes para un usuario en particular
let requestOptions = {
  method: 'GET',
  headers: { "Content-Type": "application/json", },
};


const mostrarTareas = () => {
  fetch("https://playground.4geeks.com/apis/fake/todos/user/sarap", requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)
  setTodos(result)
     
   })
  .catch(error => console.log('error', error));}

useEffect(() => {
  mostrarTareas();
}, [])



// PUT Actualice la lista completa de tareas // 
var requestOptionsPut = {
  method: 'PUT',
  headers: {"Content-Type": "application/json",},
  body: JSON.stringify(todos),
};

  const actualizarTareas = () => {
  fetch("https://playground.4geeks.com/apis/fake/todos/user/sarap", requestOptionsPut)
  .then(response => response.json())  // convertir a json
  .then(result => {console.log(result) //imprimir (el resultado) los datos en la consola
  useState(result)})
  .catch(error => console.log('error', error));}  // Capturar errores

  useEffect(() => {
    actualizarTareas();
  }, [todos])



return (
  <div className="container-fluid">
    <div className="lista">
      <h1 className="row pb-3">Things to do</h1>
        <div className="row texto">
          <div className="col-10">
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              onKeyDown={añadirTareaEnter}
              placeholder="What needs to be done?"
            />
          </div>
          <div className="col-2">
            <i className="fa-solid fa-plus" onClick={añadirTareaBoton}></i>
          </div>
        </div>
        <div className="row">
             <ul className="nueva">
              {todos.map((item, index) => (
                <li key={index} className="row entrada">
                  <div className="col-11">{item.label}</div>
                  <div className="col-1">
                    <i
                      className="fa-solid fa-minus"
                      onClick={() => eliminarTareas(index)}>
                    </i>
                  </div>
                </li>
              ))}
           </ul>
        </div>
      <div className="row items">{todos.length} items</div>
    </div>
  </div>
);
};
export default Tareas;