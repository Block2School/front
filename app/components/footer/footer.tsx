import * as logoWhite from "/public/B2S_white.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div id="footer-component">
        <div id="footer-container">
          <div id="footer-logo-container">
            <Image src={logoWhite} height="100%" width="100%" />
            <div style={{ cursor: "default" }} className="footer-text">
              Block2School
            </div>
          </div>
          <div id="footer-links-container">
            <div id="footer-links-main">
              <Link href="/terms-of-use">
                <span className="footer-text">Terms of use</span>
              </Link>
              <Link href="/privacy-police">
                <span className="footer-text">Privacy Police</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
