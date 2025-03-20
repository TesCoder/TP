import { useState } from 'react';

const useAgreementForm = (defaults) => {
  const [values, setValues] = useState({
    date: new Date().toLocaleDateString(),
    year: new Date().getFullYear(),
    client: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    coach: '',
    payment: '',
    signature: '',
    // packageType: '',
    // schools: '',
    // price: '',
    ...defaults
  });

  const handleChange = (e) => {
    setValues(prevState => {
      if (e.target.type == "checkbox") {
        // console.log("/UPDATING CHECKBOX", e.target.name, e.target.value, values)
        return {
          ...prevState,
          [e.target.name]: e.target.checked ? [...values[e.target.name], e.target.value] : values[e.target.name].filter((item) => item !== e.target.value),
        };
      }

      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return { values, handleChange };
};

export default useAgreementForm;