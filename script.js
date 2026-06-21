
const PASSWORD = "220606";

let enteredPassword = "";

const music = document.getElementById("bgMusic");

const pages = document.querySelectorAll(".page");

const passwordDisplay = document.getElementById("passwordDisplay");

function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

function addDigit(num) {

    if (enteredPassword.length >= 6) return;

    enteredPassword += num;

    passwordDisplay.innerHTML =
        "●".repeat(enteredPassword.length);
}

function clearPassword() {

    enteredPassword = "";

    passwordDisplay.innerHTML = "";
}

function checkPassword() {

    if (enteredPassword === PASSWORD) {

        music.play().catch(() => {});

        startBirthdayJourney();

    } else {

        passwordDisplay.innerHTML = "Wrong";

        setTimeout(() => {

            enteredPassword = "";

            passwordDisplay.innerHTML = "";

        }, 1200);
    }
}

function startBirthdayJourney() {

    showPage("page2");

    createDateFireworks();

    setTimeout(() => {

        showPage("page3");

    }, 5000);

    setTimeout(() => {

        showPage("page4");

    }, 10000);

    setTimeout(() => {

        showPage("page5");

    }, 15000);
}

document.addEventListener("DOMContentLoaded", () => {

    const letterBtn = document.getElementById("letterBtn");

    if (letterBtn) {

        letterBtn.addEventListener("click", () => {

            showPage("page6");

            setTimeout(() => {

                showPage("page7");

                startWishSequence();

            }, 30000);
        });
    }
});



function createDateFireworks() {

    const container =
        document.getElementById("fireworks-container");

    let interval = setInterval(() => {

        if (
            !document
                .getElementById("page2")
                .classList.contains("active")
        ) {

            clearInterval(interval);

            return;
        }

        createFirework();

    }, 250);

}

function createFirework() {

    const container =
        document.getElementById("fireworks-container");

    for (let i = 0; i < 18; i++) {

        const firework =
            document.createElement("div");

        firework.classList.add("firework");

        firework.style.left =
            Math.random() * window.innerWidth + "px";

        firework.style.top =
            Math.random() * window.innerHeight + "px";

        firework.style.animationDuration =
            (Math.random() * 1 + 0.8) + "s";

        container.appendChild(firework);

        setTimeout(() => {

            firework.remove();

        }, 1500);
    }
}

function startWishSequence() {

    const page7 =
        document.getElementById("page7");

    if (!page7) return;

    page7.style.background = "#e7b6bf";

    const wishText =
        document.getElementById("wishText");

    const countdown =
        document.getElementById("countdown");

    const burst =
        document.getElementById("birthdayBurst");

    const flames =
        document.querySelectorAll(".flame");

    setTimeout(() => {

        page7.style.background = "#000";

        wishText.style.opacity = "1";

        countdown.style.display = "block";

        let number = 3;

        countdown.innerText = number;

        const timer = setInterval(() => {

            number--;

            countdown.innerText = number;

            if (number <= 0) {

                clearInterval(timer);

                countdown.style.display = "none";

                wishText.style.opacity = "0";

                flames.forEach(flame => {

                     flame.style.animation = "blowWind 1s forwards";


                });

                burst.style.display = "block";

                animateBirthdayText();

                setTimeout(() => {

                    showPage("page8");

                    startFinalFireworks();

                }, 6000);
            }

        }, 1000);

    }, 4000);
}

function animateBirthdayText() {

    const burst =
        document.getElementById("birthdayBurst");

    let visible = true;

    let count = 0;

    const interval = setInterval(() => {

        burst.style.opacity =
            visible ? "1" : "0";

        visible = !visible;

        count++;

        if (count > 8) {

            clearInterval(interval);

            burst.style.opacity = "1";
        }

    }, 500);
}

function startFinalFireworks() {

    const interval = setInterval(() => {

        if (
            !document
                .getElementById("page8")
                .classList.contains("active")
        ) {

            clearInterval(interval);

            return;
        }

        createFirework();

    }, 300);

    setTimeout(() => {

        clearInterval(interval);

    }, 10000);
}

window.addEventListener("keydown", e => {

    if (!document
        .getElementById("page1")
        .classList.contains("active"))
        return;

    if (
        e.key >= "0" &&
        e.key <= "9"
    ) {

        addDigit(e.key);
    }

    if (
        e.key === "Enter"
    ) {

        checkPassword();
    }

    if (
        e.key === "Backspace"
    ) {

        enteredPassword =
            enteredPassword.slice(0, -1);

        passwordDisplay.innerHTML =
            "●".repeat(
                enteredPassword.length
            );
    }

});

window.onload = () => {

    showPage("page1");

};

