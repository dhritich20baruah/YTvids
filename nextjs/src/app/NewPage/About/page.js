"use client"
import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className='min-h-full'>
        <p className='text-center text-3xl m-5 font-semibold'>About</p>
        <p className='text-center text-xl'>Hello I am a Web developer and I like to build stuff for the web.</p>
        <p className="text-center mx-auto m-32 w-[50%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, non. Incidunt voluptates optio molestias impedit voluptatum distinctio unde laboriosam. Velit dicta doloremque mollitia numquam dolorum. Deserunt velit natus modi fugit tenetur, totam hic commodi molestiae laudantium deleniti aspernatur ab rem ex repellendus, inventore excepturi corporis, fuga eaque mollitia itaque doloribus. Illum sapiente quisquam fuga, minima vero quo numquam neque architecto ratione. Et numquam similique odio. Quaerat minus, nisi corporis aut id adipisci consequuntur velit dolor aperiam eveniet. Nulla commodi voluptatibus repellat exercitationem odit quo alias debitis a provident, accusantium sapiente suscipit modi ducimus natus iste ratione aperiam rerum ullam minus tempore voluptate iusto necessitatibus. Explicabo, enim, nam esse tempore atque facilis hic reiciendis molestias, maxime magnam molestiae inventore dolorum cum in rerum minima ut laborum vel ullam voluptatum autem vitae ex. Molestias, voluptatem! Asperiores repudiandae a illum amet, voluptates perspiciatis quaerat vero temporibus quos soluta repellat id quo nihil eaque itaque? Repudiandae reprehenderit doloremque impedit similique omnis nulla fugiat id quod. Nobis delectus voluptatibus quidem quis nesciunt, distinctio laudantium sequi facilis omnis deleniti in quisquam harum quo esse corporis. Nemo, mollitia quibusdam repellat ad autem a tempora laboriosam velit labore in dolorem nostrum temporibus soluta, voluptate error aliquid facere incidunt.</p>
        <motion.section initial={{opacity:0}} whileInView={{opacity:1, transition: {delay: 0.5} }} className='m-20'>
            <p className="text-center text-xl font-semibold">Some of the technologies that I use are.</p>
            <ul className="tech-stack m-10 flex justify-center items-center space-x-20">
                <motion.li initial="outView" whileInView="inView" variants={{
                    outView:{
                        translateX: -50,
                        translateY: -50,
                        scale: 0
                    },
                    inView:{
                        translateX: 0,
                        translateY: 0,
                        scale: 1,
                        transition: {delay: 0.7}
                    }
                }} className='text-white bg-gray-700 p-5'>React JS</motion.li>
                <motion.li initial="outView" whileInView="inView" variants={{
                    outView:{
                        translateX: -50,
                        translateY: -50,
                        scale: 0
                    },
                    inView:{
                        translateX: 0,
                        translateY: 0,
                        scale: 1,
                        transition: {delay: 0.7}
                    }
                }} className='text-white bg-gray-700 p-5'>Tailwind CSS</motion.li>
                <motion.li initial="outView" whileInView="inView" variants={{
                    outView:{
                        translateX: -50,
                        translateY: -50,
                        scale: 0
                    },
                    inView:{
                        translateX: 0,
                        translateY: 0,
                        scale: 1,
                        transition: {delay: 0.7}
                    }
                }} className='text-white bg-gray-700 p-5'>Next JS</motion.li>
                <motion.li initial="outView" whileInView="inView" variants={{
                   outView:{
                    translateX: -50,
                    translateY: -50,
                    scale: 0
                },
                inView:{
                    translateX: 0,
                    translateY: 0,
                    scale: 1,
                    transition: {delay: 0.7}
                }
                }} className='text-white bg-gray-700 p-5'>Node JS</motion.li>
                <motion.li initial="outView" whileInView="inView" variants={{
                    outView:{
                        translateX: -50,
                        translateY: -50,
                        scale: 0
                    },
                    inView:{
                        translateX: 0,
                        translateY: 0,
                        scale: 1,
                        transition: {delay: 0.7}
                    }
                }} className='text-white bg-gray-700 p-5'>MongoDB</motion.li>
                <motion.li initial="outView" whileInView="inView" variants={{
                   outView:{
                    translateX: -50,
                    translateY: -50,
                    scale: 0
                },
                inView:{
                    translateX: 0,
                    translateY: 0,
                    scale: 1,
                    transition: {delay: 0.7}
                }
                }} className='text-white bg-gray-700 p-5'>PostgreSQL</motion.li>
            </ul>
        </motion.section>
    </div>
  )
}

export default About