'use client';

import axios, { type AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>('');

  useEffect(() => {
    const name : string | null = localStorage.getItem("username")
    const fetchProducts = async () => {
      setUserName(name)
      console.log(name)
    }
    fetchProducts();
  }, []);
  
  function fLogoutBtnClick() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = '/login';
  }

  return (
    <div className="flex h-12 w-full items-center justify-between px-4">
      <span>Welcome, {userName}</span>

      <button
        className="flex gap-2 rounded-md p-2 transition-all hover:bg-slate-500"
        type="button"
        onClick={() => {
          fLogoutBtnClick();
        }}
      >
        <span>Logout</span>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M19.002 3h-14c-1.103 0-2 .897-2 2v4h2V5h14v14h-14v-4h-2v4c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.898-2-2-2z"></path>
          <path d="m11 16 5-4-5-4v3.001H3v2h8z"></path>
        </svg>
      </button>
    </div>
  );
}
