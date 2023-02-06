import React from "react";
import Buy from "./Buy";

const Heart = () => {
  return (
    <div className="mx-16 my-10 text-justify">
      <div className="flex md:flex-row flex-col">
        <img src='https://i.ibb.co/QkysxRP/heart-Monitor.webp' alt="" className="md:m-10 m-2 md:h-[50vh] w-[100vw] md:w-auto]" />
        <p className="text-center text-4xl italic font-bold text-red-700 md:mt-20">
          HEART MONITOR
        </p>
      </div>
      <p>
        Introducing the all-new heart monitor feature on our smart watch! This
        feature allows you to track your heart rate and monitor your cardiac
        activity with accurate and detailed information. The heart monitor
        feature uses photoplethysmography (PPG) sensor to measure heart rate.
        PPG sensors shine a light into the skin and measure the amount of light
        that is reflected back. The amount of light that is reflected back
        changes as blood flows through the vessels, allowing the sensor to
        measure changes in blood volume and calculate heart rate. With this
        feature, you can easily monitor your heart rate, track your progress
        over time, and set goals for yourself to improve your heart health.
      </p>
      Additionally, the smart watch also has an SOS feature that can be
      activated in case of any emergency. By pressing the SOS button, the smart
      watch will send an emergency message to your pre-configured emergency
      contacts with your location information and also call emergency services.
      This feature is particularly useful for people with heart conditions,
      elderly people, or people who are alone and want to ensure their safety.
      It gives them peace of mind knowing that they have a quick and easy way to
      contact emergency services in case of an emergency.
      <p>
        Overall, the heart monitor feature on our smart watch is an essential
        tool for those who are looking to track their heart rate and monitor
        their cardiac activity. This feature provides accurate and detailed
        information about the heart's activity, which can be used to improve
        overall heart health. The added SOS feature also provides an added layer
        of safety and security in case of any emergency. We believe that this
        feature will be a great addition to your heart health journey.
      </p>
      <Buy/>
    </div>
  );
};

export default Heart;
