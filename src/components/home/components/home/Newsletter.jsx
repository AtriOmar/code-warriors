import React from 'react'

const Newsletter = () => {
  return (
    <>
      <section className="newsletter">
        <div className="container">
          <div className="  flex items-center justify-center  bg-white py-4 px-16 flex-wrap lg:flex-nowrap  md:flex-wrap rounded-full shadow-md transform translate-y-32per">
            <div className="w-1/2 md:w-full">
              <h2 className="text-2xl">Subscribe to our news</h2>
            </div>
            <div className="w-1/2 p-1 bg-white flex items-center justify-between rounded-md md:w-full">
              <input
                type="email"
                placeholder="Write your Email"
                className="py-2 px-6 md:py-1 md:px-4 border-none outline-none text-base cursor-pointer bg-opacity-50 w-64 md:w-full md:mr-8 rounded-full bg-gray-400"
              />
              <button className="px-6 py-2 border-0 outline-none text-white rounded-md cursor-pointer md:text-sm bg-indigo-600 border border-white subscribe__btn">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Newsletter
