// باز و بسته کردن سوالات متداول
function toggleFAQ(faqId) {
    const faqItem = document.getElementById(faqId);
    faqItem.classList.toggle('active');
}

// فرم تماس
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // جمع‌آوری داده‌های فرم
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // نمایش انیمیشن ارسال
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
    submitBtn.disabled = true;

    // در حالت واقعی اینجا درخواست AJAX به سرور ارسال می‌شود
    setTimeout(() => {
        // شبیه‌سازی ارسال موفق
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ارسال شد!';
        submitBtn.style.backgroundColor = '#28a745';

        // نمایش پیام موفقیت
        alert(`پیام شما با موفقیت ارسال شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.\n\nموضوع: ${formData.subject}`);

        // بازنشانی فرم
        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});

// شروع چت آنلاین
function startLiveChat() {
    // نمایش شبیه‌ساز چت
    const chatWindow = document.createElement('div');
    chatWindow.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                z-index: 1001;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border: 2px solid var(--info-color);
            `;

    chatWindow.innerHTML = `
                <div style="background: linear-gradient(135deg, var(--info-color), var(--secondary-color)); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-comment-dots" style="font-size: 24px;"></i>
                        <div>
                            <h3 style="margin: 0; font-size: 18px;">پشتیبانی آنلاین</h3>
                            <p style="margin: 5px 0 0; font-size: 12px; opacity: 0.9;">کارشناس: سارا محمدی</p>
                        </div>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div style="flex: 1; padding: 20px; overflow-y: auto; background: #f8f9fa;">
                    <div style="background: white; padding: 12px 16px; border-radius: 15px 15px 15px 0; margin-bottom: 15px; max-width: 80%; align-self: flex-start; border: 1px solid #eee;">
                        <p style="margin: 0;">سلام! به مرکز پشتیبانی آنلاین خوش آمدید. چطور می‌تونم کمکتون کنم؟</p>
                        <span style="font-size: 11px; color: #999; display: block; margin-top: 5px; text-align: left;">اکنون</span>
                    </div>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <p style="color: #666; font-size: 14px;">شروع گفتگو با کارشناس پشتیبانی</p>
                    </div>
                </div>
                
                <div style="border-top: 1px solid #eee; padding: 15px; display: flex; gap: 10px;">
                    <input type="text" placeholder="پیام خود را بنویسید..." style="flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 25px; outline: none;">
                    <button style="background: var(--info-color); color: white; border: none; border-radius: 50%; width: 45px; height: 45px; cursor: pointer;">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            `;

    document.body.appendChild(chatWindow);

    // پخش صدای اعلان
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ=');
        audio.play();
    } catch (e) {
        console.log('صدا پخش نشد');
    }
}

// اعتبارسنجی فرم
document.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
    input.addEventListener('blur', function () {
        if (!this.value.trim() && this.hasAttribute('required')) {
            this.style.borderColor = '#ff4e62';
        } else {
            this.style.borderColor = '#eee';
        }
    });

    input.addEventListener('input', function () {
        this.style.borderColor = '#eee';
    });
});

// اسکرول نرم به فرم تماس
document.querySelectorAll('.contact-cards .contact-card, .faq-question').forEach(element => {
    element.addEventListener('click', function (e) {
        if (e.target.closest('.contact-card')) {
            setTimeout(() => {
                document.querySelector('.contact-form-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    });
});

// تایمر وضعیت آنلاین
function updateOnlineStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.support-status span');

    // شبیه‌سازی تغییر وضعیت (در حالت واقعی از سرور دریافت می‌شود)
    const isOnline = Math.random() > 0.1; // 90% آنلاین
    const agents = ['سارا محمدی', 'علی رضایی', 'فاطمه کریمی', 'رضا حسینی'];
    const randomAgent = agents[Math.floor(Math.random() * agents.length)];

    if (isOnline) {
        statusIndicator.style.backgroundColor = '#28a745';
        statusText.textContent = `هم‌اکنون آنلاین هستیم - ${randomAgent} آماده پاسخگویی`;
    } else {
        statusIndicator.style.backgroundColor = '#ff4e62';
        statusText.textContent = 'هم‌اکنون آفلاین هستیم - در ساعات کاری بازمی‌گردیم';
    }
}

// به‌روزرسانی وضعیت هر 30 ثانیه
setInterval(updateOnlineStatus, 30000);
updateOnlineStatus();

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