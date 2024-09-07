import React, { useState, useRef, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import Head from 'next/head';

type passengerData = {
    id: number;
    bus_name: string;
    origin: string;
    destination: string;
    doj: string;
    passenger_name: string;
    seat_no: string;
    mobile_no: string;
    email: string;
    stoppages: Array<string>;
    fare: number;
    start_time: string;
    paymentid: string;
    payment_status: boolean;
};

type props = {
  formData: passengerData[];
  bookingIds: Array<string>;
  totalFare: number;
};

const Checkout: React.FC<props> = ({ formData, bookingIds, totalFare }) => {
//   const payContext = useContext(PaymentContext);
//   if (!payContext) {
//     throw new Error('useContext must be used within a PayContextProvider');
//   }
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [pnr, setPnr] = useState<string>("")
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement) as StripeCardElement;

    if (!cardElement) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("/api/checkout",
          {
            amount: totalFare,
            id,
            bookingIds,
          },{
          headers: {
            "Content-Type": "application/json",
          },}
        );
        console.log(response)
        if (response.status == 200) {
          console.log("Payment Successful");
          setPaymentSuccess(true);
          setPnr(response.data.payment)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("PaymentMethod", paymentMethod);
    }
  };

  const handleDownloadPdf = () => {
    const html2pdf = window.html2pdf;

    const generatePDF = () => {
        const element = document.getElementById('ticket')
        html2pdf().from(element).save();
    }
    const btn = document.getElementById('download-btn');
    if(btn) btn.addEventListener('click', generatePDF)
  }

  useEffect(()=>{
    handleDownloadPdf
  },[])

  const handleAnother = () => {
    router.replace('/')
  };

  return (
    <>
       <Head>
        {/* Include html2pdf CDN */}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"
          integrity="sha512-/9A7PAyXZ4jX3djTFoFZ6d6w6XfHjxPRXDJkYgSSTjs6C1I/N7v6lSLOxlfy/RSmeL2LUJiwr+FzUmeKN/78AA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          defer
        ></script>
      </Head>
      {!paymentSuccess ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button
            type="submit"
            disabled={!stripe}
            className="px-2 py-1 bg-red-700 text-white font-semibold hover:cursor-pointer hover:bg-orange-700 m-5"
          >
            Pay
          </button>
        </form>
      ) : (
        <div>
        <div className="border-2 border-black rounded-md shadow-lg shadow-black p-5 m-5" id="ticket">
          <h1 className="text-center text-lg font-bold">Your Ticket</h1>
          <h3 className="text-left font-semibold">PNR: {pnr.toUpperCase()}</h3>
          {formData.map((items: any, index: number) => {
            return (
              <div className="flex justify-between my-3" key={index}>
                <p>
                  Passenger {index + 1}:{" "}
                  <span className="font-semibold text-lg">
                    {items.passenger_name}
                  </span>
                </p>
                <p>
                  Contact No.{" "}
                  <span className="font-semibold text-lg">
                    {items.mobile_no}
                  </span>
                </p>
                <p>
                  Seat No.{" "}
                  <span className="font-bold text-lg">{items.seat_no}</span>
                </p>
              </div>
            );
          })}
          <hr />
          <div className="flex justify-between">
            <p className="font-bold text-lg">{formData[0].bus_name}</p>
            <p className="font-bold text-lg">
              {formData[0].origin} --&gt; {formData[0].destination}
            </p>
            <p>
              Pick Up Time:{" "}
              <span className="font-bold text-lg">
                {formData[0].start_time} HRS
              </span>
            </p>
          </div>
          <p className="font-bold text-lg">Total Fare: INR {totalFare}/-</p>
          <p className="text-sm">
            **Please reach your pick up point atleast 15mins before departure.
          </p>
        </div>
          <button onClick={handleDownloadPdf} className="p-1 bg-red-600 text-white mx-2" id="download-btn">Download</button>
          <button onClick={handleAnother} className="p-1 bg-red-600 text-white mx-2">Book Another Ticket</button>
        </div>
      )}
    </>
  );
};
export default Checkout;
