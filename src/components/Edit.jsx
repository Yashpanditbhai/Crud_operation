import React, { useRef } from 'react';

function Edit({ product, onSave, onCancel }) {
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);

  const handleSave = () => {
    const editedProduct = {
      id: product.id,
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value
    };

    onSave(editedProduct); 
  };

  const handleCancel = () => {
    onCancel(); 
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">Title:</label>
          <input type="text" name="title" id="title" defaultValue={product.title} ref={titleRef} className="border border-gray-300 rounded-md p-1 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1">Price:</label>
          <input type="number" name="price" id="price" defaultValue={product.price} ref={priceRef} className="border border-gray-300 rounded-md p-1 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">Description:</label>
          <input type="text" name="description" id="description" defaultValue={product.description} ref={descriptionRef} className="border border-gray-300 rounded-md p-1 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1">Image URL:</label>
          <input type="text" name="image" id="image" defaultValue={product.image} ref={imageRef} className="border border-gray-300 rounded-md p-1 w-full" />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
          <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
