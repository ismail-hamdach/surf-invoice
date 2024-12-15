"use client";
import { useState, useEffect } from "react";
import ReportsSnapshot from "./components/reports-snapshot";
import FormGrid from "./components/form-grid";
import FixedHeader from "./components/fixed-header";
import Card from "@/components/ui/card-snippet";
import { toast as reToast } from "react-hot-toast";
import BasicDataTable from "./basic-table"

const DashboardPageView = ({ trans }) => {
  const [totals, setTotals] = useState({ total_sum: 0, total_today: 0, total_this_month: 0, total_this_year: 0, commandes: [] });
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setTotals(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }finally{
        setIsLoading(false)
      }
    };
    fetchDashboardData();
  }, []);

  const handleSubmit = async (event, formData, setIsLoading) => {
    event.preventDefault();
    try {
      setIsLoading(true)
      let response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      response = await fetch('/api/dashboard');
      const data = await response.json();
      setTotals(data);
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
        <BasicDataTable isLoading={isLoading} trans={trans} data={totals.commandes} />
      </Card>

    </div>
  );
};

export default DashboardPageView;
