import './app.css'
import Card from './components/card'

export default function About(){
    return(
        <>
        <div className='m-10 bg-pink-100 p-4 rounded-2xl'>
        <h1 className="font-prompt text-4xl text-pink-300 m-5 flex items-center gap-2 hover:text-green-300">
            <span className="material-symbols-outlined" style={{fontSize :"40px"}}>info</span>
            About Us
            </h1>        
        <div className='flex gap-4'>
            <p className='w-1/2 ml-5 text-2xl font-prompt text-green-600'>
            <br/>
                Built for small, hometown herbal and essential oil producers, this platform simplifies batch tracking, certification management, and dispatch records in one place.
            <br/><br/>
            It brings clarity to production, improves traceability, and helps businesses maintain quality, prove authenticity, and grow with confidence.
            </p>
        <Card>
            <img className="rounded-2xl" src="/content/yellow-photo.jpg" />
        </Card>
        </div>
        </div>
        </>
    )
}