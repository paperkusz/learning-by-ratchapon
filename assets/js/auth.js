 // ระบบล็อกอิน
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // จำลองการล็อกอิน
            if (email === 'admin@learninghub.com' && password === 'admin123') {
                // ล็อกอินเป็นแอดมิน
                window.location.href = '../admin/dashboard.html';
            } else if (email === 'teacher@learninghub.com' && password === 'teacher123') {
                // ล็อกอินเป็นครู
                window.location.href = '../auth/dashboard/teacher.html';
            } else if (email === 'student@learninghub.com' && password === 'student123') {
                // ล็อกอินเป็นนักเรียน
                window.location.href = '../auth/dashboard/student.html';
            } else {
                alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
            }
        });
    }
    
    // แสดง/ซ่อนรหัสผ่าน
    const btnShowPassword = document.querySelector('.btn-show-password');
    if (btnShowPassword) {
        btnShowPassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordInput.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }
});