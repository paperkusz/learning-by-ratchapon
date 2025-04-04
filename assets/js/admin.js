 // ระบบหลังบ้าน
document.addEventListener('DOMContentLoaded', function() {
    // Toggle Sidebar
    const btnToggleSidebar = document.querySelector('.btn-toggle-sidebar');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (btnToggleSidebar && sidebar) {
        btnToggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Profile Dropdown
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown) {
        profileDropdown.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    
    // จำลองการโหลดข้อมูล
    if (document.querySelector('.activity-list')) {
        const activities = [
            {
                icon: 'fa-user-plus',
                color: 'primary',
                text: 'ผู้ใช้ใหม่ "นางสาวสมหญิง ใจดี" ได้สมัครสมาชิก',
                time: '5 นาทีที่แล้ว'
            },
            {
                icon: 'fa-video',
                color: 'success',
                text: 'อัพโหลดวิดีโอใหม่ "การเขียนโปรแกรม Python"',
                time: '1 ชั่วโมงที่แล้ว'
            },
            {
                icon: 'fa-question-circle',
                color: 'warning',
                text: 'แบบทดสอบใหม่ "HTML Basics" รอการตรวจสอบ',
                time: '2 ชั่วโมงที่แล้ว'
            },
            {
                icon: 'fa-file-alt',
                color: 'info',
                text: 'เอกสารใหม่ "คู่มือการใช้งานระบบ" ได้รับการอัพเดต',
                time: '1 วันที่แล้ว'
            }
        ];
        
        const activityList = document.querySelector('.activity-list');
        activities.forEach(activity => {
            activityList.innerHTML += `
                <div class="activity-item">
                    <div class="activity-icon bg-${activity.color}">
                        <i class="fas ${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <p>${activity.text}</p>
                        <small>${activity.time}</small>
                    </div>
                </div>
            `;
        });
    }
});