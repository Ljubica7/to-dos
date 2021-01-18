import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());

  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [status, setStatus] = useState("all");
  const [filtered, setFiltered] = useState([]);
  const [alert, setAlert] = useState({
    show: true,
    msg: "asda",
    type: "danger",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "empty field");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "changed to do");
    } else {
      showAlert(true, "success", "added to do");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "removed to do");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const completeToggle = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFiltered(list.filter((item) => item.completed));
        break;
      case "uncompleted":
        setFiltered(list.filter((item) => !item.completed));
        break;
      default:
        setFiltered(list);
        break;
    }
  };

  useEffect(() => {
    filterHandler();
  }, [list, status]);

  //fake api get
  // useEffect(() => {
  //   fetch("http://localhost:8000/list")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setList(data);
  //     });
  // }, []);

  // local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className='section-center'>
      <form className='list-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>My To Dos</h3>
        <div className='form-control'>
          <input
            type='text'
            className='list-input'
            placeholder='to do...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? "edit" : "add"}
          </button>
        </div>
        <div className='form-control '>
          <button
            type='button'
            className='btn status-btn'
            value='all'
            onClick={statusHandler}
          >
            all
          </button>
          <button
            type='button'
            className='btn status-btn'
            value='completed'
            onClick={statusHandler}
          >
            completed
          </button>
          <button
            type='button'
            className='btn status-btn'
            value='uncompleted'
            onClick={statusHandler}
          >
            uncompleted
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className='list-container'>
          <List
            items={list}
            removeItem={removeItem}
            editItem={editItem}
            completeToggle={completeToggle}
            filtered={filtered}
          />
          <button className='clear-btn' onClick={clearList}>
            clear all to dos
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
