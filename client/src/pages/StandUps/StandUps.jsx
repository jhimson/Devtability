import React, { useContext } from 'react';
import Main from '../../components/Main/Main';
// ! COMPONENTS
import Sidenav from '../../components/Sidenav/Sidenav';
// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const StandUps = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <div className="min-h-screen bg-red-400">
        {/* <Sidenav /> */}
        <Main sidenav={<Sidenav />}>
          <nav className="flex items-center justify-between px-4 bg-white py-6 border-b">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-1/8">
              <input
                type="text"
                placeholder="search"
                className="bg-gray-100 outline-none w-full"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-4">
              <img
                className="w-8 rounded-full"
                src="https://imagez.tmz.com/image/f7/1by1/2021/12/14/f7703994b69d48ca802df55729a2325c_xl.jpg"
                alt="Elon Musk"
              />
              <p className="hidden md:block">{user?.name}</p>
            </div>
          </nav>
          {/* HEREE ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <div>
            <article class="">
              <form class="bg-white shadow rounded-lg mb-6 p-4">
                <div className="flex flex-col space-y-2 mb-8">
                  <label htmlFor="" className="text-gray-500 font-semibold">
                    Title
                  </label>
                  <textarea
                    name="message"
                    placeholder="Type something here..."
                    class="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                  ></textarea>
                </div>
                <div className="grid grid-cols-3 gap-x-8">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      What did you worked on today?
                    </label>
                    <textarea
                      name="message"
                      placeholder="Type something here..."
                      class="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                    ></textarea>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      What are you planning to work on tonight/tomorrow?
                    </label>
                    <textarea
                      name="message"
                      placeholder="Type something here..."
                      class="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                    ></textarea>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      What blockers do you have?
                    </label>
                    <textarea
                      name="message"
                      placeholder="Type something here..."
                      class="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                    ></textarea>
                  </div>
                </div>
                <footer class="flex justify-between mt-2">
                  <div class="flex gap-2">
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class="css-i6dzq1"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class="css-i6dzq1"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </span>
                    <span class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class="css-i6dzq1"
                      >
                        <polyline points="4 17 10 11 4 5"></polyline>
                        <line x1="12" y1="19" x2="20" y2="19"></line>
                      </svg>
                    </span>
                  </div>
                  <button class="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">
                    Post
                    <svg
                      class="ml-1"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </footer>
              </form>

              <div class="bg-white shadow rounded-lg mb-6">
                <div class="flex flex-row px-2 py-3 mx-3">
                  <div class="w-auto h-auto rounded-full">
                    <img
                      class="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                      alt="User avatar"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    />
                  </div>
                  <div class="flex flex-col mb-2 ml-4 mt-1">
                    <div class="text-gray-600 text-sm font-semibold">
                      John Doe
                    </div>
                    <div class="flex w-full mt-1">
                      <div class="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                        SEO
                      </div>
                      <div class="text-gray-400 font-thin text-xs">
                        • 30 seconds ago
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-b border-gray-100"></div>
                <div class="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
                  <div class="grid grid-cols-6 col-span-2 gap-2">
                    <div class="overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                      <img
                        class="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
                        alt=""
                      />
                    </div>
                    <div class="overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                      <img
                        class="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1399&amp;q=80"
                        alt=""
                      />
                    </div>
                    <div class="overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                      <img
                        class="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                        alt=""
                      />
                    </div>
                    <div class="overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                      <img
                        class="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                        alt=""
                      />
                    </div>
                    <div class="relative overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                      <div class="text-white text-xl absolute inset-0 bg-slate-900/80 flex justify-center items-center">
                        + 23
                      </div>
                      <img
                        class="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=765&amp;q=80"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="text-gray-500 text-sm mb-6 mx-3 px-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500
                </div>
                <div class="flex justify-start mb-4 border-t border-gray-100">
                  <div class="flex w-full mt-1 pt-2 pl-5">
                    <span class="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        ></path>
                      </svg>
                    </span>
                    <img
                      class="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                  </div>
                  <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                    <span class="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                    </span>
                    <span class="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                      <svg
                        class="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="flex w-full border-t border-gray-100">
                  <div class="mt-3 mx-5 flex flex-row text-xs">
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Comments:
                      <div class="ml-1 text-gray-400 text-ms">30</div>
                    </div>
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Views:
                      <div class="ml-1 text-gray-400 text-ms">60k</div>
                    </div>
                  </div>
                  <div class="mt-3 mx-5 w-full flex justify-end text-xs">
                    <div class="flex text-gray-700 rounded-md mb-2 mr-4 items-center">
                      Likes:
                      <div class="ml-1 text-gray-400 text-ms">120k</div>
                    </div>
                  </div>
                </div>
                <div class="text-black p-4 antialiased flex">
                  <img
                    class="rounded-full h-8 w-8 mr-2 mt-1"
                    src="https://picsum.photos/id/1027/200/200"
                  />
                  <div>
                    <div class="bg-gray-100 rounded-lg px-4 pt-2 pb-2.5">
                      <div class="font-semibold text-sm leading-relaxed">
                        Sara Lauren
                      </div>
                      <div class="text-xs leading-snug md:leading-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </div>
                    </div>
                    <div class="text-xs mt-0.5 text-gray-500">14 w</div>
                    <div class="bg-white border border-white rounded-full float-right -mt-8 mr-0.5 flex shadow items-center">
                      <svg
                        class="p-0.5 h-5 w-5 rounded-full z-20 bg-white"
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 16 16"
                      >
                        <defs>
                          <linearGradient
                            id="a1"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#18AFFF"></stop>
                            <stop offset="100%" stopColor="#0062DF"></stop>
                          </linearGradient>
                          <filter
                            id="c1"
                            width="118.8%"
                            height="118.8%"
                            x="-9.4%"
                            y="-9.4%"
                            filterUnits="objectBoundingBox"
                          >
                            <feGaussianBlur
                              in="SourceAlpha"
                              result="shadowBlurInner1"
                              stdDeviation="1"
                            ></feGaussianBlur>
                            <feOffset
                              dy="-1"
                              in="shadowBlurInner1"
                              result="shadowOffsetInner1"
                            ></feOffset>
                            <feComposite
                              in="shadowOffsetInner1"
                              in2="SourceAlpha"
                              k2="-1"
                              k3="1"
                              operator="arithmetic"
                              result="shadowInnerInner1"
                            ></feComposite>
                            <feColorMatrix
                              in="shadowInnerInner1"
                              values="0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0"
                            ></feColorMatrix>
                          </filter>
                          <path
                            id="b1"
                            d="M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z"
                          ></path>
                        </defs>
                        <g fill="none">
                          {/* <use fill="url(#a1)" xlink:href="#b1"></use> */}
                          <use
                            fill="black"
                            filter="url(#c1)"
                            // xlink:href="#b1"
                          ></use>
                          <path
                            fill="white"
                            d="M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z"
                          ></path>
                        </g>
                      </svg>
                      <svg
                        class="p-0.5 h-5 w-5 rounded-full -ml-1.5 bg-white"
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 16 16"
                      >
                        <defs>
                          <linearGradient
                            id="a2"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FF6680"></stop>
                            <stop offset="100%" stopColor="#E61739"></stop>
                          </linearGradient>
                          <filter
                            id="c2"
                            width="118.8%"
                            height="118.8%"
                            x="-9.4%"
                            y="-9.4%"
                            filterUnits="objectBoundingBox"
                          >
                            <feGaussianBlur
                              in="SourceAlpha"
                              result="shadowBlurInner1"
                              stdDeviation="1"
                            ></feGaussianBlur>
                            <feOffset
                              dy="-1"
                              in="shadowBlurInner1"
                              result="shadowOffsetInner1"
                            ></feOffset>
                            <feComposite
                              in="shadowOffsetInner1"
                              in2="SourceAlpha"
                              k2="-1"
                              k3="1"
                              operator="arithmetic"
                              result="shadowInnerInner1"
                            ></feComposite>
                            <feColorMatrix
                              in="shadowInnerInner1"
                              values="0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0"
                            ></feColorMatrix>
                          </filter>
                          <path
                            id="b2"
                            d="M8 0a8 8 0 100 16A8 8 0 008 0z"
                          ></path>
                        </defs>
                        <g fill="none">
                          {/* <use fill="url(#a2)" xlink:href="#b2"></use> */}
                          <use
                            fill="black"
                            filter="url(#c2)"
                            // xlink:href="#b2"
                          ></use>
                          <path
                            fill="white"
                            d="M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41"
                          ></path>
                        </g>
                      </svg>
                      <span class="text-sm ml-1 pr-1.5 text-gray-500">3</span>
                    </div>
                  </div>
                </div>
                <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                  <img
                    class="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  />
                  <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                    <button
                      type="submit"
                      class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                    >
                      <svg
                        class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                    style={{ borderRadius: '25px' }}
                    placeholder="Post a comment..."
                    autoComplete="off"
                  />
                </div>
              </div>

              <div class="bg-white shadow rounded-lg">
                <div class="flex flex-row px-2 py-3 mx-3">
                  <div class="w-auto h-auto rounded-full border-2 border-green-500">
                    <img
                      class="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                      alt="User avatar"
                      src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"
                    />
                  </div>
                  <div class="flex flex-col mb-2 ml-4 mt-1">
                    <div class="text-gray-600 text-sm font-semibold">
                      Sara Lauren
                    </div>
                    <div class="flex w-full mt-1">
                      <div class="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                        UX Design
                      </div>
                      <div class="text-gray-400 font-thin text-xs">
                        • 1 day ago
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-b border-gray-100"></div>
                <div class="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2 grid grid-cols-1 md:grid-cols-2 grid-row-auto gap-2">
                  <img
                    className="rounded w-full"
                    src="https://picsum.photos/536/354"
                  />
                  <img
                    className="rounded w-full"
                    src="https://picsum.photos/536/354"
                  />
                  <img
                    className="rounded w-full"
                    src="https://picsum.photos/536/354"
                  />
                  <img
                    className="rounded w-full"
                    src="https://picsum.photos/536/354"
                  />
                </div>
                <div class="text-gray-600 font-semibold mb-2 mx-3 px-2">
                  Dummy text of the printing and typesetting industry
                </div>
                <div class="text-gray-500 text-sm mb-6 mx-3 px-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500
                </div>
                <div class="flex justify-start mb-4 border-t border-gray-100">
                  <div class="flex w-full mt-1 pt-2 pl-5">
                    <span class="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        ></path>
                      </svg>
                    </span>
                    <img
                      class="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                      alt=""
                    />
                    <img
                      class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                  </div>
                  <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                    <span class="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="14px"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                    </span>
                    <span class="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                      <svg
                        class="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="flex w-full border-t border-gray-100">
                  <div class="mt-3 mx-5 flex flex-row text-xs">
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Comments:
                      <div class="ml-1 text-gray-400 text-ms">30</div>
                    </div>
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                      Views:
                      <div class="ml-1 text-gray-400 text-ms">60k</div>
                    </div>
                  </div>
                  <div class="mt-3 mx-5 w-full flex justify-end text-xs">
                    <div class="flex text-gray-700 rounded-md mb-2 mr-4 items-center">
                      Likes:
                      <div class="ml-1 text-gray-400 text-ms">120k</div>
                    </div>
                  </div>
                </div>
                <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                  <img
                    class="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  />
                  <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                    <button
                      type="submit"
                      class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                    >
                      <svg
                        class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                    style={{ borderRadius: '25px' }}
                    placeholder="Post a comment..."
                    autoComplete="off"
                  />
                </div>
              </div>
            </article>
          </div>
        </Main>
        {/* <div>Welcome, {user.name}!</div> */}
      </div>
    </>
  );
};

export default StandUps;
