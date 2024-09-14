'use client';
import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

const AgentAddPropertyPage = () => {
        
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    discountPercent: '',
    imageUrl: '',
    location: '',
  });

  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Automatically calculate the discount percentage whenever price or discount price changes
    if (formData.price && formData.discountPrice) {
      const discountPercent = (
        ((formData.price - formData.discountPrice) / formData.price) * 100
      ).toFixed(2);
      setFormData((prev) => ({ ...prev, discountPercent }));
    }
  }, [formData.price, formData.discountPrice]);

  const handleImageUpload = async (e) => {
    setLoading(true); // Show loading state while uploading
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', 'gzk48mwa'); // Replace with your Cloudinary preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dxhwiufpc/image/upload`, {
        method: 'POST',
        body: imageData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadedImageUrl(data.secure_url);
        setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      alert('An error occurred during the image upload.');
    } finally {
      setLoading(false); // Hide loading state after upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Property added successfully!');
        // Optionally, reset the form after successful submission
        setFormData({
          title: '',
          description: '',
          price: '',
          discountPrice: '',
          discountPercent: '',
          imageUrl: '',
          location: '',
        });
        setUploadedImageUrl('');
      } else {
        alert('Failed to add property.');
      }
    } catch (error) {
      alert('An error occurred while adding the property.');
    }
  };

  // Function to restrict description to 30 words
  const handleDescriptionChange = (e) => {
    const words = e.target.value.split(/\s+/);
    if (words.length <= 30) {
      setFormData({ ...formData, description: e.target.value });
    } else {
      alert('Description cannot exceed 30 words');
    }
  };

  return (
    <div className="container max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Add New Property</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
          required
        />
        <textarea
          placeholder="Description (max 30 words)"
          value={formData.description}
          onChange={handleDescriptionChange}
          className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
          required
        />
        <input
          type="number"
          placeholder="Discount Price"
          value={formData.discountPrice}
          onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
          className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
          required
        />
        <input
          type="number"
          placeholder="Discount Percent"
          value={formData.discountPercent}
          readOnly
          className="border border-gray-300 p-3 rounded-md bg-gray-100"
        />
        <input
          type="file"
          onChange={handleImageUpload}
          className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
          required
        />
        {loading && <p className="text-center text-orange-500">Uploading image...</p>}
        {uploadedImageUrl && (
          <CldImage width="600" height="600" src={uploadedImageUrl} alt="Uploaded image" />
        )}
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-[#FF7F50] to-red-500 text-white py-3 rounded-md text-lg font-semibold hover:shadow-lg transition duration-200"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}







export default AgentAddPropertyPage