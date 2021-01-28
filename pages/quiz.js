import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import db from '../db.json';

import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuestionWidget from '../src/components/QuestionWidget';
import Button from '../src/components/Button';
import QuizLogo from '../src/components/QuizLogo';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h3>
          
        </h3>
      </Widget.Header>
      <img
        alt='loading'
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src='https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
      />
      <Widget.Content>
        <h2>
        </h2>
        <p>
          
        </p>

        <Button>
          Confirmar
        </Button>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
}

export default function QuizPage() {
  const router = useRouter(); 
  const {name} = router.query;

  const [screenState, setScreenState] = useState(screenStates.LOADING);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = db.questions[currentQuestion];
  const totalQuestions = db.questions.length;

  useEffect(() => {
    function changeState() {
      setScreenState(screenStates.QUIZ);
    }

    // fectch
    setTimeout(changeState, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = currentQuestion + 1;
    if(nextQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget 
            question={question}
            questionIndex={currentQuestion}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && (
          <LoadingWidget />
        )}

        {screenState === screenStates.RESULT && (
          <div>
            Você acertou X questões
          </div>
        )}
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucBonnet" />
    </QuizBackground>
  );
}
