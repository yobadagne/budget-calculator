  import React ,{useState,useEffect} from 'react'; 
  import {ExpenseList} from './components/ExpenseList';
  import {ExpensesForm}  from './components/ExpensesForm';
  import {ExpenseItems} from './components/ExpenseItems';
  import {Alert} from './components/Alert';
  // import uuid from 'uuid/dist/v4';
  import { v4 as uuidv4 } from 'uuid';
  
  
  import './App.css';
  const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
// const initial_expenses = [ { id:uuidv4(), charge: 'rent', amount:1000},
//                             { id:uuidv4(), charge:'car payment', amount: 2000},
//                              { id: uuidv4(), charge:'credit car bill', amount:3000}];
function App() {
  const [expenses ,setExpenses]= useState(initialExpenses);
  const [charge, setCharge]=useState('');
  const [amount, setAmount]=useState('');
  const [alert,setAlert]=useState({show:false});
  const [edit, setEdit]=useState(false)  
  const [id,setId]=useState(0);
  useEffect(() => {
    

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  const handleCharge=(e)=>{
       setCharge(e.target.value);

  } 
  const handleAmount= (e)=>{
     setAmount(e.target.value);
  }
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };
 


  const clearAll = () => {
    console.log('All clear')
    setExpenses([]);
    handleAlert({type:'danger' , text:'All Items Cleared'})
  }

  const handleDelete = (id)=>{
  
     setExpenses(expenses.filter((expenses)=>{return expenses.id != id}))
     handleAlert({type:'danger' , text:'Item Deleted'})
  }
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };


  const handleSubmit=(e)=>{
    e.preventDefault();
    
    if (charge!=""&& amount>0){
    if (edit) {
      let tempExpenses = expenses.map(item => {
        return item.id === id ? { ...item, charge, amount } : item;
      });
      setExpenses(tempExpenses);
      setEdit(false);
      handleAlert({type:'success', text:'Item Edited'})
    }
    else{
    const newExpense={id:uuidv4(),charge,amount}
   // to check if the item is already added before

    const chargeArray=expenses.map( expenses=>expenses.charge)
   const filterd = chargeArray.filter(element=> element==charge)
   if (filterd.length !=0){
    handleAlert({type:'danger', text:'Item already in list please edit it'})
   }
   else{
    
    
    
    setExpenses([...expenses,newExpense])
    handleAlert({type:'success', text:'Item Added'})
  }
}
    setAmount('');
    setCharge('');
    
  }
  else{
    handleAlert({type:'danger', text:'Please fill out correctly'})
  }
  }


  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
    <h1>My Budget Calulator</h1>
    <main className='App'> 
      <ExpensesForm charge={charge} amount ={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} edit ={edit}/>
      <ExpenseList expenses={expenses} clearAll={clearAll} handleDelete={handleDelete} handleEdit = {handleEdit}/> 
    </main>
     
    
    <h1>Total Expense: <span className='total'>{expenses.reduce((total,current)=>{return total += parseInt(current.amount)},0)} ETB</span></h1>

    </>
  );
}

export default App;
