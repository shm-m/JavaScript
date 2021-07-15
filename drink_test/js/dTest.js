const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [0, 0, 0];

function calResult(){
  console.log(select);
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 0.5s";
  qna.style.animation = "fadeOut 0.5s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 0.5s";
    result.style.animation = "fadeIn 0.5s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    setResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for(let i = 0; i < target.length; i++){
        select[target[i]] += 1;
      }

      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    },450)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 0.5s";
  main.style.animation = "fadeOut 0.5s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 0.5s";
    qna.style.animation = "fadeIn 0.5s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}

const qnaList = [
  {
    q: '1. 기분이 싱숭생숭, 술 한잔이 하고 싶을 때...',
    a: [
      { answer: 'a. 야 어디야? 나와서 술 한잔 하자.', type: [2] },
      { answer: 'b. 넷플릭스를 틀고~ 안주는 뭘로 하지~', type: [0] },
    ]
  },
  {
    q: '2. 가장 좋아하는 술을 친구들한테 설명할 때의 나는?',
    a: [
      { answer: 'a. 엄청 맛있어! 일단 마셔봐.', type: [0] },
      { answer: 'b. 첫 맛은 드라이하면서, 유칼립스투스 향이 입안을 맴도는데...', type: [2] },
    ]
  },
  {
    q: '3. 자주 가는 단골 식당에 새로운 메뉴가 보인다면?',
    a: [
      { answer: 'a. 오, 이건 뭐지? 이걸로 하나 주세요! ', type: [1] },
      { answer: 'b. 늘 먹던 대로 주세요.', type: [0] },
    ]
  },
  {
    q: '4. 장바구니는 무겁고, 마시고 싶은 술이 두개라면 나는...',
    a: [
      { answer: 'a. 둘 중에 패키지가 더 예쁜 술을 고른다.', type: [2] },
      { answer: 'b. 둘 중에 도수가 더 높은 술을 고른다.', type: [1] },
    ]
  },
  {
    q: '5. 오늘따라 술이 잘 받네?',
    a: [
      { answer: 'a. 오늘 그냥 죽어~ 달려~ ', type: [1] },
      { answer: 'b. 그래도 주량은 넘기지 말자.', type: [2] },
    ]
  },
  {
    q: '6. 술이 맛있는 이유는...',
    a: [
      { answer: 'a. 당연히 맛있으니까!', type: [1] },
      { answer: 'b. 안주가 맛있어야 술도 맛있는거야.', type: [0] },
    ]
  },
  {
    q: '7. 오랜만에 만난 친구가 칵테일 바를 가자고 할 때 나는?',
    a: [
      { answer: 'a. 달달한 음료를 원해!', type: [0] },
      { answer: 'b. 난 칵테일 음료수같아서 별로야...', type: [1] },
    ]
  },
  {
    q: '8. 곧 있으면 친구의 생일인데 뭘 사줄까?',
    a: [
      { answer: 'a. 오늘 술값은 내가 쏜다!', type: [1] },
      { answer: 'b. 너를 위해 곱게 포장했어.', type: [2] },
    ]
  },
  {
    q: '9. 지나가는 사람의 향기가 내 코끝을 스칠 때...',
    a: [
      { answer: 'a. 헉, 너무 좋다. 무슨 향일까?', type: [1] },
      { answer: 'b. (컹...)', type: [0] },
    ]
  },
  {
    q: '10. 여보세요 나야 거기 잘 지내지 ~ ♬',
    a: [
      { answer: 'a. 자니? ... 쓸쓸한데 전골이나 먹어야지... ', type: [0] },
      { answer: 'b. 응, 나 승진했고 잘나가고~', type: [2] },
    ]
  },
  {
    q: '11. 외국 여행 좋아해?',
    a: [
      { answer: 'a. 당연하지, 다양한 경험을 쌓을 수 있다고!', type: [2] },
      { answer: 'b. 우리 것이 최고여...', type: [1] },
    ]
  },
  {
    q: '12. 이번 달 지갑 사정이 좋지 않다면?',
    a: [
      { answer: 'a. 긴축 재정에 들어갑니다. ', type: [0] },
      { answer: 'b. 내가 돈이 없지, 자존심이 없나!', type: [2] },
    ]
  },
]

const infoList = [
  {
    name: '아직은 기본이 좋아, A 패키지',
    desc: '(설명)'
  },
  {
    name: '술은 취하려고 마시는 거다, B 패키지',
    desc: '(설명)'
  },
  {
    name: '술은 취미다, C 패키지',
    desc: '(설명)'
  },
]

