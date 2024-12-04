'use client';

export default function ClientPage() {
  function fAddBtnClick() {
    window.location.href = '/register';
  }

  return (
    <div className="w-full overflow-y-auto">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold">User</span>
        <hr />
      </div>

      <div className="mt-5 flex w-full justify-end">
        <button
          className="flex gap-2 rounded-md bg-black px-4 py-2"
          type="button"
          onClick={() => {
            fAddBtnClick();
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-white">
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg>
          <span className="text-white">Add</span>
        </button>
      </div>
    </div>
  );
}
