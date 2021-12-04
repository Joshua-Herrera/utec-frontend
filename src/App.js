import './App.css';
import { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState('')
  const [productCode, setProductCode] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productStock, setProductStock] = useState(0)
  const [mode, setMode] = useState('add')
  useEffect(() => {
    fetch('https://utec-api.herokuapp.com/api/v1/products', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setProducts(res.data))
  }, [])

  const addProduct = e => {
    e.preventDefault()
    fetch(`https://utec-api.herokuapp.com/api/v1/products`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        code: productCode,
        name: productName,
        price: productPrice,
        stock: productStock
      })
    })
      .then((res) => res.json())
      .then((res) => window.location.reload())
  }

  const deleteRecord = id => {
    fetch(`https://utec-api.herokuapp.com/api/v1/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => window.location.reload())
  }

  const updateRecord = (e) => {
    e.preventDefault()
    fetch(`https://utec-api.herokuapp.com/api/v1/products/${productId}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        code: productCode,
        name: productName,
        price: productPrice,
        stock: productStock
      })
    })
      .then((res) => res.json())
      .then((res) => window.location.reload())
  }

  const loadValues = el => {
    setMode('update')
    setProductId(el._id)
    setProductCode(el.code)
    setProductName(el.name)
    setProductPrice(el.price)
    setProductStock(el.stock)
  }

  if(window.location.pathname === '/home' || window.location.pathname === '/'){
    return (
      <div className="App">
      <header className="">
        <Nav activeKey="/home" style={{ backgroundColor: 'black' }}>
          <Nav.Item>
            <Nav.Link href="/home" style={{ color: 'white' }}>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" href="/product" style={{ color: 'white' }}>Productos</Nav.Link>
          </Nav.Item>
        </Nav>
        <br />
        <h1>Informacion</h1>
      </header>
      <br />
      <section>
        <h2>Joshua Herrera</h2>
        <h2>25-0061-2015</h2>
      </section>
    </div>
    );
  } else {
  return (
    <div className="App">
      <header className="">
        <Nav activeKey="/home" style={{ backgroundColor: 'black' }}>
          <Nav.Item>
            <Nav.Link href="/home" style={{ color: 'white' }}>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" href="/product" style={{ color: 'white' }}>Productos de SupertexInc</Nav.Link>
          </Nav.Item>
        </Nav>
        <br />
        <h1>Productos</h1>
      </header>
      <br />
      <section>
        <Form onSubmit={mode === 'add' ? addProduct : updateRecord}>
          <Form.Group className="mb-3" controlId="productCode">
            <Form.Label>Codigo</Form.Label>
            <Form.Control type="text" placeholder="CA-0000" value={productCode} onChange={(e) => setProductCode(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control type="text" placeholder="Nombre del producto" value={productName} onChange={(e) => setProductName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Precio del producto</Form.Label>
            <Form.Control type="number" placeholder="Precio del producto" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productStock">
            <Form.Label>Existencias del producto</Form.Label>
            <Form.Control type="number" placeholder="Existencias del producto" value={productStock} onChange={(e) => setProductStock(e.target.value)} />
          </Form.Group>
          <button className={mode === 'add' ? "btn btn-success" : "btn btn-warning"} type="submit">
            {mode === 'add' ? 'Agregar' : 'Modificar'}
          </button>
        </Form>
      </section>
      <br />
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
                <tr key={i + el._id}>
                  <td>{el.code}</td>
                  <td>{el.name}</td>
                  <td>${el.price}</td>
                  <td>{el.stock}</td>
                  <td style={{ width: '5vw' }}><button className='btn btn-info' onClick={(e) => loadValues(el)}>Modificar</button></td>
                  <td style={{ width: '5vw' }}><button className='btn btn-danger' onClick={(e) => deleteRecord(el._id)}>Borrar</button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </section>
    </div>
  );}
}

export default App;
