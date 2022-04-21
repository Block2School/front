import Link from "next/link";
import Image from "next/image";
import * as logoWhite from "/public/B2S_white.png";

export default function Navbar() {
  return (
    <>
      <div id="navbar-component">
        <div id="navbar-container">
          <div id="navbar-logo-container">
            <Image src={logoWhite} height="100%" width="100%" />
            <div style={{ cursor: "default" }} className="navbar-text">
              Block2School
            </div>
          </div>
          <div id="navbar-links-container">
            <div id="navbar-links-main">
              <Link href={"/"}>
                <span className="navbar-text">Home</span>
              </Link>
              <Link href={"/faq"}>
                <span className="navbar-text">FAQ</span>
              </Link>
              <Link href={"/login"}>
                <span className="navbar-text">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
