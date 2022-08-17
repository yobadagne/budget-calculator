import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

export const ExpenseItems = ({expense,handleDelete,handleEdit}) => {
  const {id, charge, amount} = expense;
  
  return (
    <li className='item'>
      <div className='info'>
        <span className='expense'>{charge}</span>
        <span className='amount'>{amount} ETB</span>
      </div>
      <div>
        <button className='edit-btn' onClick= {()=> handleEdit(id)}><MdEdit/></button>
        <button className='clear-btn' onClick= {()=> handleDelete(id)}><MdDelete/></button>
        
      </div>
      </li>
     


  )
}
