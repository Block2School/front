import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import Question from '../components/faq/faqQuestion'
import { Show, useColorModeValue, Text, VisuallyHidden, Container, VStack } from "@chakra-ui/react";


export default function FAQ() {
  const bg = useColorModeValue("#191919", "white");
  const color = useColorModeValue("black", "black");
  return (
    <>
      <Navbar />
      <div id="faq-container">
        <div id="faq-header">
          <span>
            <Text>Frequently Asked Questions</Text>
          </span>
        </div>
        <div id="faq-body">
          <VStack bg={bg}>
          <div id="faq-questions">
            
            <Question
              question="What is Blockchain ?"
              answer="Blockchain is a distributed ledger that is a public
              ledger oftransactions. It is a system of record that
              is open, immutable, and verifiable."
              />
            <Question
              question="What is a smart contract ?"
              answer="A smart contract is a contract that is written in code and
              executed on a blockchain."
              />
            <Question
              question="What is ERC20 norm ?"
              answer="ERC20 is a standard for tokenization of digital assets."
              />
            <Question
              question="What is a token ?"
              answer="A token is a digital asset that is issued by a blockchain
              company."
              />
            <Question question="TEST" answer="test"/>
            <Question question="TEST" answer="test"/>
            <Question question="TEST" answer="test"/>
          </div>
          </VStack>
        </div>
      </div>
      <Footer/>
    </>
  )
}
