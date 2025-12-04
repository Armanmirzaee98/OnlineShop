// تایمر اصلی تخفیف‌ها
function updateCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // تاریخ پایان تخفیف (۵ روز دیگر)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 5);
    endDate.setHours(23, 59, 59, 0);

    const now = new Date();
    const timeRemaining = endDate - now;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    } else {
        daysElement.textContent = '۰۰';
        hoursElement.textContent = '۰۰';
        minutesElement.textContent = '۰۰';
        secondsElement.textContent = '۰۰';
    }
}

// تایمر فروش لحظه‌ای
function updateFlashCountdown() {
    const hoursElement = document.getElementById('flash-hours');
    const minutesElement = document.getElementById('flash-minutes');
    const secondsElement = document.getElementById('flash-seconds');

    // زمان باقی‌مانده (۳ ساعت و ۱۵ دقیقه و ۳۰ ثانیه)
    let hours = 3;
    let minutes = 15;
    let seconds = 30;

    // در حالت واقعی این محاسبات بر اساس زمان سرور انجام می‌شود
    // اینجا فقط برای نمایش کاهش می‌دهیم
    seconds--;

    if (seconds < 0) {
        seconds = 59;
        minutes--;

        if (minutes < 0) {
            minutes = 59;
            hours--;

            if (hours < 0) {
                hours = 0;
                minutes = 0;
                seconds = 0;
            }
        }
    }

    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// فیلتر دسته‌بندی محصولات
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const tabButtons = document.querySelectorAll('.tab-btn');

    // به‌روزرسانی تب فعال
    tabButtons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // فیلتر محصولات
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'flex';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'scale(1)';
            }, 10);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'scale(0.8)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

// راه‌اندازی تب‌ها
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.dataset.category;
        filterProducts(category);
    });
});

// راه‌اندازی تایمرها
setInterval(updateCountdown, 1000);
setInterval(updateFlashCountdown, 1000);
updateCountdown();
updateFlashCountdown();

// انیمیشن برای دکمه افزودن به سبد خرید
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        const productCard = this.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;

        // انیمیشن
        this.innerHTML = '<i class="fas fa-check"></i> اضافه شد!';
        this.style.backgroundColor = '#28a745';

        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-cart-plus"></i> افزودن به سبد خرید';
            this.style.backgroundColor = '';
        }, 2000);

        // نمایش پیام
        alert(`"${productTitle}" به سبد خرید اضافه شد!`);
    });
});

// انیمیشن برای دکمه‌های خرید سریع
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.textContent.includes('خرید سریع')) {
            e.preventDefault();

            // انیمیشن کلیک
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            alert('در حال انتقال به صفحه پرداخت...');
        }
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