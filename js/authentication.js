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

// سوئیچ بین فرم‌ها
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authRight = document.querySelector('.auth-right');

loginBtn.addEventListener('click', () => switchToLogin());
registerBtn.addEventListener('click', () => switchToRegister());

function switchToLogin() {
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    // اسکرول به بالای فرم
    authRight.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchToRegister() {
    registerBtn.classList.add('active');
    loginBtn.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    // اسکرول به بالای فرم
    authRight.scrollTo({ top: 0, behavior: 'smooth' });
}

// نمایش/مخفی کردن رمز عبور
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.parentElement.querySelector('.password-toggle i');

    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// تیک مرا به خاطر بسپار
function toggleRemember() {
    const checkbox = document.getElementById('rememberCheckbox');
    checkbox.classList.toggle('checked');
}

// فرم ورود
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // اعتبارسنجی ساده
    if (!email || !password) {
        showError('لطفاً تمام فیلدهای ضروری را پر کنید.');
        return;
    }

    // شبیه‌سازی ورود موفق
    simulateLogin();
});

// فرم ثبت نام
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // اعتبارسنجی
    if (!name || !email || !phone || !password || !confirmPassword) {
        showError('لطفاً تمام فیلدهای ضروری را پر کنید.');
        return;
    }

    if (password.length < 8) {
        showError('رمز عبور باید حداقل ۸ کاراکتر باشد.');
        return;
    }

    if (password !== confirmPassword) {
        showError('رمز عبور و تکرار آن مطابقت ندارند.');
        return;
    }

    if (!agreeTerms) {
        showError('لطفاً با شرایط و قوانین موافقت کنید.');
        return;
    }

    // اعتبارسنجی ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('لطفاً یک ایمیل معتبر وارد کنید.');
        return;
    }

    // اعتبارسنجی شماره موبایل
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        showError('لطفاً شماره موبایل معتبر وارد کنید (مانند ۰۹۱۲۳۴۵۶۷۸۹).');
        return;
    }

    // شبیه‌سازی ثبت نام موفق
    simulateRegistration(name, email);
});

// شبیه‌سازی ورود
function simulateLogin() {
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // نمایش انیمیشن بارگذاری
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ورود...';
    submitBtn.disabled = true;

    // شبیه‌سازی تاخیر سرور
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ورود موفق!';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

        // نمایش پیام موفقیت
        showModal('ورود موفقیت‌آمیز!', 'شما با موفقیت وارد حساب کاربری خود شدید.');

        // بازنشانی فرم پس از ۲ ثانیه
        setTimeout(() => {
            loginForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            closeModal();

            // در حالت واقعی، کاربر به صفحه حساب هدایت می‌شود
            // window.location.href = 'account.html';
        }, 2000);
    }, 1500);
}

// شبیه‌سازی ثبت نام
function simulateRegistration(name, email) {
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // نمایش انیمیشن بارگذاری
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ایجاد حساب...';
    submitBtn.disabled = true;

    // شبیه‌سازی تاخیر سرور
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> حساب ایجاد شد!';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

        // نمایش پیام موفقیت
        showModal('ثبت نام موفقیت‌آمیز!', `عزیز ${name}، حساب کاربری شما با موفقیت ایجاد شد. لینک فعال‌سازی به ایمیل ${email} ارسال شد.`);

        // بازنشانی فرم پس از ۳ ثانیه
        setTimeout(() => {
            registerForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;

            // سوئیچ به فرم ورود
            setTimeout(() => {
                switchToLogin();
                closeModal();
            }, 1000);
        }, 3000);
    }, 2000);
}

