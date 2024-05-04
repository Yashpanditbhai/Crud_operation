import React from 'react';
import Edit from './Edit'; 

function Table({ products, onDelete, setSubmittedProducts, onEdit, setEditIndex, editIndex,onCancelEdit }) {
  const handleEdit = (index) => {
    setEditIndex(index); 
  };

  const handleSave = (editedProduct) => {
    onEdit(editIndex, editedProduct); 
  };

  const handleCancel = () => {
    onCancelEdit(); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Product Table</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={product.image} alt={product.title} style={{ width: '100px' }} />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editIndex === index ? (
                    <div className="flex justify-center">
                      <Edit product={product} onSave={handleSave} onCancel={handleCancel} />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                      <button onClick={() => onDelete(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
