import React from 'react';
import {MdDelete} from 'react-icons/md';
 import {ExpenseItems} from './ExpenseItems';
 export const ExpenseList= ({ expenses , clearAll, handleDelete, handleEdit}) => {
  return (
    <>
      <ul className='List'>
        {expenses.map((expense)=>{return ( <ExpenseItems key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit}/>)})}
        </ul>
        {expenses.length>0&&<button className='btn' onClick={clearAll}> Clear all expenses <MdDelete className='btn-icon'></MdDelete></button> }
    </>
  );
 }