import { Spacer } from '@chakra-ui/react'
import React from 'react'
import { Image } from 'react-bootstrap'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="home-container">
        <div id="home-header">
          <span>Welcome to Block2School !</span>
        </div>
        <div id="home-body">
          <div id="home-first-part">
            <Spacer />
            <div id="home-image-group">
              <Image
                id="home-eth-img"
                src="/ethereum.png"
                width={100}
                height={100}
              />
              <Image
                id="home-btc-img"
                src="/bitcoin.png"
                width={100}
                height={100}
              />
              <Image
                id="home-web3-img"
                src="/web3.png"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                className="home-arrow"
                id="home-arrow-left"
                src="/curved_arrow.png"
              />
            </div>
            <Spacer width={100}></Spacer>
            <div id="home-first-part-paragraph">
              <span id="home-paragraph-title">
                Our team of developers helps you to master blockchain
                technologies through intuitive tutorials.
              </span>
              <Spacer maxH={50} />
              <div id="home-paragraph">
                <p>
                  Block2School is the perfect site for anyone interested in
                  blockchain technology. We offer a a wide range of coding
                  exercises on blockchain technologies. You will be able to
                  understand blockchain, how it works and how it can be used.
                  You'll also be comfortable creating smart contracts and
                  decentralized applications.
                </p>
              </div>
            </div>
            <Spacer />
          </div>
          <div
            style={{
              width: '100%',
              height: '75px',
            }}
          ></div>
          <div id="home-second-part">
            <div id="home-second-part-paragraph">
              <span id="home-paragraph-start-title">Start learning now !</span>
              <div id="home-paragraph-start">
                <p>
                  Are you ready to enter the world of blockchain? Block2School
                  is the best place to learn the basics of blockchain
                  technologies. You'll learn the fundamentals through code
                  exercises and comprehensive tutorials to develop your skills.
                  Get started now!
                </p>
              </div>
            </div>
            <div>
              <Image
                className="home-arrow"
                id="home-arrow-right"
                src="/curved_arrow.png"
              />
            </div>
            <div id="button-start">
              <button>
                <Link href={'/tutorials'} passHref>
                  Start now!
                </Link>
              </button>
            </div>
            <Spacer maxW={200} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
