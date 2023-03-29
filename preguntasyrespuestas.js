// "use strict";
const preguntasRespuestasContador = () => {
  let score = 0;
  const preguntasRespuestas = async (index) => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
      );
      const body = await response.json();
      const { question, answers, correct } = body[index];
      const div = document.querySelector("div");
      const questionElement = document.createElement("p");
      const answersElement = document.createElement("ul");
      const span = document.createElement("span");

      questionElement.textContent = question;
      div.append(questionElement);
      div.append(answersElement);
      div.append(span);
      span.append(score);

      for (const answer of answers) {
        const answerElement = document.createElement("li");
        answerElement.textContent = answer;
        answersElement.append(answerElement);
        answerElement.addEventListener("click", () => {
          if (answerElement.textContent === correct) {
            score++;
            const nextButton = document.createElement("button");
            nextButton.textContent = "Next";
            div.appendChild(nextButton);
            nextButton.addEventListener("click", () => {
              score++;
              div.innerHTML = "";
              preguntasRespuestas(index + 1);
            });
            const colorAnswers = () => {
              const timeoutID = setInterval(() => {
                answerElement.style.backgroundColor = "green";
                clearInterval(timeoutID);
              });

              colorAnswers();
            };
            colorAnswers();
          } else {
          }

          answerElement.style.color = "white";

          span.textContent = score;
          div.innerHTML = "";

          if (index === body.length - 1) {
            const mensajeFinal = document.createElement("h2");
            mensajeFinal.textContent = `Your final score is ${score}`;
            div.appendChild(mensajeFinal);

            const restartButton = document.createElement("button");
            restartButton.textContent = "Reset game";
            div.appendChild(restartButton);

            restartButton.addEventListener("click", () => {
              score = 0;

              preguntasRespuestas(0);
              restartButton.remove();
              mensajeFinal.remove();
            });
          } else {
            preguntasRespuestas(index + 1);
          }
        });
      }

      //mensaje de contador al final.
      // if (question === question.lenght) {
      // questionElement.textContent = `Tu resultado es ${contador}`;
      //}
    } catch (error) {
      console.error(error.message);
    }
  };
  preguntasRespuestas(0);
};

export default preguntasRespuestasContador;
