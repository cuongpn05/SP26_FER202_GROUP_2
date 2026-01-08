const users = [
  { username: "kien123", password: "123" }
];

document.getElementById("loginBtn").addEventListener("click", function (event) {
  event.preventDefault(); // chặn form reload trang

  console.log("Nút đã được bấm");
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const result = document.getElementById("result");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    result.textContent = "✅ Đăng nhập thành công! Xin chào " + user.username;
    
  } else {
    result.textContent = "❌ Sai tài khoản hoặc mật khẩu";
  
  }
});
