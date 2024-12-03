'use client';

import axios from 'axios';
import { useState } from 'react';

export default function ClientPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function fLoginBtnClick() {
    const url = 'https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/auth/login';
    // const url = 'http://127.0.0.1:8787/auth/login'
    const data = {
      "email": "misel@gmail.com",
      "password": "123",
    };

    try {
      const response = await axios.post(url, data, 
          {
            headers: {
              'Content-Type': 'application/json', // Specify that we're sending JSON data
          },
        }
       );
       console.log(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="flex w-80 flex-col items-center gap-4">
        <div>
          <span className="text-3xl font-semibold">LOGIN</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <span>Email</span>
            <input
              className="w-full rounded-md border px-4 py-2"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <span>Password</span>
            <input
              className="w-full rounded-md border px-4 py-2"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <span></span>
        </div>
        <div className="w-full">
          <button
            type="button"
            className="w-full rounded-md bg-black py-2"
            onClick={() => {
              fLoginBtnClick();
            }}
          >
            <span className=" text-white">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
