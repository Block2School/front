export default function Question ({question, answer}:{question:any, answer:any}) {

    return (
        <div className="faq-question">
          <h2>{question}</h2>
          <p>{answer}</p>
        </div>
    )
}