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
      autocomplete(document.getElementById("faq-search") as HTMLInputElement, res.data.map((faq: any) => faq.question));
    })
  }

  const bg = useColorModeValue("#191919", "white");
  const color = useColorModeValue("black", "black");

  const { dictionary } = useContext(LanguageContext);

  function autocomplete(inp: HTMLInputElement, arr: string[]) {
    let currentFocus: number;
  
    inp.addEventListener("input", function (e: Event) {
      const val = (this).value;
      closeAllLists();
      if (!val) {
        setSearchInput("");
        return false;
      }
      currentFocus = -1;
  
      const a = document.createElement("DIV");
      a.setAttribute("id", (this).id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      (this).parentNode?.appendChild(a);
  
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].toLocaleLowerCase().includes(val.toLocaleLowerCase())) {
          const b = document.createElement("DIV");
          let index = arr[i].toLowerCase().indexOf(val.toLowerCase());
          b.innerHTML = arr[i].substr(0, index);
          b.innerHTML += "<strong>" + arr[i].substr(index, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(index + val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
  
          b.addEventListener("click", function (e: Event) {
            const input = this.getElementsByTagName("input")[0];
            inp.value = input.value;
            setSearchInput(input.value);
            closeAllLists();
          });
  
          if (a.childElementCount <= 9)
            a.appendChild(b);
        }
      }
    });
  
    inp.addEventListener("keydown", function (e: KeyboardEvent) {
      const x = document.getElementById((this).id + "autocomplete-list");
      if (x) {
        const divElements = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(divElements);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(divElements);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) divElements[currentFocus].click();
          }
        }
      }
    });
  
    function addActive(x: HTMLCollectionOf<Element>) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      x[currentFocus].classList.add("autocomplete-active");
    }
  
    function removeActive(x: HTMLCollectionOf<Element>) {
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
  
    function closeAllLists(elmnt?: Element) {
      const x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode?.removeChild(x[i]);
        }
      }
    }
  
    document.addEventListener("click", function (e: Event) {
      closeAllLists(e.target as Element);
    });
  }  

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
