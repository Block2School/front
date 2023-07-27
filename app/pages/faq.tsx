import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import Question from "../components/faq/faqQuestion";
import { useEffect, useState } from "react";
import { Show, useColorModeValue, Text, VisuallyHidden, Container, VStack } from "@chakra-ui/react";
import { useContext } from 'react';
import { LanguageContext } from "../components/LanguageSwitcher/language";
import axios from "axios";
import { serverURL } from "../utils/globals";

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

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const bg = useColorModeValue("#191919", "white");
  const color = useColorModeValue("black", "black");

  const { dictionary } = useContext(LanguageContext);

  return (
    <>
      <Navbar />
      <div id="faq-container">
        <div id="faq-header">
          <span>
            <div>Frequently Asked Questions</div>
          </span>
          <span>{dictionary.faq.faq}</span>
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
            {/* <Question
              question={dictionary.faq.first_block_title}
              answer={dictionary.faq.first_block_contain}
            />
            <Question
              question={dictionary.faq.second_block_title}
              answer={dictionary.faq.second_block_contain}
            />
            <Question
              question={dictionary.faq.third_block_title}
              answer={dictionary.faq.third_block_contain}
            />
            <Question
              question={dictionary.faq.fourth_block_title}
              answer={dictionary.faq.fourth_block_contain}
            /> */}
            {/* <Question question="TEST" answer="test"/>
            <Question question="TEST" answer="test"/>
            <Question question="TEST" answer="test"/> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
