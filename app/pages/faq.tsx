import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import Question from "../components/faq/faqQuestion";
import { useState } from "react";
import { Show, useColorModeValue, Text, VisuallyHidden, Container, VStack } from "@chakra-ui/react";


export default function FAQ() {
  const [searchInput, setSearchInput] = useState("");
  const questionList = [
    {
      question: "What is Blockchain ?",
      answer:
        "Blockchain is a distributed ledger that is a public ledger oftransactions. It is a system of record that is open, immutable, and verifiable.",
    },
    {
      question: "What is a smart contract ?",
      answer:
        "A smart contract is a contract that is written in code and executed on a blockchain.",
    },
    {
      question: "What is ERC20 norm ?",
      answer: "ERC20 is a standard for tokenization of digital assets.",
    },
    {
      question: "What is a token ?",
      answer:
        "A token is a digital asset that is issued by a blockchain company.",
    },
    {
      question: "What is a wallet ?",
      answer: "A wallet is a software that stores your private keys.",
    },
    {
      question: "Is the website secure ?",
      answer:
        "Yes, the website is secure. We use the latest security protocols to ensure that your data is safe.",
    },
    {
      question: "What is a transaction ?",
      answer:
        "A transaction is a movement of funds from one address to another.",
    },
  ];

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const bg = useColorModeValue("#191919", "white");
  const color = useColorModeValue("black", "black");
  return (
    <>
      <Navbar />
      <div id="faq-container">
        <div id="faq-header">
          <span>
            <div>Frequently Asked Questions</div>
          </span>
        </div>
        <div id="faq-body">
        <div
            style={{
              width: "20%",
              height: "40px",
            }}
          >
            <input
              id="faq-search"
              placeholder="Search for a question"
              onChange={handleChange}
              value={searchInput}
            />
          </div>
          <div id="faq-questions">
              {questionList.map((question, index) => {
                  if (searchInput.length > 0) {
                    if (
                      question.question
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    ) {
                      return (
                        <Question
                          key={index}
                          question={question.question}
                          answer={question.answer}
                        />
                      );
                    }
                  } else {
                    return (
                      <Question
                        key={index}
                        question={question.question}
                        answer={question.answer}
                      />
                    );
                  }
                })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
