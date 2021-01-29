import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Widget from '../../components/Widget';
import Footer from '../../components/Footer';
import GitHubCorner from '../../components/GitHubCorner';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuestionWidget from '../../components/QuestionWidget';
import Button from '../../components/Button';
import QuizLogo from '../../components/QuizLogo'; 

function ResultWidget({ results, name }){
  return (
    <Widget>
      <Widget.Header>
        <h3>
          Tela de Resultados
        </h3>
      </Widget.Header>
      <Widget.Content>
        <p>{`Parabéns ${name} `}</p>
        <p>Você acertou {results.reduce((somatoriaAtual, resultAtual) => {
          if(resultAtual) {
            return somatoriaAtual + 1;
          }
          return somatoriaAtual;
        }, 0)} perguntas</p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index}`}>
              {`#${(index+1).toString().padStart(2, '0')} Resultado: `}
              {result ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

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

        <Button type='button'>
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

export default function QuizPage({ externalQuestions, externalBg }) {
  const router = useRouter(); 
  const {name} = router.query;

  const [screenState, setScreenState] = useState(screenStates.LOADING);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const question = externalQuestions[currentQuestion];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResults(result) {
    setResults([
      ...results,
      result,
    ])
  }

  useEffect(() => {
    function changeState() {
      setScreenState(screenStates.QUIZ);
    }

    // fectch
    setTimeout(changeState, 1 * 1000); 

    return () => {
      clearTimeout(changeState);
    }
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
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget 
            question={question}
            questionIndex={currentQuestion}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResults={addResults}
          />
        )}

        {screenState === screenStates.LOADING && (
          <LoadingWidget />
        )}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} name={name}/>
        )}
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucBonnet" />
    </QuizBackground>
  );
}
