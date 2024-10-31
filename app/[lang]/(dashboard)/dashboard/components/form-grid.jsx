"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button'
const FormGrid = ({ trans, submit }) => {
  const [formData, setFormData] = useState({
    quantity: '',
    price: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={(event) => {
      submit(event, formData, setIsLoading);
    }}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="col-span-1">
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder={trans.quantity}
            required
          />
        </div>

        <div className="col-span-1">
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder={trans.price}
            required
          />
        </div>

        <div className="col-span-1">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? trans.Submitting : trans.submit}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormGrid;