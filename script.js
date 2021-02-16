//Typewrite Effect on Header

//create typewriter function
const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//type method
TypeWriter.prototype.type = function() {
    //current index of word
    const current = this.wordIndex % this.words.length;
    //get current word
    const fullTxt = this.words[current];

    //check if txt is deleting
    if(this.isDeleting) {
        //remove a character
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        //add a character
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //initial type speed
    let typeSpeed = 200;
    if(this.isDeleting) {
        //typeSpeed = typeSpeed / 2
        typeSpeed /= 2;
    }

    //if word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        //pause at end of fullTxt
        typeSpeed = this.wait;
        //set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        //move to next word
        this.wordIndex++;
        //pause before next word starts typing
        typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
}

//init on DOM load
document.addEventListener('DOMContentLoaded', init);
//init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //init Typewriter
    new TypeWriter(txtElement, words, wait);
}

//hamburger menu

function toggleClass() {
    const menu = document.querySelector('.navBarLinks');
    menu.classList.toggle('toggleCls');
}

const hamburgerMenu = document.querySelector('.hamburgerMenuIcon');

hamburgerMenu.addEventListener('click', toggleClass);

//animations
AOS.init();

// default settings
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});