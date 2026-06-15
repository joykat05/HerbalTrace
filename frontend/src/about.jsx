import './app.css'
import Card from './components/card'

export default function About(){
    return(
        <>
        <div className='
            m-10 
            max-md:m-2 
            bg-pink-100 
            p-4 
            max-md:px-3 max-md:py-2 
            rounded-2xl
        '>

        <h1 className="
            font-prompt 
            text-4xl 
            max-md:text-2xl 
            text-pink-300 
            m-5 max-md:m-2 
            flex items-center gap-2 
            hover:text-green-300
        ">
            <span 
                className="material-symbols-outlined" 
                style={{fontSize :"40px"}}
            >
                info
            </span>
            About Us
        </h1>        
        <div className='
            flex gap-4 

            max-md:flex-col 
            max-md:gap-3
        '>
            <p className='
                w-1/2 
                max-md:w-full 
                ml-5 
                max-md:ml-0 
                text-2xl 
                max-md:text-sm 
                font-prompt 
                text-green-600
            '>
                <br/>
                Built for small, hometown herbal and essential oil producers, this platform simplifies batch tracking, certification management, and dispatch records in one place.
                <br/><br/>
                It brings clarity to production, improves traceability, and helps businesses maintain quality, prove authenticity, and grow with confidence.
            </p>

            {/* IMAGE CARD */}
            <div className="
                max-md:w-full 
                max-md:flex 
                max-md:justify-center   
            ">
                <Card>
                    <img 
                        className="rounded-2xl w-full" 
                        src="/content/yellow-photo.jpg" 
                        alt="about"
                    />
                </Card>
            </div>

        </div>
        </div>
        </>
    )
}