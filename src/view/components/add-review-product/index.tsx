import axios from "axios";
//import axios from '../../api/axios'
import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom'
const ReviewProductPage: React.FC = () => {

  return (
    <div className="container mx-auto mt-8">
    <form action="#" method="POST" className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-600 text-sm font-semibold mb-2">Name</label>
        <input type="text" id="name" name="name" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"/>
      </div>
  
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
        <input type="email" id="email" name="email" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"/>
      </div>
  
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-600 text-sm font-semibold mb-2">Title</label>
        <input type="text" id="title" name="title" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"/>
      </div>
  
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-600 text-sm font-semibold mb-2">Content</label>
        <textarea id="content" name="content" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"></textarea>
      </div>
  
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-600 text-sm font-semibold mb-2">Rating</label>
        <select id="rating" name="rating" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
  
      <div className="mt-6">
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none">Submit</button>
      </div>
    </form>
  </div>
  
  );
};
export default ReviewProductPage;
