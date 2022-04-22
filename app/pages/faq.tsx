import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";

export default function FAQ() {
  return (
    <>
      <Navbar />
      <div id="faq-container">
        <div id="faq-header">
          <span>Frequently Asked Questions</span>
        </div>
        <div id="faq-body">
          <div id="faq-questions">
            <div className="faq-question">
              <h2>What is Blockchain</h2>
              <p>
                Blockchain is a distributed ledger that is a public ledger of
                transactions. It is a system of record that is open, immutable,
                and verifiable.
              </p>
            </div>
            <div className="faq-question">
              <h2>What is a smart contract?</h2>
              <p>
                A smart contract is a contract that is written in code and
                executed on a blockchain.
              </p>
            </div>
            <div className="faq-question">
              <h2>What is ERC20 norm?</h2>
              <p>ERC20 is a standard for tokenization of digital assets.</p>
            </div>
            <div className="faq-question">
              <h2>What is a token?</h2>
              <p>
                A token is a digital asset that is issued by a blockchain
                company.
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
  );
}
