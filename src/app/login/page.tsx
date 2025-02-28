"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const Login = () => {};
  return (
    <>
      <div>
        <div className="container mx-auto flex flex-col items-center justify-center h-screen">
          <div>Login Page</div>
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border border-gray-300 rounded-md"
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
              className="p-2 border border-gray-300 rounded-md"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <button onClick={() => Login}>Login</button>
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
