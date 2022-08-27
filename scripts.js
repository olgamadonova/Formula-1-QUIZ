/*all answer options*/
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

/*all our options*/
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');
const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion; //индекс текущего вопроса
let indexOfPage = 0; //индекс страницы

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; //итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer');
const numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2');
const btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Гран-при какой страны обычно открывает сезон Формулы-1?',
        options: [
            'Малайзия',
            'Китай',
            'Австралия',
            'Канада',
        ],
        rightAnswer: 2
    },
    {
        question: 'Когда была первая гонка Формулы-1?',
        options: [
            '1950 г.',
            '1940 г.',
            'раньше 1940 г.',
            '1947 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кто стал победителём в личном зачете 2021 года?',
        options: [
            'Валттери Боттас',
            'Макс Ферстаппен',
            'Льюис Хэмильтон',
            'Чеко Перес',

        ],
        rightAnswer: 1
    },
    {
        question: 'С какого года основным водителем автомобиля безопасности является Бернд Майлендер?',
        options: [
            'с 1998',
            'с 2005',
            'с 2000',
            'с 2010',

        ],
        rightAnswer: 2
    },
    {
        question: 'Что означает черный флаг на трассе?',
        options: [
            'Приближение более быстрой машины, опережающей гонщика на круг и более',
            'Медленная машина на трассе',
            'Предупреждение за неспортивное поведение',
            'Дисквалификация пилота из гонки',

        ],
        rightAnswer: 3
    },
    {
        question: 'Кто стал самым молодым чемпионом мира Формулы-1 на  конец сезона 2021года?',
        options: [
            'Себастья Феттель',
            'Фернандо Алонсо',
            'Макс Ферстаппен',
            'Льюис Хэмилтон',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кто является действующим рекордстменом по количеству быстрых кругов в Формуле-1 (на конец сезона 2021 года)?',
        options: [
            'Ален Прост',
            'Михаэль Шумахер',
            'Кими Райконен',
            'Ники Лауда',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой по счету чемпионат мира по автогонкам Формула-1 проводится в 2022 году?',
        options: [
            '70-й',
            '66-й',
            '75-й',
            '73-й',
        ],
        rightAnswer: 3
    },

    {
        question: 'Какая компания не поставляет двигатели для болидов Формулы-1 (по состоянию на 2022 год)?',
        options: [
            'Ferrari',
            'Renault',
            'Audi',
            'Red Bull',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой элемент своего автомобиля каждая команда разрабатывает самостоятельно?',
        options: [
            'шасси',
            'мотор',
            'шины',
            'все элементы',
        ],
        rightAnswer: 0
    },
];

numberOfAllQuestion.innerHTML = questions.length.toString();
const load = () => {
  question.innerHTML = questions[indexOfQuestion].question //сам вопрос
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];


    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
    indexOfPage++; //увеличения индекса страницы
};
let completedAnswers = [];
const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage === questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item === randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length === 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}

const checkAnswer = (element) => {
    if (Number(element.target.dataset.id) === Number(questions[indexOfQuestion].rightAnswer)) {
        element.target.classList.add('correct');
        updateAnswerTracked('correct');
        score++;
    } else {
        element.target.classList.add('wrong');
        updateAnswerTracked('wrong');
    }
    disabledOptions();
}

const disabledOptions = () => {
  optionElements.forEach(item => {
      item.classList.add('disabled');
      if (Number(item.dataset.id) === Number(questions[indexOfQuestion].rightAnswer)) {
          item.classList.add('correct');
      }
  })
}

const enableOptions = () => {
  optionElements.forEach(item => {
      item.classList.remove('disabled', 'correct', 'wrong');
  })
};

const answerTracker = () => {
  questions.forEach(() => {
      const div = document.createElement('div');
      answersTracker.append(div);
  })
};

const updateAnswerTracked = status => {
    answersTracker.children[indexOfPage -1].classList.add(`${status}`);
}

const closeAlert = (evt) => {
    if (evt.target.closest('.alert-btn') || !evt.target.closest('.alert-content')) {
        document.querySelector('.alert-wrapper').classList.remove('active');
    }
    document.querySelector('.alert-btn').removeEventListener('click', closeAlert);
    document.querySelector('.alert-overlay').removeEventListener('click', closeAlert);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        document.querySelector('.alert-wrapper').classList.add('active');
        document.querySelector('.alert-overlay').addEventListener('click', closeAlert);
        document.querySelector('.alert-btn').addEventListener('click', closeAlert);
    } else {
        randomQuestion();
        enableOptions();
        document.querySelector('.alert-wrapper').classList.remove('active');
    }
};

btnNext.addEventListener('click', validate);

for (let option of optionElements) {
    option.addEventListener('click', evt => {
        checkAnswer(evt);
    })
}
const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score.toString();
  numberOfAllQuestion2.innerHTML = questions.length.toString();
  if (score < 6) {
      document.querySelector('.quiz-over-modal h1').textContent = 'Ты можешь лучше! Попытайся снова!'
      document.querySelector('.quiz-over-modal .content').style.backgroundColor = 'tomato';
  } else if (score >= 6 && score <=8 ){
      document.querySelector('.quiz-over-modal h1').textContent = 'Хороший результат! Можно его еще улучшить!'
      document.querySelector('.quiz-over-modal .content').style.backgroundColor = 'blue';
  } else {
      document.querySelector('.quiz-over-modal h1').textContent = 'Прекрасный результат! Ты знаток Формулы-1!'
      document.querySelector('.quiz-over-modal .content').style.backgroundColor = '';
  }
}

const tryAgain = () => {
  window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})