// نمایش خطا
function showError(message) {
    // ایجاد عنصر خطا
    let errorElement = document.querySelector('.auth-error');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'auth-error';
        errorElement.style.cssText = `
                    background: linear-gradient(135deg, #ff4e62, #ff2e4a);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    text-align: center;
                    box-shadow: 0 5px 15px rgba(255, 78, 98, 0.3);
                    animation: shake 0.5s ease-in-out;
                `;

        const activeForm = document.querySelector('.auth-form.active');
        activeForm.insertBefore(errorElement, activeForm.firstChild);
    }

    errorElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <i class="fas fa-exclamation-circle"></i>
                    <span>${message}</span>
                </div>
            `;

    // حذف خودکار پیام خطا پس از ۵ ثانیه
    setTimeout(() => {
        if (errorElement) {
            errorElement.style.opacity = '0';
            errorElement.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (errorElement && errorElement.parentElement) {
                    errorElement.parentElement.removeChild(errorElement);
                }
            }, 300);
        }
    }, 5000);
}

// نمایش مدال
function showModal(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('successModal').classList.add('active');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}

// ورود با شبکه‌های اجتماعی
function socialLogin(platform) {
    let platformName = '';
    let platformColor = '';

    switch (platform) {
        case 'google':
            platformName = 'گوگل';
            platformColor = '#DB4437';
            break;
        case 'facebook':
            platformName = 'فیسبوک';
            platformColor = '#4267B2';
            break;
        case 'twitter':
            platformName = 'توییتر';
            platformColor = '#1DA1F2';
            break;
    }

    const socialBtn = document.querySelector(`.social-btn.${platform}`);
    const originalColor = socialBtn.style.color;
    const originalBorder = socialBtn.style.borderColor;

    // انیمیشن کلیک
    socialBtn.style.transform = 'scale(0.9)';
    socialBtn.style.borderColor = platformColor;
    socialBtn.style.color = platformColor;

    setTimeout(() => {
        socialBtn.style.transform = '';
        socialBtn.style.borderColor = originalBorder;
        socialBtn.style.color = originalColor;
    }, 200);

    // نمایش پیام
    showModal(`ورود با ${platformName}`, `در حال اتصال به حساب ${platformName} شما... در حالت واقعی، این بخش به صفحه احراز هویت ${platformName} هدایت می‌شود.`);

    // بستن مدال پس از ۳ ثانیه
    setTimeout(() => {
        closeModal();
    }, 3000);
}

// فراموشی رمز عبور
function showForgotPassword() {
    showModal('بازیابی رمز عبور', 'لطفاً ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود.');

    // ایجاد فرم فراموشی رمز عبور در مدال
    setTimeout(() => {
        const modalContent = document.querySelector('.modal p');
        modalContent.innerHTML = `
                    <div style="margin-top: 20px;">
                        <input type="email" id="recoveryEmail" placeholder="ایمیل خود را وارد کنید" 
                               style="width: 100%; padding: 12px 15px; border: 2px solid #eee; border-radius: 8px; margin-bottom: 15px;">
                        <button class="btn" onclick="sendRecoveryEmail()" style="width: 100%;">
                            <i class="fas fa-paper-plane"></i> ارسال لینک بازیابی
                        </button>
                    </div>
                `;
    }, 100);
}

function sendRecoveryEmail() {
    const emailInput = document.getElementById('recoveryEmail');
    const email = emailInput.value;

    if (!email) {
        alert('لطفاً ایمیل خود را وارد کنید.');
        return;
    }

    // شبیه‌سازی ارسال ایمیل
    const sendBtn = document.querySelector('.modal .btn');
    const originalText = sendBtn.innerHTML;

    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
    sendBtn.disabled = true;

    setTimeout(() => {
        sendBtn.innerHTML = '<i class="fas fa-check"></i> ارسال شد!';
        sendBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

        setTimeout(() => {
            closeModal();
            showModal('ایمیل ارسال شد', `لینک بازیابی رمز عبور به ایمیل ${email} ارسال شد. لطفاً صندوق ایمیل خود را بررسی کنید.`);
        }, 1000);
    }, 1500);
}

// اعتبارسنجی لحظه‌ای
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', function () {
        validateField(this);
    });

    input.addEventListener('input', function () {
        // حذف خطا هنگام شروع تایپ
        const errorElement = this.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        this.style.borderColor = '#eee';
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'این فیلد اجباری است.';
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'لطفاً ایمیل معتبر وارد کنید.';
        }
    }

    if (field.id === 'registerPassword' && value.length > 0 && value.length < 8) {
        isValid = false;
        errorMessage = 'رمز عبور باید حداقل ۸ کاراکتر باشد.';
    }

    if (field.id === 'registerPhone' && value) {
        const phoneRegex = /^09[0-9]{9}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'شماره موبایل معتبر نیست (مانند ۰۹۱۲۳۴۵۶۷۸۹).';
        }
    }

    if (!isValid) {
        field.style.borderColor = '#ff4e62';

        // نمایش خطا
        let errorElement = field.parentElement.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = 'color: #ff4e62; font-size: 13px; margin-top: 5px;';
            field.parentElement.appendChild(errorElement);
        }

        errorElement.textContent = errorMessage;
    } else {
        field.style.borderColor = '#28a745';

        // حذف خطا
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    return isValid;
}

// انیمیشن ورود هنگام لود صفحه
window.addEventListener('load', function () {
    const authContainer = document.querySelector('.auth-container');
    authContainer.style.opacity = '0';
    authContainer.style.transform = 'translateY(30px)';

    setTimeout(() => {
        authContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        authContainer.style.opacity = '1';
        authContainer.style.transform = 'translateY(0)';
    }, 300);
});