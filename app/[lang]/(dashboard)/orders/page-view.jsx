"use client";
import { useState, useEffect } from "react";
import ReportsSnapshot from "./components/reports-snapshot";
import FormGrid from "./components/form-grid";
import FixedHeader from "./components/fixed-header";
import Card from "@/components/ui/card-snippet";
import { toast as reToast } from "react-hot-toast";

const DashboardPageView = ({ trans }) => {
  const [totals, setTotals] = useState({ totalQuantity: 0, totalPrice: 0, list: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setTotals(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  const handleSubmit = async (event, formData, setIsLoading) => {
    event.preventDefault();
    try {
      setIsLoading(true)
      const response = await fetch('/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setTotals(data); // Assuming the API returns updated totals
    } catch (error) {
      console.error('Error submitting form:', error);
      reToast.error("This didn't work.")
    } finally {
      reToast.success("Successfully added!")
      setIsLoading(false)
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800 ">
          {trans?.orders || "Commandes"}
        </div>
        {/* <DatePickerWithRange /> */}
      </div>
      {/* reports area */}

      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-6">
          <Card title={trans.FormProduct}>
            <FormGrid trans={trans} submit={handleSubmit} />
          </Card>
        </div>
      </div>
      <Card title={trans.listProduct}>
        <FixedHeader trans={trans} data={totals.data} />
      </Card>

    </div>
  );
};

export default DashboardPageView;
