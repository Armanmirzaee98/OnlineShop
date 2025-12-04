// مدیریت فیلترهای سایدبار
const groupTitles = document.querySelectorAll('.group-title');
const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
const clearFiltersBtn = document.querySelector('.clear-filters');
const applyFiltersBtn = document.querySelector('.filter-buttons .btn-primary');
const resetFiltersBtn = document.querySelector('.filter-buttons .btn-outline');

// باز و بسته کردن بخش‌های فیلتر
groupTitles.forEach(title => {
    title.addEventListener('click', function () {
        const options = this.nextElementSibling;
        this.classList.toggle('active');
        options.classList.toggle('active');
    });
});

// انتخاب چک‌باکس‌ها
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function () {
        this.classList.toggle('checked');
    });
});

// پاک کردن فیلترها
clearFiltersBtn.addEventListener('click', function () {
    filterCheckboxes.forEach(checkbox => {
        checkbox.classList.remove('checked');
    });
});

// بازنشانی فیلترها
resetFiltersBtn.addEventListener('click', function () {
    filterCheckboxes.forEach(checkbox => {
        checkbox.classList.remove('checked');
    });

    // بازگرداندن قیمت به حالت اولیه
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    rangeMin.value = 5000000;
    rangeMax.value = 80000000;
    updateRangeValues();
});

// مدیریت رنج قیمت
const rangeMin = document.querySelector('.range-min');
const rangeMax = document.querySelector('.range-max');
const progress = document.querySelector('.progress');
const minValue = document.querySelector('.min-value');
const maxValue = document.querySelector('.max-value');

function updateRangeValues() {
    const min = parseInt(rangeMin.value);
    const max = parseInt(rangeMax.value);

    // اطمینان از اینکه min از max کمتر باشد
    if (min > max) {
        rangeMin.value = max;
        rangeMax.value = min;
        updateRangeValues();
        return;
    }

    // به‌روزرسانی progress bar
    const minPercent = (min / rangeMin.max) * 100;
    const maxPercent = (max / rangeMax.max) * 100;
    progress.style.right = `${minPercent}%`;
    progress.style.left = `${100 - maxPercent}%`;

    // فرمت قیمت‌ها
    minValue.textContent = formatPrice(min) + ' تومان';
    maxValue.textContent = formatPrice(max) + ' تومان';
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

rangeMin.addEventListener('input', updateRangeValues);
rangeMax.addEventListener('input', updateRangeValues);

// مقداردهی اولیه
updateRangeValues();

// مدیریت تغییر حالت نمایش (گرید/لیست)
const viewBtns = document.querySelectorAll('.view-btn');
const productsContainer = document.getElementById('productsContainer');

viewBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const viewType = this.getAttribute('data-view');

        // حذف کلاس active از همه دکمه‌ها
        viewBtns.forEach(b => b.classList.remove('active'));

        // اضافه کردن کلاس active به دکمه کلیک شده
        this.classList.add('active');

        // تغییر کلاس container محصولات
        productsContainer.className = `products-${viewType}`;
    });
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

// مدیریت علاقه‌مندی‌ها
const wishlistBtns = document.querySelectorAll('.action-btn.wishlist');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        this.classList.toggle('active');

        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-heart"></i>';
        }
    });
});

// مدیریت پینیشن
const pageBtns = document.querySelectorAll('.page-btn:not(.disabled)');

pageBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        if (!this.classList.contains('active')) {
            // حذف کلاس active از همه دکمه‌ها
            document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));

            // اضافه کردن کلاس active به دکمه کلیک شده
            this.classList.add('active');

            // اینجا می‌توانید منطق بارگذاری صفحه جدید را اضافه کنید
            console.log('بارگذاری صفحه:', this.textContent);
        }
    });
});

// مدیریت مرتب‌سازی
const sortSelect = document.querySelector('.sort-select');

sortSelect.addEventListener('change', function () {
    console.log('مرتب‌سازی بر اساس:', this.value);
    // اینجا می‌توانید منطق مرتب‌سازی محصولات را اضافه کنید
});

// افکت اسکرول برای نوار هدر
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '5px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = 'var(--shadow)';
    }
});

// مدیریت ناوبری دسته‌بندی
const subcategoryCards = document.querySelectorAll('.subcategory-card');

subcategoryCards.forEach(card => {
    card.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('انتقال به زیردسته:', this.querySelector('.subcategory-name').textContent);
        // اینجا می‌توانید منطق فیلتر بر اساس زیردسته را اضافه کنید
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