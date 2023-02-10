import React from "react";
import Buy from "./Buy";

const Gyro = () => {
  return (
    <div className="mx-16 my-10 text-justify">
      <div className="flex md:flex-row flex-col">
      <img src='https://i.postimg.cc/hPK3XCNn/gyro.jpg' alt=""  className="md:m-10 m-2 md:h-[50vh] w-[100vw] md:w-auto"/>
      <p className="text-center text-4xl italic font-bold text-gray-700 md:mt-20">GYROSCOPE AND ACCELEROMETER</p>
      </div>
      <p>
        The Gyroscope and accelerometer sensor allows you to track your physical
        activity and monitor your fitness levels with accurate and detailed
        information. The Gyroscope and accelerometer sensors work together to
        provide a wide range of features and functions, including tracking
        movement and orientation, monitoring activity levels, and even providing
        navigation and location services. The Gyroscope sensor measures angular
        velocity, or the rate at which an object is rotating around an axis. In
        the smart watch, the Gyroscope sensor is used to detect and measure the
        rotation of the wrist and arm, which can then be used to track movement
        and orientation.
      </p>
      <p>
        The Accelerometer sensor measures linear acceleration, or the rate at
        which an object is changing its velocity. In the smart watch, the
        Accelerometer sensor is used to detect and measure the linear
        acceleration of the wrist and arm, which can then be used to track
        movement, activity levels, and even sleep patterns. With this feature,
        you can easily monitor your steps taken, distance traveled, and calories
        burned, and also monitor your sleep patterns. Additionally, it also has
        a sedentary reminder feature, which will remind you to move after a
        certain period of inactivity. You can track your progress over time and
        set goals for yourself to improve your fitness levels.
      </p>
      <p>
        Overall, the Gyroscope and accelerometer sensor feature on our smart
        watch is an essential tool for those who are looking to track their
        physical activity and monitor their fitness levels. This feature
        provides accurate and detailed information about the movement and
        activity of the user, which can be used to improve overall health and
        fitness. We believe that this feature will be a great addition to your
        health and fitness journey.
      </p>
      <Buy/>
    </div>
  );
};

export default Gyro;
