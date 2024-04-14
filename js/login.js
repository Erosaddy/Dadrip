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

document.getElementById('login').addEventListener('click', function (e) {
    e.preventDefault(); // 폼 제출 방지

    // 사용자 입력 값 가져오기
    var inputUsername = document.querySelector('input[type="text"]').value;
    var inputPassword = document.querySelector('input[type="password"]').value;

    if (validateCredentials(inputUsername, inputPassword)) {
        authenticateUser(inputUsername, inputPassword);
    }
});

function validateCredentials(username, password) {
    const idReg = /^[a-zA-Z0-9]{5,20}$/;
    const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,60}$/; // 영문, 숫자, 특수문자 포함

    if (!idReg.test(username)) {
        document.getElementById('error-message').innerHTML = '아이디는 영어 대소문자와 숫자만 사용 가능하며, 5~20자 사이여야 합니다.';
        document.getElementById('loginId').value = '';
        document.getElementById('loginId').focus();
        return false;
    } else if (!pwReg.test(password)) {
        document.getElementById('error-message').innerHTML = '비밀번호는 영어 대소문자와 숫자, 특수문자만 사용 가능하며, 7~60자 사이여야 합니다.';
        document.getElementById('loginPw').value = '';
        document.getElementById('loginPw').focus();
        return false;
    }
    return true;
}

function authenticateUser(username, password) {
    // 로딩 상태 표시 추가 가능
    fetch('/JSON/userList.json')
        .then(response => response.json())
        .then(users => {
            let isAuthenticated = users.some(user => user.user_id === username && user.user_pw === password);

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
}
