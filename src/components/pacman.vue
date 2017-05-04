<template>
    <div class="loader-inner pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>
<script>
export default {
    name: "pacman",
}
</script>
<style lang="scss">
@-webkit-keyframes rotate_pacman_half_up {
    0% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
    }
    50% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
    100% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
    }
}

@keyframes rotate_pacman_half_up {
    0% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
    }
    50% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
    100% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
    }
}

@-webkit-keyframes rotate_pacman_half_down {
    0% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    50% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
}

@keyframes rotate_pacman_half_down {
    0% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    50% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
}

@-webkit-keyframes pacman-balls {
    75% {
        opacity: 0.7;
    }
    100% {
        -webkit-transform: translate(-100px, -5.25px);
        transform: translate(-100px, -5.25px);
    }
}

@keyframes pacman-balls {
    75% {
        opacity: 0.7;
    }
    100% {
        -webkit-transform: translate(-100px, -5.25px);
        transform: translate(-100px, -5.25px);
    }
}

.pacman {
    left: 50%;
    margin: 25% auto .5rem;
    position: relative;
}

.pacman>div:nth-child(2) {
    -webkit-animation: pacman-balls 1s -0.99s infinite linear;
    animation: pacman-balls 1s -0.99s infinite linear;
}

.pacman>div:nth-child(3) {
    -webkit-animation: pacman-balls 1s -0.66s infinite linear;
    animation: pacman-balls 1s -0.66s infinite linear;
}

.pacman>div:nth-child(4) {
    -webkit-animation: pacman-balls 1s -0.33s infinite linear;
    animation: pacman-balls 1s -0.33s infinite linear;
}

.pacman>div:nth-child(5) {
    -webkit-animation: pacman-balls 1s 0s infinite linear;
    animation: pacman-balls 1s 0s infinite linear;
}

.pacman>div:first-of-type {
    width: 0px;
    height: 0px;
    border-right: 15px solid transparent;
    border-top: 15px solid rgba(194, 233, 251, 1);
    border-left: 15px solid rgba(194, 233, 251, 1);
    border-bottom: 15px solid rgba(194, 233, 251, 1);
    border-radius: 15px;
    -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
    animation: rotate_pacman_half_up 0.5s 0s infinite;
    position: relative;
    left: -30px;
}

.pacman>div:nth-child(2) {
    width: 0px;
    height: 0px;
    border-right: 15px solid transparent;
    border-top: 15px solid rgba(194, 233, 251, 1);
    border-left: 15px solid rgba(194, 233, 251, 1);
    border-bottom: 15px solid rgba(194, 233, 251, 1);
    border-radius: 15px;
    -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
    animation: rotate_pacman_half_down 0.5s 0s infinite;
    margin-top: -30px;
    position: relative;
    left: -30px;
}

.pacman>div:nth-child(3),
.pacman>div:nth-child(4),
.pacman>div:nth-child(5),
.pacman>div:nth-child(6) {
    background-color: rgba(194, 233, 251, 1);
    border-radius: 100%;
    width: 5px;
    height: 5px;
    position: absolute;
    -webkit-transform: translate(0, -5.25px);
    transform: translate(0, -5.25px);
    top: 18px;
    left: 70px;
}
</style>