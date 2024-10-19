async function loading() {
  var tl = gsap.timeline();
  await tl
    .to(".frame1", {
      height: "100%",
      duration: 2,
      ease: Expo.easeInOut,
    })
    .to(".frame2", {
      height: "100%",
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut,
    })
    .from(".span-l", {
      y: 100,
      stagger: 0.1,
      duration: 1,
      delay: -3,
    })
    .from(".span-r", {
      y: 100,
      stagger: -0.1,
      duration: 1,
      delay: -3,
    })
    .to(".background", {
      opacity: 0,
      duration: 1,
      delay: -1,
    })
    .to(".frame1", {
      opacity: 0,
      duration: 1,
      delay: -0.5,
    })
    .to(".frame2", {
      duration: 1,
      opacity: 0,
      delay: -0.5,
      ease: "power1.out",
    });
  document.querySelector(".loading").style.display = "none";
}

//heading animation
function heroanimate() {
  var t2 = gsap.timeline();
  t2.to(".left-box", {
    opacity: 0,
  })
    .from(".box-img", {
      stagger: 0.1,
      opacity: 0,
      y: -40,
      delay: 3,
    })
    .from(".left-box", {
      opacity: 0,
      y: -40,
      delay: -0.5,
    })
    .from("#right-box-span span", {
      opacity: 0,
      duration: 1,
      stagger: 0.1,
    })
    .from(".navlink", {
      opacity: 0,
      delay: -0.5,
      y: -10,
    })
    .from(".navlogo", {
      opacity: 0,
      delay: -0.5,
      y: -10,
    });
}
function textbreak() {
  const headertext = document.querySelector("#right-box-span");
  const splitext = headertext.textContent.split(" ");
  var clutter = "";
  splitext.forEach(function (elem) {
    if (elem != "") {
      clutter += `<span class="space" >${elem}</span>`;
    }
  });
  headertext.innerHTML = clutter;
}

async function animateH1() {
  const headertext = document.querySelector(".text h1");
  const splitext = headertext.textContent.split("");
  var clutter = "";
  const leng = splitext.length / 2;
  await splitext.forEach(function (elem, idx) {
    if (idx < leng) {
      clutter += `<span class="span-l" >${elem}</span>`;
    } else {
      clutter += `<span class="span-r" >${elem}</span>`;
    }
  });
  headertext.innerHTML = clutter;
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      let params = {
        name: document.getElementById("name").value,
        message: document.getElementById("message").value,
        email: document.getElementById("email").value,
      };
      await emailjs
        .send("service_r515gfd", "template_hhoqn1q", params)
        .then(() => {
          showalert(
            "fa-thumbs-up",
            "green",
            `${params.name} ,Thanks for reaching out! We'll get back to you shortly. `
          );
        })
        .catch((error) => {
          showalert("fa-exclamation", "red", "unexpected error happen.");
        });

      document.querySelector(".alertdiv").style.display = "flex";
      gsap.from(".alertlogo i", {
        y: 50,
        duration: 2,
        rotate: "20deg",
      });
      const inputs = document.querySelectorAll("#form input");
      inputs.forEach((input) => {
        input.value = "";
      });
    });
});
async function closealert() {
  await gsap.to(".alertdiv", {
    opacity: 0,
    ease: "power1.out",
  });
  document.querySelector(".alertdiv").style.display = "none";
}
function showalert(params, col, msg) {
  document.querySelector(".alertlogo").style.backgroundColor = col;
  document.querySelector(".btnalert").style.backgroundColor = col;
  document.querySelector(
    ".alertlogo"
  ).innerHTML = `<i class="fa-solid ${params}"></i>`;
  document.querySelector(".alertBottom p").textContent = msg;
}

async function callfunction() {
  await animateH1();
  loading();

  // document.querySelector(".loading").style.display = "none";
  await textbreak();

  heroanimate();
}
callfunction();
