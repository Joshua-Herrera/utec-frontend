import './App.css';
import { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('https://utec-api.herokuapp.com/api/v1/products', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setProducts(res.data))
  }, [])

  const addProduct = id => {
    fetch(`https://utec-api.herokuapp.com/api/v1/products`, {
      method: 'POST',
    })
      .then((res) => res.json())
    // .then((res) => setProducts(res.data))
  }

  const deleteRecord = id => {
    fetch(`https://utec-api.herokuapp.com/api/v1/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
    // .then((res) => setProducts(res.data))
  }

  const updateRecord = id => {
    fetch(`https://utec-api.herokuapp.com/api/v1/products/${id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
    // .then((res) => setProducts(res.data))
  }

  return (
    <div className="App">
      <header className="">
        <Nav variant="tabs" defaultActiveKey="/home" style={{ backgroundColor: 'black' }}>
          <Nav.Item>
            <Nav.Link href="/product" style={{ color: 'white' }}>Productos</Nav.Link>
          </Nav.Item>
        </Nav>
      </header>
      <section>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </Form>
      </section>
      <section>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre de producto</th>
              <th>Precio</th>
              <th>Disponibilidad</th>
            </tr>
          </thead>
          <tbody>
            {products.map((el, i) => {
              return (
                <tr>
                  <td>{el.code}</td>
                  <td>{el.name}</td>
                  <td>{el.price}</td>
                  <td>{el.stock}</td>
                  <td style={{ width: '5vw' }}><button className='btn btn-info' onClick={(e) => updateRecord(el.code)}>Modificar</button></td>
                  <td style={{ width: '5vw' }}><button className='btn btn-danger' onClick={(e) => deleteRecord(el.code)}>Borrar</button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </section>
    </div>
  );
}

export default App;
