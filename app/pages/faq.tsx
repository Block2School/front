import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import Question from "../components/faq/faqQuestion";
import { useEffect, useState } from "react";
import { Show, useColorModeValue, Text, Input, VisuallyHidden, Container, VStack, Center, Button, Spacer, Textarea } from "@chakra-ui/react";
import { useContext } from 'react';
import { LanguageContext } from "../components/LanguageSwitcher/language";
import axios from "axios";
import { serverURL } from "../utils/globals";
import { sendGAEvent } from "../utils/utils";
import $ from 'jquery';

export default function FAQ() {
  const [searchInput, setSearchInput] = useState("");
  const [faqList, setFaqList] = useState<any[]>([])

  useEffect(() => {
    fetchFAQ()
  }, [])

  function fetchFAQ() {
    axios.get(`${serverURL}:8080/faq/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }).then((res) => {
      setFaqList(res.data)
    })
  }

  const bg = useColorModeValue("#191919", "white");
  const color = useColorModeValue("black", "black");

  const { dictionary } = useContext(LanguageContext);

  function openModal() {
    $('#faq-contact-title-input').val('')
    $('#faq-contact-description-input').val('')
    $('#faq-contact-modal').css('display', 'block')
  }

  function closeModal() {
    $('#faq-contact-modal').css('display', 'none')
  }

  function submit() {
    closeModal()
  }

  return (
    <>
      <Navbar />
      <div id="faq-container">
        <div id="faq-header">
          <Center h="200px">
            <Text fontSize='5xl' color='white'>{dictionary.faq.faq}</Text>
          </Center>
        </div>
        <div id="faq-body">
        <div
            style={{
              width: "20%",
              height: "40px",
            }}
          >
            <Input
              id="faq-search"
              placeholder="Search for a question"
            />
          </div>
          <div id="faq-questions">
            <div className="faq-question">
              <h2 className="chakra-heading css-1dklj6k">What is a smart contract ?</h2>
              <p className="chakra-text css-0">A smart contract is a contract that is written in code and executed on a blockchain.</p>
            </div>
            <div className="faq-question">
              <h2 className="chakra-heading css-1dklj6k">What is a smart contract ?</h2>
              <p className="chakra-text css-0">A smart contract is a contract that is written in code and executed on a blockchain.</p>
            </div>
            <div className="faq-question">
              <h2 className="chakra-heading css-1dklj6k">What is a smart contract ?</h2>
              <p className="chakra-text css-0">A smart contract is a contract that is written in code and executed on a blockchain.</p>
            </div>
            <div className="faq-question">
              <h2 className="chakra-heading css-1dklj6k">What is a smart contract ?</h2>
              <p className="chakra-text css-0">A smart contract is a contract that is written in code and executed on a blockchain.</p>
            </div>
              {faqList.map((question, index) => {
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
      <Button
        id="faq-contact-button"
        onClick={() => {
          sendGAEvent('faq', 'button_click', 'Open Ask a question modal')
          openModal()
        }}
      > Ask a question </Button>
      <div id="faq-contact-modal">
        <div id="faq-contact-modal-header">
          <Text>Ask a question</Text>
          <Spacer />
          <Text
            id="faq-contact-modal-close"
            style={{
              cursor: 'pointer',
            }}
            onClick={closeModal}
          >
            &times;
          </Text>
        </div>
        <div id="faq-contact-body">
          <Text id="faq-contact-title">Subject</Text>
          <Input type="text" id="faq-contact-title-input" color='white'/>
          <Text id="faq-contact-description">Description</Text>
          <Textarea
            id="faq-contact-description-input"
            style={{
              resize: 'none',
              color: 'white',
            }}
          />
          <Button
            id="faq-contact-button-submit"
            onClick={() => {
              sendGAEvent('faq', 'button_click', 'Submit question')
              submit()
            }}
          >
            Submit
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
