import React, { useState } from 'react';
import './Form.css';
import axios from 'axios';

const FormComponent = () => {
  const [inputText, setInputText] = useState('');
  const [inputList, setInputList] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post('http://localhost:3000/api/form', { value: inputText, checked: false })
      .then((response) => {
        console.log(response.data);
        setInputList([...inputList, { value: inputText, checked: false }]);
        setInputText('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckboxChange = (index) => {
    const updatedList = [...inputList];
    updatedList[index] = {
      ...updatedList[index],
      checked: !updatedList[index].checked
    };
    setInputList(updatedList);
  };

  const handleDelete = (index) => {
    const item = inputList[index];
  
    // Kirim permintaan DELETE ke endpoint dengan ID item yang akan dihapus
    axios.delete(`/api/form/${item.id}`)
      .then(response => {
        // Jika penghapusan berhasil, perbarui state inputList di sisi klien
        const updatedList = [...inputList];
        updatedList.splice(index, 1);
        setInputList(updatedList);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text"
          className="input-field"
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <ul className="input-list">
        {inputList.map((item, index) => (
          <li key={index} className="input-item">
            <input
              type="checkbox"
              checked={item.checked || false}
              onChange={() => handleCheckboxChange(index)}
              className="checkbox"
            />
            <span className={item.checked ? 'checked-text' : 'unchecked-text'}>{item.value}</span>
            <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormComponent;