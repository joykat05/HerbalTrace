import '../app.css';
import Card from './card';
export default function Features(){
    return(
        <>
        <div className='m-10'>
            
            <h1 className='font-prompt text-5xl text-green-300 hover:text-pink-300 items-baseline'>
                <span class="material-symbols-outlined mr-2" style={{fontSize:"40px"}}>yard</span>
                Features</h1>
            <div className="grid grid-cols-2 gap-10">

  <Card
    title="Batch Management"
    description="Efficiently manage essential oil production batches by creating, updating, or removing entries while maintaining detailed records of raw materials, distillation processes, and output quality to ensure consistency and traceability across all operations."
  >
    <img className="rounded-2xl" src="/content/white-photo.jpg" />
  </Card>

  <Card
    title="Quality & Certificate Tracking"
    description="Maintain complete visibility over quality certifications for each batch including purity reports, testing results, and compliance documentation to ensure your essential oils meet industry standards and build trust with buyers."
  >
    <img className="rounded-2xl" src="/content/lab-oil.jpg" />
  </Card>

  <Card
    title="Buyer & Dispatch Management"
    description="Track buyer details and manage dispatch operations seamlessly by monitoring order status, shipment records, and delivery timelines to ensure smooth logistics and reliable fulfillment for your essential oil business."
  >
    <img className="rounded-2xl" src="/content/photo-logs.jpg" />
  </Card>

  <Card
    title="AI Insights & Yield Optimization"
    description="Leverage AI-powered analysis to detect low yield batches and generate insights from historical production data, helping identify trends, improve extraction efficiency, and optimize overall essential oil production performance."
  >
    <img className="rounded-2xl" src="/content/analysis.jpg" />
  </Card>

</div>
            </div>
        </>
    );
}