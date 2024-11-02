import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const page = async () => {

  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    redirect("/dashboard");
  }
  return <div className="text-2xl font-semibold">...</div>;
};

export default page;
