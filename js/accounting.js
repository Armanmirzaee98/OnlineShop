// مدیریت منوی حساب کاربری
const menuLinks = document.querySelectorAll('.account-menu a');
const tabPanes = document.querySelectorAll('.tab-pane');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const accountMenu = document.getElementById('accountMenu');

// فعال‌سازی تب‌ها
menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // حذف کلاس active از همه لینک‌ها
        menuLinks.forEach(l => l.classList.remove('active'));

        // اضافه کردن کلاس active به لینک کلیک شده
        this.classList.add('active');

        // مخفی کردن همه تب‌ها
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // نمایش تب انتخاب شده
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');

        // در موبایل، بستن منو بعد از کلیک
        if (window.innerWidth <= 992) {
            accountMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// مدیریت منوی موبایل
mobileMenuToggle.addEventListener('click', function () {
    accountMenu.classList.toggle('active');
    this.classList.toggle('active');
});

// مدیریت سبد خرید
const quantityBtns = document.querySelectorAll('.quantity-btn');
const removeItemBtns = document.querySelectorAll('.remove-item');
const cartCount = document.querySelector('.cart-count');

quantityBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const isMinus = this.classList.contains('minus-btn');
        const quantityValue = this.parentElement.querySelector('.quantity-value');
        let currentValue = parseInt(quantityValue.textContent);

        if (isMinus && currentValue > 1) {
            quantityValue.textContent = currentValue - 1;
            updateCartCount(-1);
        } else if (!isMinus) {
            quantityValue.textContent = currentValue + 1;
            updateCartCount(1);
        }

        updateCartTotal();
    });
});

removeItemBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const cartItem = this.closest('.cart-item');
        const quantityValue = cartItem.querySelector('.quantity-value');
        const quantity = parseInt(quantityValue.textContent);

        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(100px)';

        setTimeout(() => {
            cartItem.remove();
            updateCartCount(-quantity);
            updateCartTotal();
        }, 300);
    });
});

function updateCartCount(change) {
    let currentCount = parseInt(cartCount.textContent) || 0;
    cartCount.textContent = Math.max(0, currentCount + change);

    // به‌روزرسانی شمارنده در منو
    const menuCartCount = document.querySelector('.account-menu a[data-tab="cart"] .cart-count');
    if (menuCartCount) {
        menuCartCount.textContent = Math.max(0, currentCount + change);
    }
}

function updateCartTotal() {
    // این تابع می‌تواند برای محاسبه مجموع سبد خرید استفاده شود
    console.log('سبد خرید به‌روزرسانی شد');
}

// مدیریت علاقه‌مندی‌ها
const wishlistRemoveBtns = document.querySelectorAll('.wishlist-remove');
const wishlistCount = document.querySelector('.account-menu a[data-tab="wishlist"] span:last-child');

wishlistRemoveBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const wishlistItem = this.closest('.wishlist-item');
        wishlistItem.style.opacity = '0';
        wishlistItem.style.transform = 'scale(0.8)';

        setTimeout(() => {
            wishlistItem.remove();

            // کاهش شمارنده علاقه‌مندی‌ها
            let currentCount = parseInt(wishlistCount.textContent) || 0;
            wishlistCount.textContent = Math.max(0, currentCount - 1);
        }, 300);
    });
});

// مدیریت مودال‌ها
const changePasswordBtn = document.getElementById('changePasswordBtn');
const passwordModal = document.getElementById('passwordModal');
const closePasswordModal = document.getElementById('closePasswordModal');
const cancelPasswordChange = document.getElementById('cancelPasswordChange');

const addAddressBtn = document.getElementById('addAddressBtn');
const addNewAddressCard = document.getElementById('addNewAddressCard');
const addressModal = document.getElementById('addressModal');
const closeAddressModal = document.getElementById('closeAddressModal');
const cancelAddress = document.getElementById('cancelAddress');

// مودال تغییر رمز عبور
changePasswordBtn.addEventListener('click', () => {
    passwordModal.classList.add('active');
});

[closePasswordModal, cancelPasswordChange].forEach(btn => {
    btn.addEventListener('click', () => {
        passwordModal.classList.remove('active');
    });
});

// مودال افزودن آدرس
[addAddressBtn, addNewAddressCard].forEach(btn => {
    btn.addEventListener('click', () => {
        addressModal.classList.add('active');
    });
});

[closeAddressModal, cancelAddress].forEach(btn => {
    btn.addEventListener('click', () => {
        addressModal.classList.remove('active');
    });
});

// بستن مودال با کلیک خارج از آن
[passwordModal, addressModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// مدیریت سوئیچ‌ها
const switches = document.querySelectorAll('.switch input');
switches.forEach(switchInput => {
    switchInput.addEventListener('change', function () {
        const label = this.nextElementSibling;
        if (this.checked) {
            label.style.backgroundColor = 'var(--primary-color)';
        }
    });
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

// مدیریت آپلود عکس پروفایل
const editAvatarBtn = document.getElementById('editAvatarBtn');
editAvatarBtn.addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const avatar = document.querySelector('.user-avatar img');
                avatar.src = event.target.result;

                // نمایش پیام موفقیت
                const originalHTML = editAvatarBtn.innerHTML;
                editAvatarBtn.innerHTML = '<i class="fas fa-check"></i>';
                editAvatarBtn.style.backgroundColor = 'var(--success-color)';

                setTimeout(() => {
                    editAvatarBtn.innerHTML = originalHTML;
                    editAvatarBtn.style.backgroundColor = '';
                }, 2000);
            };
            reader.readAsDataURL(file);
        }
    };

    input.click();
});


//////////////////////////////////////

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
