import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    // tailwind is mobile-first approach
    // customizing CSS with JIS(Just In Time) compiler: text-[20px] text-[#000] bg-[url('./vercel.svg')]
    <div className="bg-slate-400 dark xl:place-content-center py-20 px-10 grid gap-10 min-h-screen xl:grid-cols-3">
      <div className="bg-white dark:bg-black dark:text-white sm:bg-red-200 md:bg-teal-200 lg:bg-indigo-200 xl:bg-yellow-200 2xl:bg-pink-200 p-6 rounded-2xl shadow-xl">
        <span className="font-semibold text-3xl">Select item</span>
        <ul>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between my-2 odd:bg-blue-50 even:bg-yellow-50 ">
              {/* first:bg-blue-50 last:bg-blue-50 only:bg-red-500 */}
              <span className="text-gray-500">Grey chair</span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
        </ul>
            {/* {["a", "b", "c", ""].map((c, i) => (
              <li className="bg-red-500 py-2 empty:hidden" key={i}>{c}</li>
            ))} */}
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$38</span>
        </div>
        <button 
          className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto
          hover:bg-teal-500 hover:text-black 
          active:bg-yellow-500
          focus:bg-red-500
          "
        >Checkout</button>
      </div>
      <div className="bg-white overflow-hidden rounded-2xl shadow-xl group">
        <div className="portrait:bg-blue-500 landscape:bg-teal-500 pb-14 p-6">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-3xl p-6 bg-white relative -top-5">
          <div className="flex items-end relative justify-between -top-16">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-zinc-400 rounded-full group-hover:bg-red-300 transition-colors" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-5 -mb-5">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">New York, USA</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl lg:col-span-2 xl:col-span-1">
        <div className="flex mb-5 justify-between items-center"> 
          <span>⬅️</span>
          <div className="space-x-3">
            <span>⭐️ 4.9</span>
            <span className="shadow-xl p-2 rounded-md">💖</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5" />
        <div className="flex flex-col">
          <span className="font-medium text-xl">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-3">
              <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition"></button>
              <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition"></button>
              <button className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition"></button>
            </div>
            <div className="flex items-center space-x-5">
              <button className="p-2.5 rounded-lg bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500">-</button>
              <span>1</span>
              <button className="p-2.5 rounded-lg bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500">+</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-2xl">$450</span>
            <button className="bg-blue-500 py-2 px-8 text-center text-xs text-white rounded-xl">Add to cart</button>
          </div>
        </div>
      </div> 
      {/* <div className="bg-white p-10 rounded-2xl shadow-xl">
        <p className="first-letter:text-7xl first-letter:text-purple-300">Hello everyone!</p>
        <form className="flex flex-col space-y-2 focus-within:bg-blue-300">
          <input 
            type="text" 
            required 
            placeholder="Username" 
            className="peer required:bg-yellow-500 invalid:bg-red-500 valid:bg-teal-500 " 
            // border-2 border-yellow-500 invalid:bg-red-100 placeholder-shown:bg-red-200 disabled:opacity-0
          />
          <span className="hidden peer-invalid:block text-red-500 ">This input is invalid.</span>
          <span className="hidden peer-valid:block text-teal-500 ">Amazing username.</span>
          <input type="password" required placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </div> */}
    </div>
  );
}

export default Home;
