import React, { useEffect, useState } from 'react';

import Widget from '../Widget';
import Button from '../Button';

export default function QuestionWidget({ question, totalQuestions,  questionIndex, onSubmit }) {
  const questionId = `question__${questionIndex}`
  const [selectedAlternative, setSelectAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex+1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt={question.description}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form onSubmit={(evt) => {
          evt.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectAlternative(undefined);
          }, 3 * 1000);
        }}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic 
                key={alternativeIndex}
                as='label'
                htmlFor={alternativeId}
              >
                <input 
                  id={alternativeId}
                  type='radio'
                  onChange={() => setSelectAlternative(alternativeIndex)}
                  name={questionId}
                />
                {` ${alternative}`}
              </Widget.Topic>
            );
          })}
          <Button type='submit' disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Você Acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você Errou!</p>}
        </form>
      </Widget.Content>
    </Widget>
  );
}