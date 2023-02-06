import React from 'react'
import Buy from './Buy'

const Voice = () => {
  return (
    <div className="mx-16 my-10 text-justify">
    <div className="flex md:flex-row flex-col">
    <img src="https://i.ibb.co/0mmQ5fJ/voice.jpg" alt=""  className="md:m-10 m-2 md:h-[50vh] w-[100vw] md:w-auto"/>
    <p className="text-center text-4xl italic font-bold text-green-700 md:mt-20">VOICE CALLS/COMMANDS</p>
    </div>
    <p>
        Introducing the all-new voice command feature on our smart watch! With this feature, you can easily control your smart watch and access its features using just your voice. The voice command feature allows you to make calls, send messages, set reminders, play music, and even control your smart home devices, all with simple voice commands.T he smart watch is equipped with a high-quality microphone and advanced speech recognition technology, which allows it to accurately understand and respond to your voice commands. This feature is perfect for those who are always on the go, or for those who prefer a hands-free experience.
    </p>
    <p>
        You can easily activate the voice command feature by pressing a button on the watch or by saying a wake-up command, like "Hey, smart watch" or "Ok, smart watch". Once the feature is activated, you can give it commands such as "call mom" or "set a reminder for tomorrow at 10 am" and the watch will perform the task for you. Additionally, the smart watch also supports integration with virtual assistants such as Google Assistant and Alexa, which allows you to control your smart home devices using voice commands. This feature will enhance the users experience by giving them more control and convenience.
    </p>
    <p>
        In conclusion, the voice command feature on our smart watch is a convenient and easy way to control the watch and access its features without having to use your hands. With high-quality microphone, advanced speech recognition technology and integration with virtual assistants, you can easily perform tasks, control your smart home and access information hands-free. This feature is perfect for those who are always on the go, or for those who prefer a hands-free experience.
    </p>
    <Buy/>
    </div>
  )
}

export default Voice