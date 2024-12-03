'use client';

export default function ClientPage() {
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

            />
          </div>
          <div className="flex flex-col">
            <span>Password</span>
            <input
              className="w-full rounded-md border px-4 py-2"
              type="password"

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

          >
            <span className=" text-white">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
