"use client"
import { motion } from "framer-motion"

export default function RootLayout({ children }) {
  return (
    <motion.div
    initial="pageInitial"
    animate="pageAnimate"
    variants={{
      pageIntial: {
        opacity: 0,
      },
      pageAnimate: {
        opacity: 1,
      },
    }}
  >
    <div>
      <body>{children}</body>
    </div>
    </motion.div>
  )
}
