
import Loading from "../components/Loading"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <>
    
    <Navbar/>
    <div className='flex items-center justify-center mt-[rem] px-4 h-screen'>
      <Loading/>
  {/* Left side */}
  <div className='max-w-3xl text-left'>
    <p className='text-lg bg-blue-100 inline-block p-1 rounded-full px-3 text-blue-600 my-2'>
      Let's make with simply one click. 🎉
    </p>
    <h1 className='text-6xl leading-14 font-bold text-black mt-2 my-5'>
      Shorten links, simplify sharing, and track <br /> with ease.
    </h1>
    <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-md text-md font-bold px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
          >
            Get started for free
          </button>
  </div>
  
  {/* Right side */}
  <div className='w-[40%] text-center'>
    {/* You can add an image, icon, or other content here */}
    <p>Images</p>
    <p>fiawbnfk</p>
  </div>
</div>


    </>
  )
}

export default Home