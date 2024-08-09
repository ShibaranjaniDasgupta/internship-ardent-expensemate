import React, { useEffect, useState, useMemo } from 'react';
import DefaultLayout from '../components1/DefaultLayout';
import AddEditTransaction from '../components1/AddEditTransaction';
import Analytics from '../components1/Analytics';
import { Select, message, DatePicker, Button, Spin } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useTable } from 'react-table';

const { RangePicker } = DatePicker;

const Container = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  .active-icon {
    color: blue;
  }

  .inactive-icon {
    color: grey;
  }
`;

const StyledTable = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #4CAF50;
      color: white;
    }

    tr:hover {
      background-color: #f1f1f1;
    }
  }
`;

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [type, setType] = useState('all');
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState('table');

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('expense-app'));
      setLoading(true);
      const response = await axios.post("/api/transactions/get-all-transactions", {
        userid: user._id,
        frequency,
        ...(frequency === 'custom' && { selectedRange }),
        type
      });
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  const deleteTransactions = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transactions/delete-transaction", { transactionId: record._id });
      message.success("Deleted successfully");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => dayjs(value).format('YYYY-MM-DD')
      },
      {
        Header: 'Amount',
        accessor: 'amount'
      },
      {
        Header: 'Category',
        accessor: 'category'
      },
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'Reference',
        accessor: 'reference'
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <EditOutlined onClick={() => {
              setSelectedItemForEdit(row.original);
              setShowAddEditTransactionModal(true);
            }} />
            <DeleteOutlined className="mx-3" onClick={() => deleteTransactions(row.original)} />
          </div>
        )
      },
      {
        Header: 'Shared with',
        accessor: 'shared_with'
      }
    ],
    []
  );

  const data = useMemo(() => transactionsData, [transactionsData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <DefaultLayout>
      {loading && <Spin />}
      <Container>
        <FilterContainer>
          <div className='d-flex'>
            <FilterGroup>
              <h6>Select Frequency</h6>
              <Select value={frequency} onChange={(value) => setFrequency(value)}>
                <Select.Option value='all'>All Transactions</Select.Option>
                <Select.Option value='7'>Last 1 week</Select.Option>
                <Select.Option value='30'>Last 1 month</Select.Option>
                <Select.Option value='365'>Last 1 year</Select.Option>
                <Select.Option value='custom'>Custom</Select.Option>
              </Select>
              {frequency === 'custom' && (
                <div className='mt-2'>
                  <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
                </div>
              )}
            </FilterGroup>
            <FilterGroup>
              <h6>Select Type</h6>
              <Select value={type} onChange={(value) => setType(value)}>
                <Select.Option value='all'>All</Select.Option>
                <Select.Option value='income'>Income</Select.Option>
                <Select.Option value='expense'>Expense</Select.Option>
              </Select>
            </FilterGroup>
          </div>
          <ActionsContainer>
            <IconContainer>
              <UnorderedListOutlined className={viewType === 'table' ? 'active-icon' : 'inactive-icon'} onClick={() => setViewType('table')} />
              <AreaChartOutlined className={viewType === 'analytics' ? 'active-icon' : 'inactive-icon'} onClick={() => setViewType('analytics')} />
            </IconContainer>
            <Button type="primary" onClick={() => setShowAddEditTransactionModal(true)}>ADD NEW</Button>
          </ActionsContainer>
        </FilterContainer>
        <div className='table-analytics'>
          {viewType === 'table' ? 
            <StyledTable>
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </StyledTable> : 
            <Analytics transactions={transactionsData} />
          }
        </div>
        {showAddEditTransactionModal && (
          <AddEditTransaction
            showAddEditTransactionModal={showAddEditTransactionModal}
            setShowAddEditTransactionModal={setShowAddEditTransactionModal}
            selectedItemForEdit={selectedItemForEdit}
            getTransactions={getTransactions}
            setSelectedItemForEdit={setSelectedItemForEdit}
          />
        )}
      </Container>
    </DefaultLayout>
  );
}

export default Home;
