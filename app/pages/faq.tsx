import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import { LanguageContext } from '../container/language'
import { useContext } from 'react';

export default function FAQ() {
  const { dictionary } = useContext(LanguageContext)
  return (
    <>
      <Navbar />
      <div id="faq-container">
        <div id="faq-header">
          <span>{dictionary.faq.faq}</span>
        </div>
        <div id="faq-body">
          <div id="faq-questions">
            <div className="faq-question">
              <h2>{dictionary.faq.first_block_title}</h2>
              <p>
              {dictionary.faq.first_block_contain}
              </p>
            </div>
            <div className="faq-question">
              <h2>{dictionary.faq.second_block_title}</h2>
              <p>
              {dictionary.faq.second_block_contain}
              </p>
            </div>
            <div className="faq-question">
              <h2>{dictionary.faq.third_block_title}</h2>
              <p>{dictionary.faq.third_block_contain}</p>
            </div>
            <div className="faq-question">
              <h2>{dictionary.faq.fourth_block_title}</h2>
              <p>
              {dictionary.faq.fourth_block_contain}
              </p>
            </div>
            <div className="faq-question">
              <h2>TEST</h2>
              <p>test</p>
            </div>
            <div className="faq-question">
              <h2>TEST</h2>
              <p>test</p>
            </div>
            <div className="faq-question">
              <h2>TEST</h2>
              <p>test</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
