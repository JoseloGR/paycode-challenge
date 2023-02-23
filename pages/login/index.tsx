import Image from 'next/image'

export default function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className='flex flex-col items-center justify-center'>
              <Image
                src="/paycode.png"
                alt="PayCode Logo"
                className="w-auto h-10"
                width={100}
                height={24}
                priority
              />
            </div>
            <form className='space-y-4 md:space-y-6'>
              <div>
                <label 
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900'>
                  Email
                </label>
                <input 
                  type='email' 
                  name='email' 
                  id='email' 
                  className='bg-slate-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-200 focus:border-slate-200 block w-full p-2.5'
                  placeholder='email@company.com'
                  required>
                </input>
              </div>
              <div>
                <label 
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'>
                  Password
                </label>
                <input 
                  type='password' 
                  name='password' 
                  id='password' 
                  className='bg-slate-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-200 focus:border-slate-200 block w-full p-2.5'
                  placeholder='superSecret'
                  required>
                </input>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-slate-900 font-medium font-bold rounded-lg text-sm px-5 py-2.5 text-center'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    
    </>
  )
}