"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const Login = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("response", response);
      if (response.data.error) {
        console.log("Error", response.data.error);
        return;
      }
      console.log("Login", response.data);
      router.push("/profile");
    } catch (error) {
      console.log("Login Fialed", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      <div>
        <div className="container mx-auto flex flex-col items-center justify-center h-screen">
          <div>{loading ? "Processing" : "Login"}</div>
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border border-gray-300 rounded-md text-black"
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
              className="p-2 border border-gray-300 rounded-md text-black"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <button onClick={Login}>
              {buttonDisabled ? "No Login" : "Login"}
            </button>
            <Link href="/signup" className="text-center">
              Go to SignUp Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
