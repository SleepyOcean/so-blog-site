<template>
    <div class='full not-found-box'>
        <div class="mars"></div>
        <img src="../../assets/img/svg/404.svg" class="logo-404" />
        <img src="../../assets/img/svg/meteor.svg" class="meteor" />
        <p class="title word-cannot-selected">Ops!<br /></p>
		<p class="subtitle word-cannot-selected">
            页面未找到<br />要不换个页面试试
        </p>
        <div align="center" @click="backForward">
            <a class="btn-back" style="user-select: none; cursor: pointer;">返回上一页</a>
        </div>
        <img src="../../assets/img/svg/astronaut.svg" class="astronaut" />
        <img src="../../assets/img/svg/spaceship.svg" class="spaceship" />
    </div>
</template>

<script>
export default {
	name: 'NotFound',
	methods: {
		backForward () {
			// 返回上一层
			this.$router.go(-1);
		}
	}
};
</script>

<style lang="scss" scoped>
.not-found-box {
    background-image: url("../../assets/img/svg/star.svg"), linear-gradient(to bottom, #05007A, #4D007D);
    height: 100%;
    margin: 0;
    background-attachment: fixed;
    overflow: hidden;
    @import url("https://fonts.googleapis.com/css?family=Nunito:400,600,700");

    @keyframes floating {
        from {
            transform: translateY(0px);
        }

        65% {
            transform: translateY(15px);
        }

        to {
            transform: translateY(0px);
        }
    }

    .mars {
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        height: 27vmin;
        background: url("../../assets/img/svg/mars.svg") no-repeat bottom center;
        background-size: cover;
    }

    .logo-404 {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 16vmin;
        width: 30vmin;
    }

    @media (max-width: 480px) and (min-width: 320px) {
        .logo-404 {
            top: 45vmin;
        }
    }

    .meteor {
        position: absolute;
        right: 2vmin;
        top: 16vmin;
    }

    .title {
        color: white;
        font-family: "Nunito", sans-serif;
        font-weight: 600;
        text-align: center;
        font-size: 5vmin;
        margin-top: 31vmin;
    }

    @media (max-width: 480px) and (min-width: 320px) {
        .title {
            margin-top: 65vmin;
        }
    }

    .subtitle {
        color: white;
        font-family: "Nunito", sans-serif;
        font-weight: 400;
        text-align: center;
        font-size: 3.5vmin;
        margin-top: -1vmin;
        margin-bottom: 9vmin;
    }

    .btn-back {
        border: 1px solid white;
        color: white;
        height: 5vmin;
        padding: 12px;
        font-family: "Nunito", sans-serif;
        text-decoration: none;
        border-radius: 5px;
    }

    .btn-back:hover {
        background: white;
        color: #4D007D;
    }

    @media (max-width: 480px) and (min-width: 320px) {
        .btn-back {
            font-size: 3.5vmin;
        }
    }

    .astronaut {
        position: absolute;
        top: 18vmin;
        left: 10vmin;
        height: 30vmin;
        animation: floating 3s infinite ease-in-out;
    }

    @media (max-width: 480px) and (min-width: 320px) {
        .astronaut {
            top: 2vmin;
        }
    }

    .spaceship {
        position: absolute;
        bottom: 15vmin;
        right: 24vmin;
    }

    @media (max-width: 480px) and (min-width: 320px) {
        .spaceship {
            width: 45vmin;
            bottom: 18vmin;
        }
    }
}
</style>
