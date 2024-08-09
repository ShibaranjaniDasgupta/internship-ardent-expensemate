import React from 'react';
import { useState } from 'react';
const colors = {
  darkNavy: '#020c1b',
  navy: '#0a192f',
  lightNavy: '#112240',
  navyShadow: '#020c1bb3',
  darkSlate: '#495670',
  slate: '#8892b0',
  lightSlate: '#a8b2d1',
  green: '#64ffda',
  glowColor: '#09b9ad',
};

const AddExpense = ({ addExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [sharedWith, setSharedWith] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      description,
      amount,
      date,
      sharedWith,
    };
    addExpense(newExpense);
    setDescription('');
    setAmount('');
    setDate('');
    setSharedWith('');
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.form}>
        <h1 style={styles.title}>Add Your Expense</h1>

        <form onSubmit={handleSubmit}>
          <div style={styles.formControl}>
            <label htmlFor="description" style={styles.label}>Description</label>
            <input
              id="description"
              type="text"
              style={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={styles.formControl}>
            <label htmlFor="amount" style={styles.label}>Amount</label>
            <input
              id="amount"
              type="number"
              style={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div style={styles.formControl}>
            <label htmlFor="date" style={styles.label}>Date</label>
            <input
              id="date"
              type="date"
              style={styles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div style={styles.formControl}>
            <label htmlFor="sharedWith" style={styles.label}>Shared with</label>
            <textarea
              id="sharedWith"
              style={{ ...styles.input, height: '100px', resize: 'vertical' }}
              value={sharedWith}
              onChange={(e) => setSharedWith(e.target.value)}
            />
          </div>

          <button style={styles.button} type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    maxWidth: '400px',
    width: '100%',
    backgroundColor: colors.lightNavy,
    borderRadius: '10px',
    boxShadow: `0 0 10px ${colors.navyShadow}`,
    margin: '0 auto',
  },
  title: {
    marginBottom: '1px',
    fontSize: '2rem',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    marginBottom: '8px',
    color: colors.green,
  },
  input: {
    backgroundColor: colors.navy,
    color: colors.green,
    padding : '16px',
    borderRadius: '5px',
    border: 'none',
    width: '100%',
    boxShadow: 'none',
    transition: 'box-shadow 0.3s, border 0.3s',
  },
  button: {
    backgroundColor: colors.green,
    margin: '20px',
    color: colors.lightNavy,
    fontWeight: 'bold',
    padding: '16px',
    borderRadius: '5px',
    border: 'none',
    width: '60%',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
};

export default AddExpense;


