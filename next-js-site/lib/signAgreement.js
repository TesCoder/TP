
const signAgreement = async (data) => {
  console.log("FETCH GOT:", data)
  return fetch('/api/sign', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export default signAgreement;
