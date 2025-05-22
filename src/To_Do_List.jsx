import React, { useState } from "react";

const Example7 = () => {

  const [message, setMessage] = useState({
    text: "",
    id: "",
  });

  const [list, setList] = useState([]);

  const [editingItem, setEditingItem] = useState({ id: "", isEditing: false });

  const changeMessage = (e) => {
    setMessage({
      ...message,
      text: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.text.length !== 0) {
      let newToDo = {
        text: message.text,
        id: new Date().getTime().toString(),
      };
      setList([...list, newToDo]);
      setMessage({ text: "" });
    }
     else
      {
      alert("Enter some text to add items");
    }
  };
  


  const handleEdit = (id) => {
    setEditingItem({
      ...editingItem,
      id: id,
      isEditing: true,
    });

    let editableItem = list.find((eachItem) => eachItem.id === id);

    setMessage({
      ...message,
      text: editableItem.text,
      id: editableItem.id,
    });
  };


  const handleEditingItem = (e) => {
    e.preventDefault();
    let newTodos = list.map((eachItem) => {
      if (eachItem.id === editingItem.id) {
        return {
          text: message.text,
          id: editingItem.id,
        };
      } else {
        return eachItem;
      }
    });

    setList(newTodos);

    setMessage({
      text: "",
      id: "",
    });

    setEditingItem({
      id: "",
      isEditing: false,
    });
  };


  const handleDelete = (id) => {
    let newTodos = list.filter((eachItem) => {
      return eachItem.id !== id;
    });
    setList(newTodos);
  };

  return (
    <div>
      <div className="outerdiv">
        <h1 className="header">To Do List</h1>
        <div className="container1">
          <form>
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Enter Some Text"
              value={message.text}
              onChange={changeMessage}
            />

            {editingItem.isEditing ? (
              <button onClick={handleEditingItem} type="submit" id="save">
                Save
              </button>
            ) : (
              <button onClick={handleSubmit} type="submit" className="add">
                Add
              </button>
            )}

          </form>

          
        </div>
      </div>

      {!list.length && <h3 id="emptylist">No Items In The List</h3>}
      <div className="container2">
        <div className="container3">
          <ol id="ol">
            {list.map((eachItem) => {
              const { text, id } = eachItem;
              return (
                <li key={id}>
                  <span id="span">{text}</span>
                  <button id="edit" onClick={() => handleEdit(id)}>
                    Edit
                  </button>
                  <button id="delete" onClick={() => handleDelete(id)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};
export default Example7;
