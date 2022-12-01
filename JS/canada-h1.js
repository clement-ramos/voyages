const animateText = document.querySelector('.animateH1');

// console.log(new Typewriter(animateText));

new Typewriter(animateText, {
    deleteSpeed: 20
})
.changeDelay(100)
.typeString('Welcome,')
.typeString('<br>to CANADA ')

.pauseFor(600)
.typeString('TADAAAA')

.pauseFor(600)
.deleteChars(8)
.pauseFor(400)
.typeString('AAAAAAAA')
.pauseFor(600)
.deleteChars(8)
.start()