import React from "react";
import Buy from "./Buy";

const Mp3 = () => {
  return (
    <div className="mx-16 my-10 text-justify">
      <div className="flex md:flex-row flex-col">
        <img
          src="https://i.ibb.co/2ddxkPs/music.jpg" 
          alt=""
          className="md:m-10 m-2 md:h-[50vh] w-[100vw] md:w-auto"
        />
        <p className="text-center text-4xl italic font-bold text-blue-700 md:mt-20">
          MP3 PLAYER
        </p>
      </div>
      <p>
        Introducing the all-new MP3 player feature on our smart watch! With this
        feature, you can enjoy your favorite music, audiobooks, or podcasts,
        right from your wrist. The MP3 player feature allows you to store and
        play your own music files, giving you the freedom to listen to your
        music collection without the need for a separate device. You can easily
        transfer your music files to the smart watch via Bluetooth or a USB
        cable and it has a large storage capacity to store your files. The smart
        watch's built-in speaker or use wireless earbuds for a more immersive
        listening experience. With the convenience of having your music
        collection right on your wrist, you can enjoy your favorite songs
        without any interruptions, no matter where you are. Additionally, the
        smart watch interface allows you to easily navigate through your music
        library, play, pause, skip tracks and adjust volume, all with just a few
        simple taps. This feature is perfect for those who are always on the go,
        whether you're working out, traveling, or just running errands, you can
        now have your music collection with you at all times. Overall, the MP3
        player feature on our smart watch is an added convenience and allows you
        to enjoy your favorite music, audiobooks, or podcasts, right from your
        wrist and make your life more enjoyable and entertaining.
      </p>
      <Buy />
    </div>
  );
};

export default Mp3;
