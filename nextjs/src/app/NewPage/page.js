"use client";
import { RecoilRoot } from "recoil";
import SelectorOutput from "../Recoil/SelectorOutput";
import { motion } from "framer-motion";
import Link from "next/link";
export default function NewPage() {
  return (
    <>
      {/*      
        <RecoilRoot>
          <SelectorOutput />
        </RecoilRoot> */}
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <h1 className="text-3xl font-bold my-10">Hello, I am Dhriti.</h1>
        </motion.div>
        <div className="flex space-x-20">
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: {
                duration: 0.2,
              },
            }}
          >
            <Link href="/NewPage/About">
              <button className="shadow-md shadow-black p-5 rounded-md">
                About
              </button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: {
                duration: 0.2,
              },
            }}
          >
            <Link href="/NewPage/About">
              <button className="shadow-md shadow-black p-5 rounded-md">
                Portfolio
              </button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: {
                duration: 0.2,
              },
            }}
          >
            <Link href="/NewPage/About">
              <button className="shadow-md shadow-black p-5 rounded-md">
                Blog
              </button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.2,
              transition: {
                duration: 0.2,
              },
            }}
          >
            <Link href="/NewPage/About">
              <button className="shadow-md shadow-black p-5 rounded-md">
                Contact
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
