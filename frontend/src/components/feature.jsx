import '../app.css';
import Card from './card';

export default function Features() {
    return (
        <>
            <div className='
                m-10 
                max-md:m-2 
                bg-black/60 
                dark:bg-gray-900/60
                p-4 
                max-md:px-3 max-md:py-2   
                rounded-2xl
            '>
                <h1 className='
                    font-prompt 
                    text-5xl 
                    max-md:text-2xl 
                    text-green-400 
                    hover:text-pink-300 
                    m-5 
                    max-md:m-2 
                    flex items-center gap-2
                '>
                    <span 
                        className="material-symbols-outlined" 
                        style={{ fontSize: "40px" }}
                    >
                        yard
                    </span>
                    Features
                </h1>

               <div className="flex justify-center">
  <div className="
      grid grid-cols-2 
      gap-10 
      max-md:grid-cols-2 
      max-md:gap-4
      max-md:px-1
      w-fit
  ">

    <Card
      title="Batch Management"
      playlist_add_check_circle
      description="Efficiently manage essential oil production batches by creating, updating, or removing entries while maintaining detailed records of raw materials, distillation processes, and output quality to ensure consistency and traceability across all operations."
    >
      <img className="rounded-2xl w-full" src="/content/white-photo.jpg" />
    </Card>

    <Card
      title="Quality & Certificate Tracking"
      description="Maintain complete visibility over quality certifications for each batch including purity reports, testing results, and compliance documentation to ensure your essential oils meet industry standards and build trust with buyers."
    >
      <img className="rounded-2xl w-full" src="/content/lab-oil.jpg" />
    </Card>

    <Card
      title="Buyer & Dispatch Management"
      description="Track buyer details and manage dispatch operations seamlessly by monitoring order status, shipment records, and delivery timelines to ensure smooth logistics and reliable fulfillment for your essential oil business."
    >
      <img className="rounded-2xl w-full" src="/content/photo-logs.jpg" />
    </Card>

    <Card
      title="AI Insights & Yield Optimization"
      description="Leverage AI-powered analysis to detect low yield batches and generate insights from historical production data, helping identify trends, improve extraction efficiency, and optimize overall essential oil production performance."
    >
      <img className="rounded-2xl w-full" src="/content/analysis.jpg" />
    </Card>

  </div>
</div>
            </div>
        </>
    );
}