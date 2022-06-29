const char = document.getElementById("character");


function jump() {
    if (!char.classList.contains("jump-animation")) {
        console.log("test")
        char.classList.add("jump-animation");
    }
    setTimeout(() => {
        char.classList.remove("jump-animation");

    }, 1000)
}


let checkDead = setInterval(function () {
    let charTop = parseInt(window.getComputedStyle(char).top);
    let blockLeft = parseInt(window.getComputedStyle(block).left);
    console.log(blockLeft);

    if (blockLeft < 20 && blockLeft > 0 && charTop >= 130) {
        block.style.animation = "none";
        block.style.display = "none";

        alert("u Lose!");
    }

})