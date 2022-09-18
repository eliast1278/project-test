import React, { useEffect, useState } from "react";
import { get_products } from "./services";
import { AgGridReact } from "ag-grid-react";
function Index() {
  const [products, setProducts] = useState([]);
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    get_products().then((res) => {
      console.log(res);
      setProducts(res.products);
    });
  };
  const [columnDefs] = useState([
    { field: "id", filter: true, floatingFilter: true },
    { field: "brand", filter: true, floatingFilter: true },
    { field: "price", filter: true, floatingFilter: true },
  ]);
  return (
    <div className="p-5">
      <div className="">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="">AG-Grid </div>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact rowData={products} columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
}

export default Index;
