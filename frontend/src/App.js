import { useState, useEffect } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {

  //crear un estado con un hook
  // const state = useState({name:"producto",price:1000})
  // console.log({state}) //array con el estado  y la funcion para cambiar el estado
  const estadoInicial = { name: '', price: 0 }
  const estadoMovimientoInicial = { type: '', quantity: 0, }

  const [isLoading, setIsLoading] = useState(false)

  const [product, setProduct] = useState(estadoInicial)
  const [movement, setMovement] = useState(estadoMovimientoInicial)
  const [SelectedProductId, setSelectedProductId] = useState()

  const [products, setProducts] = useState([]) //traer listado de productos



  // controlar el cambios de los input
  const handleChange = (e) => {
    // const name = e.target.value
    const fieldValue = e.target.value
    const fieldName = e.target.name
    // console.log({ target: e.target })
    setProduct({ ...product, [fieldName]: fieldValue })
    // console.log({ ContenidoDelInputName: e.target.value })  //ver el contenido del input
    // setProductName(name)
  }
  const handleMovementChange = (e) => {
    // const name = e.target.value
    const fieldValue = e.target.value
    // console.log({ target: e.target })
    setMovement({
      ...movement,
      quantity: +fieldValue
    })
    // console.log({ ContenidoDelInputName: e.target.value })  //ver el contenido del input
    // setProductName(name)
  }

  const handleSelectType = (type) => {
    setMovement({ type })
  }


  // console.log({productName,productPrice})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!product.name) {
        console.log("Tienes que ingresar el campo nombre")
        return
      }


      setIsLoading(true)
      // console.log(e)
      const res = await fetch('http://localhost:5000/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      const data = await res.json()
      setProduct(estadoInicial)
      const newProducts = [data.product, ...products]
      setProducts(newProducts)
      // fetchProducts()
      console.log("Producto creado con exito")




    } catch (error) {
      console.log({ error })
    }

  }


  const handleCreateMovement = async (e) => {
    e.preventDefault()



    // console.log(e)
    const res = await fetch(`http://localhost:5000/api/v1/products/movement/${SelectedProductId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movement),
    })
    const data = await res.json()
    console.log({ data })
    setProduct(estadoMovimientoInicial) // devuelve le formulario a blancos y 0
    setSelectedProductId(null)//resetear producto seleccionado
    fetchProducts()

    // fetchProducts()
    console.log("Producto creado con exito")




  }




  // console.log({ isLoading })





  const fetchProducts = () => {
    fetch('http://localhost:5000/api/v1/products')
      .then((res) => res.json())
      .then(({ products }) => {
        // console.log(products)
        setProducts(products)
      })

  }

  useEffect(() => {
    fetchProducts()
  }, [])

console.log({products})


  return (
    <div className="App df jcsb">
      <div className="df fdc">
        <h2 style={{ margin: "0.3rem" }}>
          <u>Nuevo producto</u>
        </h2>
        <form onSubmit={handleSubmit}>
          {/* ejecutar funcion cada vez que el input cambie ONCHANGE */}
          <input onChange={handleChange} value={product.name} type="text" name="name" placeholder='Nombre del producto...' />
          <input onChange={handleChange} value={product.price} type="number" name="price" placeholder='Precio del producto...' />
          <button>{
            isLoading ? 'Creando producto...' : 'Crear producto'


          }
          </button>
        </form>




        <h2 style={{ margin: "0.3rem" }}>
          <u>Movimiento stock</u>
        </h2>
        <form onSubmit={handleCreateMovement}>
          <div className="df aic mb5">
            {['Compra', 'Venta'].map((type) => (
              <div onClick={() => handleSelectType(type)} className="product mr5 p5 br5 cursorp" key={type} style={{ backgroundColor: type === movement.type ? 'lightblue' : 'white' }}>
                <span>
                  {type}
                </span>
              </div>
            ))}


          </div>
          {/* ejecutar funcion cada vez que el input cambie ONCHANGE */}
          <input onChange={handleMovementChange} value={movement.price} type="number" name="quantity" placeholder='Precio del producto...' />
          <button>Insertar Venta/Compra
          </button>
        </form>
      </div>



      <div className="products-container">
        {products.map(({ _id, name, price, stock }) => (
          <div onClick={() => setSelectedProductId(_id)} className="product df aic jcsb p5 mb5 br5"
            style={{ backgroundColor: SelectedProductId === _id ? 'lightblue' : 'white' }}
            key={_id}>
            <span>{name}</span>
            <div className="df aic">
              <div className=" df fdc mr5">

                <span >${price}</span>
                <span >Stock: {stock}</span>

              </div>
              <i className="fa fa-trash cursorp cred"
                onClick={() => {
                  fetch(`http://localhost:5000/api/v1/products/${_id}`, {
                    method: 'DELETE'
                  }).then((res) => res.json()).then((data) => {
                    console.log({ data })
                    fetchProducts()
                  })
                }}></i>

            </div>


          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
