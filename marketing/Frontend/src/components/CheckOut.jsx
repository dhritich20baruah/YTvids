import React, {useState} from "react";

const CheckOut = () => {
 const [name, setName] = useState('')
 const [number, setNumber] = useState('')
 const [address, setAddress] = useState('')
 const [pin, setPin] = useState('')


  return (
    <>
      <h1 className="text-center font-mono text-2xl m-5">CHECKOUT</h1>
      <div className="grid grid-cols-3 gap-3 justify-center">
        <div className="col-span-2 px-10">
          <h4 className="m-4 p-2 font-bold">Billing Address</h4>
          <label htmlFor="Name" className="m-4 p-2">
            Name
            <br />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-[100%] md:w-[50%] shadow-lg m-4 p-2 rounded-lg outline-none"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </label>
          <br />
          <label htmlFor="Phone" className="m-4 p-2">
            Contact Number
            <br />
            <input
              type="text"
              placeholder="Enter your number"
              className="w-[100%] md:w-[50%] shadow-lg m-4 p-2 rounded-lg outline-none"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              required
            />
          </label>
          <br />
          <label htmlFor="Address" className="m-4 p-2">
            Address
            <br />
            <textarea name="Address" id="Address" cols="30" rows="5"  placeholder="Enter your address"
              className="w-[100%] md:w-[50%] shadow-lg m-4 p-2 rounded-lg outline-none"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required></textarea>
          </label>
          <br />
          <label htmlFor="Pincode" className="m-4 p-2">
            Pincode
            <br />
            <input
              type="text"
              placeholder="Enter your Pincode"
              className="w-[100%] md:w-[50%] shadow-lg m-4 p-2 rounded-lg outline-none"
              onChange={(e) => setPin(e.target.value)}
              value={pin}
              required
            />
          </label>
          <br />
        </div>
        <div className="">
            <h3 className="font-bold">Price Details</h3>
            <div className="grid grid-cols-2 my-3">
                <div>
                    <p>Price</p>
                    <p>Delivery charges</p>
                    <p>Total amount</p>
                </div>
                <div>
                    <p className="text-red-700 font-bold">$500</p>
                    <p className="text-red-700 font-bold">$20</p>
                    <p className="text-red-700 font-bold">$520</p>
                </div>
            </div>
            <hr />
            <div className="my-3">
                <h3 className="font-bold">Payment Options</h3>
                <label htmlFor="payOptions">
                <input type="radio" name="payOptions" value="Net Banking" /> Net Banking
                <br />
                <input type="radio" name="payOptions" value="Card" /> Debit/ Credit Card
                <br />
                <input type="radio" name="payOptions" value="COD" /> Cash on delivery
                </label>
            </div>
            <button className="bg-yellow-500 text-white font-bold p-1">Place Order</button>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
