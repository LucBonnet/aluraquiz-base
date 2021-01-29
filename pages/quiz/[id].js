import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz/';

export default function QuizDaGaleraPage({ dbExterno }){
  return (
    <div>
      <ThemeProvider theme={dbExterno.theme}>
        <QuizScreen
          externalQuestions={dbExterno.questions}
          externalBg={dbExterno.bg}
        />
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [projectName, user] = context.query.id.split('___');
  // console.log("Infos que o Next da para nós", context.query.id);

  const dbExterno = await fetch(`https://${projectName}.${user}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if(respostaDoServer.ok) {
        return respostaDoServer.json();
      }

      throw new Error('Falha em pegar os dados');
    })
    .then((respostaConvertidaEmObjeto)=> respostaConvertidaEmObjeto)
    .catch((err) => {
      console.log(err);
    });

  // console.log(dbExterno);

  return {
    props: {
      dbExterno,
    },
  };
}