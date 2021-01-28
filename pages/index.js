import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Título</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(evt) => {
              evt.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <Input
                name='Nome do Usuário'
                onChange={(e) => setName(e.target.value)}
                placeholder="Preencha com seu nome"
                value={name}
              />
              <Button
                type='submit'
                disabled={name.length === 0}
              >
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Adipisci dicta rem eius mollitia voluptate laudantium
              eveniet maxime rerum cupiditate odio at distinctio natus
              vero ea, corporis praesentium incidunt quo quam?
            </p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucBonnet" />
    </QuizBackground>
  );
}
