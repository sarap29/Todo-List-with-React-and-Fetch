import React from "react";
import { useState } from "react";


const Contador = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

const KeyPress = (e) => {
  if (e.key === "Enter" && inputValue != ""){
    setTodos(todos.concat(inputValue))
    setInputValue('')
} 
};

const KeyPlus = () => {
  if (inputValue != ""){
    setTodos(todos.concat(inputValue))
    setInputValue('')
  }
}

//Add into array - concat
//Delete from array - filter
//Update - map

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
              onKeyDown={KeyPress}
              placeholder="What needs to be done?"
            />
          </div>
          <div className="col-2">
            <i className="fa-solid fa-plus" onClick={KeyPlus}></i>
          </div>
        </div>

        <div className="row">
             <ul className="nueva">
              {todos.map((item, index) => (
                <li key={index} className="row entrada">
                  <div className="col-11">{item}</div>
                  <div className="col-1">
                    <i
                      className="fa-solid fa-minus"
                      onClick={() => {
                      setTodos(todos.filter((t, currentIndex) => index !== currentIndex))}}
                    >
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
export default Contador;