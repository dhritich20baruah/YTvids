import Link from "next/link";
import Navbar from "../components/Navbar";

export default function test(){
    return(
        <>
        <Navbar/>
        <div id="mainBtnGroup" className="text-center">
          <h3 className="text-lg">JEE MAINS</h3>
          <div className="btn-categories">
            <Link href="/Instructions">
              <button className="btn bg-blue-700 text-white p-3 m-2 hover:bg-orange-400">2021 SHIFT-1</button>
            </Link>
            <a href="/jeemain2021s2">
              <button className="btn bg-blue-700 text-white p-3 m-2 hover:bg-orange-400">2021 SHIFT-2</button>
            </a>
          </div>
          <h3>JEE ADVANCED</h3>
          <div className="btn-categories">
            <a href="/jeeadv2021paper1">
              <button className="btn bg-blue-700 text-white p-3 m-2 hover:bg-orange-400">2021 Paper 1</button>
            </a>
            <a href="/jeeadv2021paper2">
              <button className="btn bg-blue-700 text-white p-3 m-2 hover:bg-orange-400">2021 Paper 2</button>
            </a>
            <a href="/jeeadv2020paper1">
              <button className="btn bg-blue-700 text-white p-3 m-2 hover:bg-orange-400">2020 Paper 1</button>
            </a>
            <a href="/jeeadv2020paper2">
              <button className="btn bg-blue-700 text-white p-3 m-2 hover:bg-orange-400">2020 Paper 2</button>
            </a>
          </div>
          <h3>RRB PO</h3>
          <div className="btn-categories">
            <a href="#">
              <button className="btn bg-blue-700 text-white p-3 m-2 hover:bg-orange-400">RRB PO</button>
            </a>
          </div>
          <h3>RRB CLERICAL</h3>
          <div className="btn-categories">
            <a href="#">
              <button className="btn bg-blue-700 text-white p-3 m-2 hover:bg-orange-400">JEE Advanced</button>
            </a>
          </div>
          <h3>IBPS PO</h3>
          <div className="btn-categories">
            <a href="#">
              <button className="btn bg-blue-700 text-white p-3 m-2 hover:bg-orange-400">JEE Advanced</button>
            </a>
          </div>
        </div>
        </>
    )
}