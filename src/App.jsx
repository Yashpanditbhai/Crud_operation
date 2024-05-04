import React, { Fragment, useState, useEffect } from 'react';
import FormComponent from './components/FormComponent';
import Table from './components/Table';
import axios from 'axios';

function App() {
  const [submittedProducts, setSubmittedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const [editIndex, setEditIndex] = useState(null); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://fakestoreapi.com/products');
      setSubmittedProducts(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async (index, editedProduct) => {
    try {
      setLoading(true);
      const response = await axios.put(`https://fakestoreapi.com/products/${editedProduct.id}`, editedProduct);
      console.log('Edited Data', response.data);
      const updatedProducts = [...submittedProducts];
      updatedProducts[index] = response.data;
      setSubmittedProducts(updatedProducts);
      setEditIndex(null); 
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post('https://fakestoreapi.com/products', formData);
      console.log('Submitted data:', response.data);
      setSubmittedProducts([...submittedProducts, response.data]);
      setFormSubmitted(true); 
      setLoading(false);
    } catch (error) {
      console.error('Error adding product:', error);
      setLoading(false);
    } 
  };

  const handleDelete = async (index) => {
    try {
      setLoading(true);
      await axios.delete(`https://fakestoreapi.com/products/${submittedProducts[index].id}`);
      const updatedProducts = submittedProducts.filter((product, i) => i !== index);
      setSubmittedProducts(updatedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      setLoading(false);
    }
  };
  const handleCancelEdit = () => {
    setEditIndex(null); 
  };

  return (
    <Fragment>
      <div className="formparent m-0 min-h-screen justify-center items-center">
        <div >
          <FormComponent onSubmit={handleSubmit} />
        </div>
        {loading && <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center text-black">
          <div className='bg-white p-4 shadow-2xl'>
            Loading...
          </div>
        </div>}
        {!loading && formSubmitted && (
          <Table
            products={submittedProducts}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onCancelEdit={handleCancelEdit}
            setSubmittedProducts={setSubmittedProducts}
            setEditIndex={setEditIndex}
            editIndex={editIndex}
          />
        )}
      </div>
    </Fragment>
  );
}

export default App;