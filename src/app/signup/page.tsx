"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const Signup = async () => {
    try {
      setLoading(true);
      console.log("user", user);
      await axios.post("/api/users/signup", user).then((res) => {
        if (res.data.error) {
          console.log("Error", res.data.error);
          return;
        }
        console.log("Signed", res.data);
        router.push("/login");
      });
    } catch (error) {
      console.log("Signed Fialed", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <div className="container mx-auto  flex flex-col items-center justify-center h-screen">
          <div>{loading ? "Processing" : "Signup"}</div>
          <div className="flex flex-col gap-4">
            <label htmlFor="username">Username</label>
            <input
              className="p-2 border border-gray-300 rounded-md text-black"
              type="text"
              id="username"
              name="username"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Username"
            />
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
            <button onClick={Signup} disabled={buttonDisabled}>
              {buttonDisabled ? "No Signup" : "Signup"}
            </button>
            <Link href="/login" className="text-center">
              Go to Login Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
