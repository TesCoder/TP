import { useState } from 'react';

const useContactForm = () => {
  const [values, setValues] = useState({
    fname: '',
    lname: '',
    location: '',
    email: '',
    phone: '',
    year: 'JR',
    contact: [],
    option: [],
    info: [],
    heard: [],
    service: ''
  });

  const handleChange = (e) => {
    // console.log("UPDATING:", e.target.name, e.target.value)
    setValues(prevState => {
      if (e.target.type == "checkbox") {
        // console.log("/UPDATING CHECKBOX", e.target.name, e.target.value, values)
        return {
          ...prevState,
          // adds and removes when item is checked/onchecked, respectively
          [e.target.name]: e.target.checked ? [...values[e.target.name], e.target.value] : values[e.target.name].filter((item) => item !== e.target.value),
        };
      }

      return {
        ...prevState,
        // object assignment
        [e.target.name]: e.target.value,
      };
    });
  };

  return { values, handleChange };
};

export default useContactForm;