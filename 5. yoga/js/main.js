const headMenu = document.querySelector('.info-header'),
    headersItems = document.querySelectorAll('.info-header-tab'),
    slides = document.querySelectorAll('.info-tabcontent');




function show(n) {
    slides[n].classList.remove('hide');
}

function hide() {
    slides.forEach(e => e.classList.add('hide'))
}


hide()
show(0)

headMenu.addEventListener('click', e => {
    for (let i = 0; i < headersItems.length; i++) {
        if (e.target == headersItems[i]) {
            hide()
            show(i)
        }
    }
})



const timer = document.querySelector('#timer'),
    hours = document.querySelector('.hours'),
    minutes = document.querySelector('.minutes'),
    seconds = document.querySelector('.seconds');

function zeroing() {
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
}


zeroing()


const deadline = new Date('Jun 21, 2022 9:54:00');

function getTime() {
    let total = Date.parse(deadline) - Date.parse(new Date()),
        hourse = Math.floor(total / 1000 / 60 / 60 % 60),
        minutes = Math.floor(total / 1000 / 60 % 60),
        second = Math.floor(total / 1000 % 60);
    return {
        t: total,
        h: hourse,
        m: minutes,
        s: second
    }
}

let time = setInterval(setTimer, 1000)

function setTimer() {
    let t = getTime()
    if (t.t <= 0) {
        clearInterval(time)
        zeroing()
    } else {
        if (t.h < 10) t.h = `0${t.h}`
        if (t.m < 10) t.m = `0${t.m}`
        if (t.s < 10) t.s = `0${t.s}`
        hours.textContent = t.h;
        minutes.textContent = t.m;
        seconds.textContent = t.s;
    }
}


const slide = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dots = document.querySelectorAll('.dot'),
    dotMenu = document.querySelector('.slider-dots');

let numberOfSlide = 1;



function hideSlide() {
    slide.forEach((e, i) => {
        e.style.display = "none";
        dots[i].classList.remove('dot-active')
    })
}

function showSlide(n) {
    slide[n].style.display = "block";
    dots[n].classList.add('dot-active')
}



hideSlide()
showSlide(numberOfSlide)

prev.addEventListener('click', () => {
    if (numberOfSlide == 0) numberOfSlide = slide.length
    numberOfSlide--
    hideSlide()
    showSlide(numberOfSlide)
})

next.addEventListener('click', () => {
    if (numberOfSlide == slide.length - 1) numberOfSlide = -1
    numberOfSlide++
    hideSlide()
    showSlide(numberOfSlide)
})

dotMenu.addEventListener('click', e => {
    dots.forEach((elem, index) => {
        if (e.target == elem) {
            numberOfSlide = index
            hideSlide()
            showSlide(numberOfSlide)
        }
    })
})


const buttonModal = document.querySelector('.more'),
    modalWind = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

buttonModal.addEventListener('click', () => {
    modalWind.style.display = "block";
    document.body.style.overflow = "hidden";
})


close.addEventListener('click', () => {
    modalWind.style.display = "";
    document.body.style.overflow = "";
})


const form = document.querySelector('.main-form'),
    input = document.querySelectorAll('input'),
    statusMessage = document.createElement('div');



statusMessage.classList.add('status');

form.addEventListener('submit', e => {
    e.preventDefault()

    form.appendChild(statusMessage)

    let request = new XMLHttpRequest();

    request.open('POST', 'server.php');

    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    let formData = new FormData(form)

    request.send(formData)

    request.addEventListener('readystatechange', () => {
        if (request.readyState < 4) {
            statusMessage.textContent = "Loading..."
        } else if (request.readyState == 4 && request.status == 200) {
            statusMessage.textContent = "Done"
            input.forEach(e => e.value = '')
            input[4].setAttribute('placeholder', 'Мы с вами свяжемся...')
        } else statusMessage.textContent = "Error :("
    })
})


let quantity = document.querySelectorAll('.counter-block-input'),
    total = document.querySelector('#total'),
    select = document.querySelector('#select'),
    totalValue = 0;

function totalNull() {
    total.textContent = "0";
}
totalNull()

function baze() {
    if (this.value === '' || quantity[0].value === '') {
        totalNull()
    } else {
        total.textContent = totalValue
        total.textContent = +total.textContent * this.options[this.selectedIndex].value;
    }
}

quantity[0].addEventListener('input', function () {
    console.log(quantity[0].value)
    if (this.value === '' || quantity[1].value === '') {
        totalNull()
    } else {
        total.textContent = +this.value + +quantity[1].value;
        totalValue = total.textContent;
        baze.call(select)
    }
})
quantity[1].addEventListener('input', function () {
    if (this.value === '' || quantity[0].value === '') {
        totalNull()
    } else {
        total.textContent = +this.value + +quantity[0].value;
        totalValue = total.textContent;
        baze.call(select)
    }
})

select.addEventListener('change', function () {
    baze.call(select)
})



const formFooter = document.querySelector('#form');

formFooter.addEventListener('submit', e => {
    e.preventDefault();

    statusMessage.classList.add('footerFormText');

    formFooter.appendChild(statusMessage)

    const xml = new XMLHttpRequest();

    xml.open('POST', 'server.php')


    let data = new FormData(formFooter)

    xml.send(data)


    xml.addEventListener('readystatechange', function () {
        if (this.readyState < 4) {
            statusMessage.textContent = 'Loading...'
        } else if (this.readyState === 4) {
            statusMessage.textContent = 'Done'
            input.forEach(e => {
                e.value = ''
            })
        } else statusMessage.textContent = 'error'
    })
})

