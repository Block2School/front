import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import Question from '../components/faq/faqQuestion'
import { useContext } from 'react';
import { LanguageContext } from "../components/LanguageSwitcher/language";

export default function FAQ() {
  const { dictionary } = useContext(LanguageContext);

  return (
    <>
      <Navbar />
      <div id="faq-container">
        <div id="faq-header">
          <span>{dictionary.faq.faq}</span>
        </div>
        <div id="faq-body">
          <div id="faq-questions">
            <Question
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
            />
            <Question question="TEST" answer="test"/>
            <Question question="TEST" answer="test"/>
            <Question question="TEST" answer="test"/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
