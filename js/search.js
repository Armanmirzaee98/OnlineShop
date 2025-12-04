// تابع جستجو
function performSearch() {
    const query = document.getElementById('searchQuery').value;
    const category = document.getElementById('categoryFilter').value;
    const price = document.getElementById('priceFilter').value;
    const sort = document.getElementById('sortFilter').value;

    // در حالت واقعی اینجا درخواست AJAX به سرور ارسال می‌شود
    // برای نمایش، فقط عنوان نتایج را به‌روز می‌کنیم
    const resultsTitle = document.querySelector('.search-results-title span');
    resultsTitle.textContent = `"${query}"`;

    // نمایش پیام در کنسول برای نمونه
    console.log(`جستجو: ${query}, دسته‌بندی: ${category}, قیمت: ${price}, مرتب‌سازی: ${sort}`);

    // نمایش انیمیشن برای کاربر
    const resultsGrid = document.getElementById('searchResults');
    resultsGrid.style.opacity = '0.5';

    setTimeout(() => {
        resultsGrid.style.opacity = '1';
        alert(`جستجوی "${query}" با موفقیت انجام شد. در حالت واقعی، نتایج جدید از سرور دریافت می‌شوند.`);
    }, 500);
}

// تابع پاک کردن فیلترها
function clearFilters() {
    document.getElementById('searchQuery').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('sortFilter').value = 'relevant';

    // بازنشانی عنوان جستجو
    const resultsTitle = document.querySelector('.search-results-title span');
    resultsTitle.textContent = `""`;

    alert('تمام فیلترها بازنشانی شدند.');
}

// راه‌اندازی جستجو هنگام فشردن Enter
document.getElementById('searchQuery').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// اتصال جستجوی هدر به این صفحه
document.getElementById('mainSearchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const query = this.value;
        if (query.trim()) {
            // ذخیره کوئری در localStorage برای استفاده در صفحه جستجو
            localStorage.setItem('searchQuery', query);
            // در حالت واقعی، کاربر به صفحه جستجو هدایت می‌شود
            alert(`در حالت واقعی، کاربر به صفحه جستجو با عبارت "${query}" هدایت می‌شود.`);
        }
    }
});

// بارگذاری کوئری جستجو از localStorage در صورت وجود
window.addEventListener('load', function () {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
        document.getElementById('searchQuery').value = savedQuery;
        document.querySelector('.search-results-title span').textContent = `"${savedQuery}"`;
        localStorage.removeItem('searchQuery');
    }
});

// مدیریت افزودن به سبد خرید
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // تبدیل فارسی به انگلیسی
        function persianToEnglish(str) {
            const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            for (let i = 0; i < 10; i++) {
                str = str.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
            }
            return str;
        }

        let currentCount = parseInt(persianToEnglish(cartCount.textContent)) || 0;
        cartCount.textContent = currentCount + 1;

        // افکت دکمه
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> افزوده شد!';
        this.classList.add('added');

        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.classList.remove('added');
        }, 1500);
    });
});

// منوی موبایل
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav-links > li > a');

// باز و بسته کردن منو
mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';

    // تغییر آیکون
    const icon = mobileMenuBtn.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// بستن منو با کلیک روی overlay
overlay.addEventListener('click', () => {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';

    // تغییر آیکون به حالت اول
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');

    // بستن همه منوهای کشویی
    document.querySelectorAll('.nav-links > li.active').forEach(item => {
        item.classList.remove('active');
    });
});

// مدیریت منوهای کشویی در موبایل
navLinks.forEach(link => {
    if (link.nextElementSibling && link.nextElementSibling.classList.contains('dropdown-menu')) {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();

                const dropdown = this.parentElement;
                const isActive = dropdown.classList.contains('active');

                // بستن همه منوهای باز دیگر
                document.querySelectorAll('.nav-links > li.active').forEach(item => {
                    if (item !== dropdown) {
                        item.classList.remove('active');
                    }
                });

                // باز/بسته کردن منوی جاری
                dropdown.classList.toggle('active');

                // بستن زیرمنوهای دیگر
                const allSubmenus = document.querySelectorAll('.dropdown-menu .dropdown');
                allSubmenus.forEach(submenu => {
                    if (!dropdown.contains(submenu)) {
                        submenu.classList.remove('active');
                    }
                });
            }
        });
    }
});

// بستن منو با کلیک روی لینک‌ها (به جز لینک‌های دارای زیرمنو)
document.querySelectorAll('.nav-links a').forEach(link => {
    if (!link.nextElementSibling || !link.nextElementSibling.classList.contains('dropdown-menu')) {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navbar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';

                // تغییر آیکون به حالت اول
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');

                // بستن همه منوهای کشویی
                document.querySelectorAll('.nav-links > li.active').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }
});

// بستن منو هنگام تغییر سایز پنجره
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        // تغییر آیکون به حالت اول
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');

        // بستن همه منوهای کشویی
        document.querySelectorAll('.nav-links > li.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// جلوگیری از بستن منو هنگام کلیک داخل آن
navbar.addEventListener('click', (e) => {
    e.stopPropagation();
});

// مدیریت زیرمنوها در موبایل
document.querySelectorAll('.dropdown-menu .dropdown > a').forEach(subLink => {
    subLink.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            e.stopPropagation();

            const subDropdown = this.parentElement;
            subDropdown.classList.toggle('active');
        }
    });
});