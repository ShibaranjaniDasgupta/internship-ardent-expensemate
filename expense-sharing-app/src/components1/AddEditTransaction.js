import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  max-height: 80vh; /* Adjust this value as needed */
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

function AddEditTransaction({ 
  setShowAddEditTransactionModal, 
  showAddEditTransactionModal, 
  selectedItemForEdit, 
  setSelectedItemForEdit, 
  getTransactions 
}) {
  const [form, setForm] = React.useState({
    amount: '',
    type: 'income',
    category: 'salary',
    date: '',
    reference: '',
    description: '',
    shared_with: ''
  });

  useEffect(() => {
    if (selectedItemForEdit) {
      setForm({
        ...selectedItemForEdit,
        date: dayjs(selectedItemForEdit.date).format('YYYY-MM-DD')
      });
    } else {
      setForm({
        amount: '',
        type: 'income',
        category: 'salary',
        date: '',
        reference: '',
        description: '',
        shared_with: ''
      });
    }
  }, [selectedItemForEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('expense-app'));
      if (selectedItemForEdit) {
        await axios.post('/api/transactions/edit-transaction', {
          payload: { ...form, userid: user._id },
          transactionId: selectedItemForEdit._id
        });
        getTransactions();
      } else {
        await axios.post('/api/transactions/add-transaction', { ...form, userid: user._id });
        getTransactions();
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  return (
    showAddEditTransactionModal && (
      <ModalOverlay>
        <ModalContent>
          <h2>{selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Amount</Label>
              <Input type="number" name="amount" value={form.amount} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Type</Label>
              <Select name="type" value={form.type} onChange={handleChange} required>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Select name="category" value={form.category} onChange={handleChange} required>
                <option value="salary">Salary</option>
                <option value="freelance">Freelance</option>
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="education">Education</option>
                <option value="medical">Medical</option>
                <option value="tax">Tax</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Date</Label>
              <Input type="date" name="date" value={form.date} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Reference</Label>
              <Input type="text" name="reference" value={form.reference} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input type="text" name="description" value={form.description} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>Shared With</Label>
              <Input type="text" name="shared_with" value={form.shared_with} onChange={handleChange} />
            </FormGroup>
            <Button type="submit">Save</Button>
          </Form>
        </ModalContent>
      </ModalOverlay>
    )
  );
}

export default AddEditTransaction;
