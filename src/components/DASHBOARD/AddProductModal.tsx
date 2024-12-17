import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import InputField from "../FRONTEND/Input";
import Button from "../FRONTEND/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Image from 'next/image';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    images: string[];
  }) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    images: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      setIsLoading(true);

      const base64Images = await Promise.all(
        files.map((file) => fileToBase64(file))
      );

      setIsLoading(false);

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...base64Images],
      }));
    }
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold font-montserrat text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Name*
            </label>
            <InputField
              id="name"
              type="text"
              isRequired={true}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Description*
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              className="w-full p-2 border font-montserrat rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Category
            </label>
            <InputField
              id="category"
              type="text"
              name="category"
              isRequired={true}
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Price*
            </label>
            <InputField
              id="price"
              type="number"
              name="price"
              isRequired={true}
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Number Of Products in Stock / Amount*
            </label>
            <InputField
              id="stock"
              type="number"
              name="stock"
              isRequired={true}
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="Stock"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              required
              onChange={handleFileChange}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          {isLoading && <p className="text-blue-500">Converting images...</p>}

          {formData.images.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-2"
                >
                  <Image
                    src={image}
                    alt={`Uploaded ${index}`}
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded"
                  />
                  <div
                    onClick={() => handleRemoveImage(index)}
                    className="text-2xl p-2 flex items-center justify-center rounded-md hover:text-white hover:bg-darkGreen cursor-pointer text-darkGreen border border-darkGreen"
                  >
                    <DeleteRoundedIcon fontSize="inherit" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 space-x-2">
            <Button
              onClick={onClose}
              className="w-full"
              text="Cancel"
              type="outline"
            />
            <Button
              buttonType="submit"
              text="Submit"
              className="w-full p-2 text-white bg-darkGreen rounded hover:bg-darkGreen-dark"
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AddProductModal;
