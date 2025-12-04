// راه‌اندازی Swiper محصولات مرتبط
const swiperRelated = new Swiper('.relatedProductsSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.relatedProductsSwiper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.relatedProductsSwiper .swiper-button-next',
        prevEl: '.relatedProductsSwiper .swiper-button-prev',
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
    },
    rtl: true,
});

// مدیریت گالری تصاویر
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainImage');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
        // حذف کلاس active از همه thumbnailها
        thumbnails.forEach(t => t.classList.remove('active'));

        // اضافه کردن کلاس active به thumbnail کلیک شده
        this.classList.add('active');

        // تغییر تصویر اصلی
        const newImageSrc = this.getAttribute('data-image');
        mainImage.src = newImageSrc;
    });
});

// مدیریت کمیت محصول
const minusBtn = document.querySelector('.minus-btn');
const plusBtn = document.querySelector('.plus-btn');
const quantityInput = document.querySelector('.quantity-input');

minusBtn.addEventListener('click', function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
});

plusBtn.addEventListener('click', function () {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
});

// مدیریت تب‌ها
const tabHeaders = document.querySelectorAll('.tab-header');
const tabPanes = document.querySelectorAll('.tab-pane');

tabHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        // حذف کلاس active از همه تب‌ها
        tabHeaders.forEach(h => h.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // اضافه کردن کلاس active به تب انتخابی
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// مدیریت سوالات متداول
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');

        // بستن همه پاسخ‌ها
        faqQuestions.forEach(q => {
            if (q !== this) {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
                q.querySelector('i').classList.remove('fa-chevron-up');
                q.querySelector('i').classList.add('fa-chevron-down');
            }
        });

        // باز/بسته کردن پاسخ جاری
        this.classList.toggle('active');
        answer.classList.toggle('active');

        if (this.classList.contains('active')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

// سیستم رتبه‌بندی در فرم ثبت نظر
const ratingStars = document.querySelectorAll('.rating-input i');
let selectedRating = 0;

ratingStars.forEach(star => {
    star.addEventListener('mouseover', function () {
        const rating = parseInt(this.getAttribute('data-rating'));
        highlightStars(rating);
    });

    star.addEventListener('mouseleave', function () {
        highlightStars(selectedRating);
    });

    star.addEventListener('click', function () {
        selectedRating = parseInt(this.getAttribute('data-rating'));
        highlightStars(selectedRating);
    });
});

function highlightStars(rating) {
    ratingStars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// مدیریت افزودن به سبد خرید
const addToCartBtn = document.getElementById('addToCartBtn');
const cartCount = document.querySelector('.cart-count');

// تابع تبدیل فارسی به انگلیسی
function persianToEnglish(str) {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < 10; i++) {
        str = str.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
    }
    return str;
}

addToCartBtn.addEventListener('click', function () {
    // تبدیل فارسی به انگلیسی و افزایش تعداد سبد خرید
    let currentCountText = cartCount.textContent;
    let currentCount = parseInt(persianToEnglish(currentCountText)) || 0;
    const quantity = parseInt(quantityInput.value) || 1;
    cartCount.textContent = currentCount + quantity;

    // افکت دکمه
    const originalHTML = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i> افزوده شد!';
    this.style.backgroundColor = 'var(--success-color)';

    setTimeout(() => {
        this.innerHTML = originalHTML;
        this.style.backgroundColor = '';
    }, 1500);
});

// دکمه‌های افزودن به سبد خرید
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        // تبدیل فارسی به انگلیسی و افزایش تعداد سبد خرید
        let currentCountText = cartCount.textContent;
        let currentCount = parseInt(persianToEnglish(currentCountText)) || 0;
        cartCount.textContent = currentCount + 1;

        // افکت دکمه
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> افزوده شد!';
        this.style.backgroundColor = 'var(--success-color)';

        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.backgroundColor = '';
        }, 1500);
    });
});


// مدیریت فرم ثبت نظر
const submitReviewBtn = document.getElementById('submitReviewBtn');

submitReviewBtn.addEventListener('click', function () {
    const name = document.getElementById('reviewName').value;
    const email = document.getElementById('reviewEmail').value;
    const title = document.getElementById('reviewTitle').value;
    const text = document.getElementById('reviewText').value;

    if (!name || !email || !title || !text || selectedRating === 0) {
        alert('لطفاً تمام فیلدها را پر کنید و به محصول امتیاز دهید.');
        return;
    }

    // نمایش پیام موفقیت
    const originalHTML = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i> نظر شما با موفقیت ثبت شد!';
    this.style.backgroundColor = 'var(--success-color)';

    setTimeout(() => {
        this.innerHTML = originalHTML;
        this.style.backgroundColor = '';

        // ریست فرم
        document.getElementById('reviewName').value = '';
        document.getElementById('reviewEmail').value = '';
        document.getElementById('reviewTitle').value = '';
        document.getElementById('reviewText').value = '';
        selectedRating = 0;
        highlightStars(0);
    }, 2000);
});

// توقف اتوپلی Swiper هنگام هاور
const relatedContainer = swiperRelated.el;

relatedContainer.addEventListener('mouseenter', function () {
    swiperRelated.autoplay.stop();
});

relatedContainer.addEventListener('mouseleave', function () {
    swiperRelated.autoplay.start();
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