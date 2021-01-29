import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget 
          as={motion.section}
          variants={{
            show: {opacity: 1, y: '0'},
            hidden: {opacity: 0, y: '100%'},
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0, duration: 0.5 }}
        >
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
        <Widget
          as={motion.section}
          variants={{
            show: {opacity: 1},
            hidden: {opacity: 0},
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
           
            <ul>
              {db.external.map((linkExterno, index) => {
                const [projectName, user] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li key={index}>
                    <Widget.Topic as={Link} href={`/quiz/${projectName}___${user}`}>
                      {`${user}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer 
          as={motion.section}
          variants={{
            show: {opacity: 1},
            hidden: {opacity: 0},
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucBonnet" />
    </QuizBackground>
  );
}
