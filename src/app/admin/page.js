"use client";
import React from "react";
import { auth } from "@/app/config";
import { useRouter } from "next/navigation";
function Page() {
  const { user } = auth();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return <h1>Only logged in users can view this page</h1>;
}

export default Page;
