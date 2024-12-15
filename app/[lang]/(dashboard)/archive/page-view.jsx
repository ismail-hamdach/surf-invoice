"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BasicDataTable from "./basic-table";
import axios from 'axios';


const DashboardPageView = ({ trans }) => {
  const [totals, setTotals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    from: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
    to: new Date(new Date().setHours(23, 59, 59, 999)) // End of today
  });

  useEffect(() => {
    async function fetchCommandes(startDate, endDate) {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/archive', {
          params: { start_date: startDate, end_date: endDate },
        });

        if (response.status !== 200) {
          console.error('Error fetching data:', response.data);
          return;
        }

        const data = await response.data;
        setTotals(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Ensure loading state is reset
      }
    }
    if (!selectedDate?.from && !selectedDate?.to)
      setSelectedDate({
        from: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
        to: new Date(new Date().setHours(23, 59, 59, 999)) // End of today
      });

    // Example usage
    fetchCommandes(selectedDate?.from, selectedDate?.to);
  }, [selectedDate]);



  return (
    <div className="space-y-6 mt-6">

      <Card>
        <CardHeader>
          <CardTitle>{trans?.archive || "Archivage"}</CardTitle>
        </CardHeader>
        <CardContent>
          <BasicDataTable isLoading = {isLoading} trans={trans} data={totals.commandes} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </CardContent>
      </Card>

    </div>
  );
};

export default DashboardPageView;
