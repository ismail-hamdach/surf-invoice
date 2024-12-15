"use client";
import { useState, useEffect } from "react";
import ReportsSnapshot from "./components/reports-snapshot";
import FormGrid from "./components/form-grid";
import FixedHeader from "./components/fixed-header";
import Card from "@/components/ui/card-snippet";
import { toast as reToast } from "react-hot-toast";
import BasicDataTable from "./basic-table";

const DashboardPageView = ({ trans }) => {
  const [totals, setTotals] = useState({ total_sum: 0, total_today: 0, total_this_month: 0, total_this_year: 0, commandes: [] });
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
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
          {trans?.dashboard}
        </div>
        {/* <DatePickerWithRange /> */}
      </div>
      {/* reports area */}

      <ReportsSnapshot trans={trans} total_sum={totals?.total_sum || 0} totalDay={totals?.total_today || 0} totalMonth={totals?.total_this_month || 0} totalYear={totals?.total_this_year || 0} />

      <Card title={trans.listProduct}>
        <BasicDataTable trans={trans} data={totals.commandes} isLoading = {isLoading} />
        {/* <FixedHeader trans={trans} data={totals.data} /> */}
      </Card>

    </div>
  );
};

export default DashboardPageView;
