import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import styled from 'styled-components';

const AnalyticsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  color: white;
`;

const AnalyticsBox = styled.div`
  width: 45%;
  background-color: #1f1f1f;
  padding: 20px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
`;

function Analytics({ transactions }) {
  const totalTransactions = transactions.length;
  const incomeTransactions = transactions.filter(transaction => transaction.type === 'income');
  const expenseTransactions = transactions.filter(transaction => transaction.type === 'expense');
  const incomeCount = incomeTransactions.length;
  const expenseCount = expenseTransactions.length;

  const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnover = incomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = expenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const incomeExpenseData = {
    labels: ['Income', 'Expense'],
    datasets: [{
      label: 'Transactions',
      data: [incomeCount, expenseCount],
      backgroundColor: ['green', 'red']
    }]
  };

  const turnoverData = {
    labels: ['Income', 'Expense'],
    datasets: [{
      label: 'Turnover',
      data: [totalIncomeTurnover, totalExpenseTurnover],
      backgroundColor: ['green', 'red']
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'white'
        }
      }
    }
  };

  return (
    <AnalyticsContainer>
      <AnalyticsBox>
        <h4>Total Transactions: {totalTransactions}</h4>
        <Bar data={incomeExpenseData} options={options} />
      </AnalyticsBox>
      <AnalyticsBox>
        <h4>Total Turnover: {totalTurnover.toFixed(2)}</h4>
        <Doughnut data={turnoverData} options={options} />
      </AnalyticsBox>
    </AnalyticsContainer>
  );
}

export default Analytics;
