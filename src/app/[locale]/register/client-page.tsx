'use client';

import axios from 'axios';
import { useState } from 'react';

export default function ClientPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function fRegisterBtnClick() {
    const url = 'https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/auth/register';
    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json', // This is optional, axios will set it automatically
          'Method': 'POST',
        },
      });

      if (response.data.status === 1) {
        window.location.href = '/login';
      } else {
        setErrorMessage(response.data.message);
      }

      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="flex w-96 flex-col items-center gap-4 border px-4 py-6 shadow-md">
        <div>
          <span className="text-3xl font-semibold">REGISTER</span>
        </div>
        <div className="mt-2 flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <span>Username</span>
            <input
              className="w-full rounded-md border px-4 py-2"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

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
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              className="w-4 rounded-md border"
              type="checkbox"
              checked={showPassword}
              onChange={() => {
                setShowPassword(!showPassword);
              }}
            />
            <span>Show password</span>
          </div>
        </div>

        <div className="flex w-full justify-start">
          <span className="text-red-700">{errorMessage}</span>
        </div>

        <div className="w-full">
          <button
            type="button"
            className="w-full rounded-md bg-black py-2"
            onClick={() => {
              fRegisterBtnClick();
            }}
          >
            <span className=" text-white">Register</span>
          </button>
        </div>
      </div>
    </div>
  );
}
