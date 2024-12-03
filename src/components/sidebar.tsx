'use client';

export default function Sidebar() {
  function fSidebarClick(page: string) {
    if (page === 'user') {
      window.location.href = '/user';
    }
    if (page === 'product') {
      window.location.href = '/product';
    }
  }

  return (
    <div className="mt-2 flex w-full flex-col items-center p-2">
      <div>
        <span className="text-3xl font-semibold text-white">FIFI</span>
      </div>
      <div className="mt-5 flex w-full flex-col gap-4">
        <button
          className="w-full cursor-pointer rounded-md px-4 py-2 text-left transition-all hover:bg-slate-700"
          type="button"
          onClick={() => {
            fSidebarClick('user');
          }}
        >
          <span className="text-white">User</span>
        </button>
        <button 
          className="w-full cursor-pointer rounded-md px-4 py-2 text-left transition-all hover:bg-slate-700"
          type="button"
          onClick={() => {
            fSidebarClick('product');
          }}
        >
          <span className="text-white">Product</span>
        </button>
      </div>
    </div>
  );
}
