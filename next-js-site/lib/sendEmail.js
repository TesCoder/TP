
const sendEmail = async (data) => {
  // Suffix class year with A or B depending on time of year
  // Month is zero-indexed
  // A if 5(June) >= month <= 11(Dec)
  const month = new Date().getMonth()
  data = { ...data, year: month >= 5 && month <= 11 ? data.year + "A" : data.year + "B" }

  return fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export default sendEmail;