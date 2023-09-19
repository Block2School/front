import { Spacer, Text, Button, Box, Center } from '@chakra-ui/react'
import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import Link from 'next/link'
import { sendGAEvent } from '../utils/utils'

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="home-container">
        <div id="home-header">
          <Center id='home-header-center' h="150px">
            <Text id='home-header-title' fontSize='6xl' color="white">Welcome to Block2School !</Text>
          </Center>
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
                alt='ethereum'
              />
              <Image
                id="home-btc-img"
                src="/bitcoin.png"
                width={100}
                height={100}
                alt='bitcoin'
              />
              <Image
                id="home-web3-img"
                src="/web3.png"
                width={100}
                height={100}
                alt='web3'
              />
              <Image src="/Logo_B2S.png" id="home-b2c-img" height={100} width={100} alt=''/>
            </div>
            <div>
              <Image
                className="home-arrow"
                id="home-arrow-left"
                src="/curved_arrow.png"
                alt='arrow'
              />
            </div>
            <Spacer id="spacer1" width={100}></Spacer>
            <div id="home-first-part-paragraph">
              <Text id="home-paragraph-title">
                Our team of developers helps you to master blockchain
                technologies through intuitive tutorials.
              </Text>
              <Spacer id="spacer" maxH={50} />
              <div id="home-paragraph">
                <Text>
                  Block2School is the perfect site for anyone interested in
                  blockchain technology. We offer a a wide range of coding
                  exercises on blockchain technologies. You will be able to
                  understand blockchain, how it works and how it can be used.
                  You will also be comfortable creating smart contracts and
                  decentralized applications.
                </Text>
              </div>
            </div>
            <Spacer />
          </div>
          <div id="#mobile-display-none1"
            style={{
              width: '100%',
              height: '75px',
            }}
          ></div>
          <div id="home-second-part">
            <div id="home-second-part-paragraph">
              <Text id="home-paragraph-start-title">Start learning now!</Text>
              <div id="home-paragraph-start">
                <Text>
                  Are you ready to enter the world of blockchain? Block2School
                  is the best place to learn the basics of blockchain
                  technologies. You will learn the fundamentals through code
                  exercises and comprehensive tutorials to develop your skills.
                  Get started now!
                </Text>
              </div>
            </div>
            <div>
              <Image
                className="home-arrow"
                id="home-arrow-right"
                src="/curved_arrow.png"
                alt='arrow'
              />
            </div>
            <div id="button-start">
              <Button
              onClick={() => {
              sendGAEvent('home', 'button_click', 'Go to tuto through home')
            }}>
                <Link href={'/tutorials'} passHref>
                  Start now!
                </Link>
              </Button>
            </div>
            <div id="coach">
              <Image 
                src="/man-yelling.png" 
                id="coach-yelling" 
                height={100} 
                width={100}
                alt=''
              />
            </div>
            <Spacer maxW={200} />
          </div>
          <div id="home-team" style={{
            width: '100%',
            height: '75px',
            color: "white",
            fontSize: "60px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "50px"
          }}>Our team</div>
            <div id="home-third-part">
              <div>
                <div className="flip-box">
                  <div className="flip-box-inner">
                    <div className="flip-box-front">
                      <Image 
                        id="home-picture-matisse"
                        src="/profile-pictures/matisse.png"
                        className="home-picture"
                        width={100}
                        alt='matisse'
                      />
                    </div>
                    <div className="flip-box-back">
                      <Text>Matisse Page</Text>
                      <p>Front-end developer</p>
                    </div>
                  </div>
                </div> 
              </div>
              <div>
                <div className="flip-box">
                  <div className="flip-box-inner">
                    <div className="flip-box-front">
                      <Image
                        id="home-picture-lorenzo"
                        src="/profile-pictures/lorenzo.png"
                        className="home-picture"
                        width={100}
                        alt='lorenzo'
                      />
                    </div>
                    <div className="flip-box-back">
                      <Text>Lorenzo Manoeuvre</Text>
                      <p>Front-end developer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flip-box">
                  <div className="flip-box-inner">
                    <div className="flip-box-front">
                      <Image
                        id="home-picture-lucas"
                        src="/profile-pictures/lucas.png"
                        className="home-picture"
                        width={100}
                        alt='lucas' 
                      />
                    </div>
                    <div className="flip-box-back">
                      <Text>Lucas Dudot</Text>
                      <p>Front-end developer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flip-box">
                  <div className="flip-box-inner">
                    <div className="flip-box-front">
                      <Image
                        id="home-picture-cyril"
                        src="/profile-pictures/cyril.png"
                        className="home-picture"
                        width={100}
                        alt='cyril'
                      />
                    </div>
                    <div className="flip-box-back">
                      <Text>Cyril Grosjean</Text>
                      <p>Back-end developer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flip-box">
                  <div className="flip-box-inner">
                    <div className="flip-box-front">
                      <Image
                        id="home-picture-gabriel"
                        src="/profile-pictures/gabriel.png"
                        className="home-picture"
                        width={100}
                        alt='gabriel'
                      />
                    </div>
                    <div className="flip-box-back">
                      <Text>Gabriel Knies</Text>
                      <p>Fullstack developer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flip-box">
                  <div className="flip-box-inner">
                    <div className="flip-box-front">
                      <Image
                        id="home-picture-jose"
                        src="/profile-pictures/jose.png"
                        className="home-picture"
                        width={100}
                        alt='jose'
                      />
                      </div>
                      <div className="flip-box-back">
                        <Text>Jose Fernan</Text>
                        <p>Fullstack developer</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <Spacer height={100} />
        </div>
      </div>
      <Footer />
    </>
  )
}
