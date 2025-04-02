 // Main JavaScript File for Admin Dashboard System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components when DOM is loaded
    initSidebar();
    initSearch();
    initNotifications();
    initDataTables();
    initForms();
    initModals();
    initFilters();
    initPagination();
});

// Sidebar Toggle Functionality
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.createElement('div');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    sidebarToggle.style.display = 'none';
    
    document.body.appendChild(sidebarToggle);
    
    sidebarToggle.addEventListener('click', function() {
        const isCollapsed = sidebar.style.width === '0px' || sidebar.style.width === '';
        if (isCollapsed) {
            sidebar.style.width = '250px';
            document.querySelector('.main-content').style.marginLeft = '250px';
        } else {
            sidebar.style.width = '0';
            document.querySelector('.main-content').style.marginLeft = '0';
        }
    });
    
    // Handle responsive behavior
    function handleResize() {
        if (window.innerWidth < 576) {
            sidebar.style.width = '0';
            document.querySelector('.main-content').style.marginLeft = '0';
            sidebarToggle.style.display = 'flex';
        } else if (window.innerWidth < 992) {
            sidebar.style.width = '80px';
            document.querySelector('.main-content').style.marginLeft = '80px';
            sidebarToggle.style.display = 'none';
        } else {
            sidebar.style.width = '250px';
            document.querySelector('.main-content').style.marginLeft = '250px';
            sidebarToggle.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
}

// Search Functionality
function initSearch() {
    const searchBars = document.querySelectorAll('.search-bar input');
    
    searchBars.forEach(searchBar => {
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableId = this.closest('.content-container')?.querySelector('table')?.id;
            
            if (tableId) {
                filterTable(tableId, searchTerm);
            }
        });
    });
}

// Filter tables based on search input
function filterTable(tableId, searchTerm) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(searchTerm) ? '' : 'none';
    });
}

// Notifications System
function initNotifications() {
    const notificationIcon = document.querySelector('.notification-icon');
    if (!notificationIcon) return;
    
    notificationIcon.addEventListener('click', function() {
        // In a real app, this would fetch notifications from server
        alert('แสดงการแจ้งเตือนทั้งหมด');
        // Mark notifications as read
        const count = this.querySelector('.notification-count');
        if (count) count.style.display = 'none';
    });
}

// Data Tables Initialization
function initDataTables() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        // Add IDs to tables for filtering if they don't have them
        if (!table.id) {
            table.id = 'table-' + Math.random().toString(36).substr(2, 9);
        }
        
        // Make rows clickable (for edit functionality)
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', function(e) {
                // Don't trigger if clicking on an action button
                if (e.target.closest('.action-btn')) return;
                
                // In a real app, this would open the edit page for the item
                const id = this.getAttribute('data-id');
                if (id) {
                    // Determine which type of item we're editing based on the page
                    if (window.location.pathname.includes('users')) {
                        window.location.href = `admin-users-edit.html?id=${id}`;
                    } else if (window.location.pathname.includes('videos')) {
                        window.location.href = `admin-videos-edit.html?id=${id}`;
                    } else if (window.location.pathname.includes('materials')) {
                        window.location.href = `admin-materials-edit.html?id=${id}`;
                    } else if (window.location.pathname.includes('quizzes')) {
                        window.location.href = `admin-quizzes-edit.html?id=${id}`;
                    }
                }
            });
        });
    });
}

// Form Handling
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--accent-color)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // In a real app, this would submit to the server
                alert('แบบฟอร์มถูกส่งเรียบร้อยแล้ว!');
                // this.submit(); // Uncomment in real implementation
            } else {
                alert('กรุณากรอกข้อมูลในช่องที่จำเป็นให้ครบถ้วน');
            }
        });
    });
}

// Modal Dialogs
function initModals() {
    // Delete confirmation modals
    const deleteButtons = document.querySelectorAll('.action-btn .fa-trash');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const itemName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
            if (confirm(`คุณแน่ใจว่าต้องการลบ "${itemName.trim()}" ใช่หรือไม่?`)) {
                // In a real app, this would delete the item
                this.closest('tr').remove();
                alert('ลบรายการเรียบร้อยแล้ว');
            }
        });
    });
}

