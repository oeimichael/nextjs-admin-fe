'use client';

import axios from 'axios';
import { useState } from 'react';

export default function ClientPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  async function fLoginBtnClick() {
    setisLoading(true)
    const url = 'https://cloudflare-worker-typescript.ruberdium-fi.workers.dev/auth/login';
    const data = {
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
        console.log(response.data.data.token)
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('username', response.data.data.username);
        localStorage.setItem('email', response.data.data.email);
        setisLoading(false)
        window.location.href = '/dashboard';
      } else {
        setisLoading(false)
        setErrorMessage(response.data.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">

      {/* {loading
        ? (
            <div className="loading-container">
              <ReactLoading type="spin" color="#00BFFF" height={50} width={50} />
            </div>
          )
        : ( */}
      <div className="flex w-96 flex-col items-center gap-4 border px-4 py-6 shadow-md">
        <div>
          <span className="text-3xl font-semibold">LOGIN</span>
        </div>
        <div className="mt-2 flex w-full flex-col gap-2">
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
              fLoginBtnClick();
            }}
          >
            <span className=" text-white">Login</span>
          </button>
        </div>

        <div className="flex gap-2">
          <span>Don't have account? </span>
          <a href="/register">Register now</a>
        </div>
      </div>
       {/* )} */}
      {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg flex items-center justify-center">
              <div className="loader-border border-t-transparent border-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
              <p className="ml-4 text-lg text-gray-700">Loading...</p>
            </div>
          </div>
      )}
      
    </div>
  );
}
