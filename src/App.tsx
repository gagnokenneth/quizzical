// import SelectQuiz from "./components/SelectQuiz"

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  interface Question {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    combined_answers: string[];
    question: string;
    type: string;
  }

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=5&category=24&difficulty=easy&type=')
      .then(response => response.data.results)
      .then(data => {
        const newQuestions = data.map((q: Question) => {
          const combinedAnswers = [q.correct_answer, ...q.incorrect_answers];
          q.combined_answers = shuffleArray(combinedAnswers);

          return q;
        })
        setQuestions(newQuestions);
      })
  }, []);

  const shuffleArray = (a: string[]): string[] => {
    let currentIndex = a.length; let randomIndex: number;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [a[randomIndex], a[currentIndex]] = [a[currentIndex], a[randomIndex]];
    }

    return a;
  }

  console.log(questions);

  return (
    <div className="App">
      {questions.map(item => (
        <div key={item.question}>
          <p>{item.question}</p>
          {item.combined_answers.map(i => <button key={i} className="p-2 m-2 bg-slate-500">{i}</button>)}
        </div>
      ))}
    </div>
  )
}

export default App;
