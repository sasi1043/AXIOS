import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';



export default function Todo() {

    //creating states for tfoot inbox ---> for adding new date::
    const[newTitle,setNewTitle]=useState("");
    const[newAction,setNewAction]=useState("");


    //creating state
  const[todos,setTodo]=useState([]);

  //create useEffect
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response)=> response.json())
    .then((data)=>setTodo(data.slice(0,10)))
  },[])//empty array is for running the fetch for only one time


  //function for adding data's --in tfoot
  function addUser(){
    const title=newTitle.trim();
    const completed=newAction.trim(); 

    if(title && completed){
        fetch('https://jsonplaceholder.typicode.com/todos',
            {
                method: "POST",
                body: JSON.stringify({title,completed}),
                    headers:{
                        "Content-Type": "application/json; charset=utf-8"
                    }

            }
        )
        .then((response)=>response.json())
        .then((data)=>{setTodo([...todos,data]);alert("user added Successfully");
            setNewTitle("");
            setNewAction("");
            
        })
    }
  }

  return (
    <div>
      <Table>
      <thead>
        <tr>
          <th>TITLE</th>
          <th>COMPLETED</th>
          
          
        </tr>
      </thead>
      <tbody>
        {todos.map((todo)=>
        <tr key={todo.id}>
          <td>{todo.title}</td>
          <td>{String(todo.completed)}</td>
          
        </tr>
        )
      }
        
      </tbody>
      <tfoot>
        <tr>
            <td></td>
            <td> <input type='text' placeholder='enter your Title' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}></input></td>
            <td> <input type='text' placeholder='enter your Action' value={newAction} onChange={(e)=>setNewAction(e.target.value)}></input></td>
            <td> <Button variant='success' onClick={addUser}>add User</Button></td>
        </tr>
      </tfoot>
    </Table> 
    </div>
  )
}
