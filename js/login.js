// 모달 애니메이션
$(".email-signup").hide();
$("#signup-box-link").click(function () {
  $(".email-login").fadeOut(100);
  $(".email-signup").delay(100).fadeIn(100);
  $("#login-box-link").removeClass("active");
  $("#signup-box-link").addClass("active");
});
$("#login-box-link").click(function () {
  $(".email-login").delay(100).fadeIn(100);
  $(".email-signup").fadeOut(100);
  $("#login-box-link").addClass("active");
  $("#signup-box-link").removeClass("active");
});

// 로그인 버튼 클릭시 입력된 정보 보내기
document.getElementById('login').addEventListener('click', function(e) {
  e.preventDefault(); // 폼 제출 방지

  

  // 사용자 입력 값 가져오기
  var inputUsername = document.querySelector('input[type="text"]').value;
  var inputPassword = document.querySelector('input[type="password"]').value;
  

  // 유효성 검사

  // JSON 파일에서 사용자 데이터 불러오기
  fetch('/JSON/userList.json')
      .then(response => response.json())
      .then(users => {
          let isAuthenticated = false;
          users.forEach(user => {
              // 입력된 아이디와 비밀번호가 JSON 파일의 데이터와 일치하는지 확인
              if (user.user_id === inputUsername && user.user_pw === inputPassword) {
                  isAuthenticated = true;
              }
          });

          // 인증 결과에 따라 메시지 표시
          if (isAuthenticated) {
              alert('로그인 성공!');
          } else {
              alert('아이디 또는 비밀번호가 잘못되었습니다.');
          }
      })
      .catch(error => {
          console.error('Error fetching user data:', error);
          alert('로그인 처리 중 오류가 발생했습니다.');
      });
});