// Filter Systems
function initFilters() {
    const filterBars = document.querySelectorAll('.filter-bar');
    
    filterBars.forEach(filterBar => {
        const selects = filterBar.querySelectorAll('.filter-select');
        
        selects.forEach(select => {
            select.addEventListener('change', function() {
                // In a real app, this would filter the table or refresh data from server
                const table = this.closest('.content-container').querySelector('table');
                if (table) {
                    // Simulate filtering
                    const rows = table.querySelectorAll('tbody tr');
                    const filterValue = this.value.toLowerCase();
                    const filterType = this.id.replace('-filter', '');
                    
                    rows.forEach(row => {
                        let shouldShow = true;
                        
                        if (filterValue) {
                            if (filterType === 'role') {
                                const role = row.querySelector('.role-badge').textContent.toLowerCase();
                                shouldShow = role.includes(filterValue);
                            } else if (filterType === 'status') {
                                const status = row.querySelector('.status-badge').textContent.toLowerCase();
                                shouldShow = status.includes(filterValue);
                            } else if (filterType === 'type') {
                                const type = row.querySelector('.file-type').textContent.toLowerCase();
                                shouldShow = type.includes(filterValue);
                            }
                        }
                        
                        row.style.display = shouldShow ? '' : 'none';
                    });
                }
            });
        });
    });
}

// Pagination System
function initPagination() {
    const paginations = document.querySelectorAll('.pagination');
    
    paginations.forEach(pagination => {
        const links = pagination.querySelectorAll('.page-link');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                links.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // In a real app, this would fetch the next page of data
                const page = this.textContent.trim();
                alert(`กำลังโหลดหน้า ${page}...`);
            });
        });
    });
}

// Helper function to fetch data (simulated)
async function fetchData(endpoint) {
    try {
        // In a real app, this would be a fetch() call to your API
        console.log(`Fetching data from ${endpoint}`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return mock data based on endpoint
        switch(endpoint) {
            case '/api/users':
                return mockUsers;
            case '/api/videos':
                return mockVideos;
            case '/api/materials':
                return mockMaterials;
            case '/api/quizzes':
                return mockQuizzes;
            default:
                return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Mock data for demonstration
const mockUsers = [
    { id: 1, name: 'นายสมชาย เรียนดี', email: 'somchai@example.com', role: 'student', status: 'active' },
    { id: 2, name: 'ครูสมหญิง สอนดี', email: 'somying@example.com', role: 'teacher', status: 'active' },
    { id: 3, name: 'ผู้ดูแลระบบ', email: 'admin@example.com', role: 'admin', status: 'active' }
];

const mockVideos = [
    { id: 1, title: 'การหาอนุพันธ์เบื้องต้น', category: 'คณิตศาสตร์', status: 'published' },
    { id: 2, title: 'กฎการเคลื่อนที่ของนิวตัน', category: 'วิทยาศาสตร์', status: 'published' }
];

const mockMaterials = [
    { id: 1, title: 'แบบฝึกหัดคณิตศาสตร์บทที่ 1', category: 'คณิตศาสตร์', type: 'pdf', status: 'published' },
    { id: 2, title: 'สรุปเนื้อหาฟิสิกส์', category: 'วิทยาศาสตร์', type: 'docx', status: 'published' }
];

const mockQuizzes = [
    { id: 1, title: 'แบบทดสอบอนุพันธ์เบื้องต้น', category: 'คณิตศาสตร์', status: 'published' },
    { id: 2, title: 'แบบทดสอบกฎการเคลื่อนที่', category: 'วิทยาศาสตร์', status: 'published' }
];

// Export functions for use in other modules if needed
export {
    initSidebar,
    initSearch,
    initNotifications,
    initDataTables,
    initForms,
    initModals,
    initFilters,
    initPagination,
    fetchData
};