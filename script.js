document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded successfully!"); // კონსოლში გამოვიტანოთ შეტყობინება, რომ საიტი ჩაიტვირთა სწორად

    // ბურგერის მენიუს ელემენტების არჩევა
    const menuToggle = document.querySelector(".menu-toggle");
    const navBar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    // ბურგერის მენიუს ელემენტების არჩევა
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navBar.classList.toggle("active"); // მენიუს გამოჩენა ან დამალვა
            document.body.classList.toggle("menu-open"); // გვერდის ფონზე ეფექტის დამატება
        });
    }

    // საკონტაქტო ფორმის ელემენტების არჩევა
    const contactForm = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const messageInput = document.getElementById("message");

    // შეცდომის შეტყობინებების ადგილების არჩევა
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const messageError = document.getElementById("messageError");
    const formMessage = document.getElementById("formMessage");

    // ელექტრონული ფოსტის ვალიდაციის რეგულარული გამოსახულება
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // პაროლის ჩვენება/დამალვის ფუნქცია
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text"; // თუ პაროლი დამალულია, ვაჩვენოთ
                togglePassword.textContent = "🙈"; // შეცვლა ღილაკის ემოჯიზე
            } else {
                passwordInput.type = "password"; // თუ პაროლი ჩანს, დავმალოთ
                togglePassword.textContent = "👁️";
            }
        });
    }

    // საკონტაქტო ფორმის ვალიდაცია და გაგზავნა
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // ფორმის გადაგზავნის თავიდან არიდება (default ქმედება)
            let isValid = true;

            // Email-ის ვალიდაცია
            if (!emailPattern.test(emailInput.value)) {
                emailError.textContent = "⚠️ Please enter a valid email.";
                isValid = false;
            } else {
                emailError.textContent = "";
            }

            // პაროლის სიგრძის ვალიდაცია
            if (passwordInput.value.length < 6) {
                passwordError.textContent = "⚠️ Password must be at least 6 characters.";
                isValid = false;
            } else {
                passwordError.textContent = "";
            }

            // შეტყობინების ველის ვალიდაცია
            if (messageInput.value.length < 10) {
                messageError.textContent = "⚠️ Message must be at least 10 characters.";
                isValid = false;
            } else {
                messageError.textContent = "";
            }

            // თუ ყველა ველი სწორადაა შევსებული, შეტყობინება წარმატებით იგზავნება
            if (isValid) {
                formMessage.textContent = "✅ Message sent successfully!";
                formMessage.style.color = "green";

                // ფორმის გასუფთავება 2 წამში
                setTimeout(() => {
                    contactForm.reset();
                    formMessage.textContent = "";
                }, 2000);
            }
        });
    }

    // მონაცემების სერვერიდან წამოღება async/await მეთოდით
    async function fetchServerData() {
        try {
            let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
            let data = await response.json();
            console.log("Fetched Data:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchServerData(); // ფუნქციის გამოძახება მონაცემების ასინქრონულად მისაღებად
    
    // ქუქი-ნოტიფიკაციის მართვა
    const cookieNotice = document.getElementById("cookieNotice");
    const acceptCookies = document.getElementById("acceptCookies");

    // თუ მომხმარებელმა უკვე დააჭირა "Accept" ღილაკს, ქუქი-შეტყობინება უნდა გაქრეს
    if (localStorage.getItem("cookiesAccepted")) {
        cookieNotice.style.display = "none";
    }

    // ქუქი-შეტყობინების დამალვა და მონაცემების შენახვა LocalStorage-ში
    if (acceptCookies) {
        acceptCookies.addEventListener("click", function () {
            localStorage.setItem("cookiesAccepted", "true");
            cookieNotice.style.display = "none";
        });
    }

    // გვერდის დაბრუნების ღილაკის ფუნქცია (scroll to top)
    const scrollToTopBtn = document.getElementById("scrollToTop");

    if (scrollToTopBtn) {
        // თუ მომხმარებელი ქვემოთ ჩამოსრიალდება, ღილაკი გამოჩნდება
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        // ღილაკის დაჭერისას გვერდი გადაიყვანება ზედა ნაწილში
        scrollToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // ნელი გადასვლა
            });
        });
    }
});
