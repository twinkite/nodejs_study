async function getUser() { // 로딩 시 사용자 가져오는 함수
    try {
      const res = await axios.get('/pages');
      const pages = res.data;
      console.log(res); 
      const list = document.getElementById('list');
      list.innerHTML = '';
      // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
      Object.keys(pages).map(function (key) {
        const userDiv = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = pages[key];
        console.log(pages[key]);
        const edit = document.createElement('button');
        edit.textContent = '수정';
        edit.addEventListener('click', async () => { // 수정 버튼 클릭
          const text = prompt('새로운 게시글 내용을 입력하세요');
          if (!text) {
            return alert('내용을 반드시 입력해야 합니다');
          }
          try {
            await axios.put('/pages/' + key, { text });
            getUser();
          } catch (err) {
            console.error(err);
          }
        });
        const remove = document.createElement('button');
        remove.textContent = '삭제';
        remove.addEventListener('click', async () =>{
          try{
            await axios.delete('/pages/' + key);
            getUser();
          } catch(err){
            console.error(err);
          }
        });
        userDiv.appendChild(span);
        userDiv.appendChild(edit);
        userDiv.appendChild(remove);
        list.appendChild(userDiv);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  window.onload = getUser; // 화면 로딩 시 getUser 호출
  // 폼 제출(submit) 시 실행
  document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = e.target.post.value;
    if (!text) {
      return alert('게시글을 입력하세요');
    }
    try {
      await axios.post('/pages', { text });
      getUser();
    } catch (err) {
      console.error(err);
    }
    e.target.post.value = '';
  });