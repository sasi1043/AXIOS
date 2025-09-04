import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Products() {

    const[products,setProducts]=useState([]);

    useEffect(()=>{
        fetch("https://fakestoreapi.in/api/products")
        .then((response)=>response.json())
        .then((data)=>setProducts(data.products.slice(0,10)))
        
    },[])



  return (
    <div className="container-fluid">
    <div className="row">
        {products.map((product)=>
        <Card style={{ width: '18rem' }} key={product.id} className="col-md-3 mt-5">
        <Card.Header >
      <Card.Img variant="top" className="img-fluid" src={product.image} />
      </Card.Header>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.description.slice(0,20)}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>)}
      
    </div>
    </div>
  )
}
