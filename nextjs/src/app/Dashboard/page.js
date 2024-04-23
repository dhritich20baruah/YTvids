"use client";
import { useLayoutEffect } from "react";
import Nav from "./Nav";
import { useRouter } from "next/navigation";
import isAuth from "../components/isAuth";

const Dashboard = () => {
  // const router = useRouter()
  // useLayoutEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       router.replace("/");
  //     }
  //   }, []);
  return (
    <div>
      <Nav />
      <h1 className="text-xl font-bold text-center m-10">Dashboard</h1>
    </div>
  );
};

export default isAuth(Dashboard);
