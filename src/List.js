import React, {useState, useEffect} from 'react';
import './List.css';

function List(){
    const [newItem, setNewItem] = useState("");
    const [list, setList] = useState([]);
    
    useEffect(() => {
        const retrievedList = window.localStorage.getItem("list");
        const parsedList = JSON.parse(retrievedList);
        setList(parsedList)
      }, []);
    
      function updateInput(value) {
        // update react state
        setNewItem(value);

      }
    
      // adds task to task list
      function addItem() {
        // object for retrieving date
        let currentDate = new Date();
        let dateTime = ("0" + (currentDate.getMonth() + 1)).slice(-2) + "/"
          + ("0" + currentDate.getDate()).slice(-2) + "/"
          + currentDate.getFullYear() + " @ "
          + ("0" + currentDate.getHours()).slice(-2) + ":"
          + ("0" + currentDate.getMinutes()).slice(-2) + ":"
          + ("0" + currentDate.getSeconds()).slice(-2);
    
        // create a new item with unique id
        const newListItem = {
          id: Date.now()/*1 + Math.random()*/,
          value: newItem.slice(),
          date: "Task created on: " + dateTime
        };
        
        // copy current list of items
        const newList = [...list];
    
        // add the new item to the top of the list
        newList.unshift(newListItem);
    
        // update state with new list, reset the new item input
        window.localStorage.setItem("list", JSON.stringify(newList))
        setList(newList);
        setNewItem("");
        // set focus back to input box after adding a task
        document.getElementById("inputBox").focus();
      }
    
      // deletes task from task list
      function deleteItem(id) {
        // copy current list of items
        // filter out the item being deleted
        const updatedList = list.filter(item => item.id !== id);
        // updates state with new list
        window.localStorage.setItem("list", JSON.stringify(updatedList))
        setList(updatedList);
        };
      
      return(
        <div className="App">
            <h1 className="app-header">To-Do List</h1>
                <div className="container">
                    <form className="list-form" onSubmit={() => addItem()}>
                        <input
                            className="input-box"
                            id="inputBox"
                            type="text"
                            placeholder="Type task here"
                            value={newItem}
                            onChange={e => updateInput(e.target.value)}
                        />
                        <button
                            className="add-btn btn-floating"
                            onClick={() => addItem()}
                            disabled={!newItem.length}
                        >
                            <i className="material-icons"> + </i>
                        </button>
                        <br />
                        <ul className="list-wrapper">
                            {list.map(item => {
                                return (
                                <li className="item-list" key={item.id}>
                                    <button className="delete-btn btn-floating" onClick={() => deleteItem(item.id)}>
                                        <i className="material-icons">X</i>
                                    </button>
                                    {item.value}
                                    <br />
                                    <div className="item-date">
                                        {item.date}
                                    </div>
                                </li>
                                );
                            })}
                        </ul>
                    </form>
                </div>
        </div>
      )
    }

export default List;