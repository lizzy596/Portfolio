const menuButton = document.getElementById('menu');
const sideBar = document.getElementById('sidebar');
const closeButton = document.getElementById('close-btn');



function showMenu() {
  menuButton.style.display = "none"
  sideBar.style.right = "0";
}

function hideMenu() {
  sideBar.style.right = "-300px";
  menuButton.style.display = "block";
}


const TypeWriter = function(txtElement, words, wait=3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
  this.count = 0;
}

TypeWriter.prototype.type = function() {
  const currentIndex = this.wordIndex % this.words.length;
  const fullText = this.words[currentIndex];
 
  if(this.isDeleting) {
    this.txt = fullText.substring(0, this.txt.length - 1);

  } else {
    this.txt = fullText.substring(0, this.txt.length + 1);
  }
  
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

  //inital typespeed
  let typeSpeed = 100;

  if(this.isDeleting) {
    typeSpeed /= 2;
  }


  if(!this.isDeleting && this.txt === fullText && this.count === 2) {
    this.txtElement.classList.remove('txt-type')
    return;
  }

  else if(!this.isDeleting && this.txt === fullText) {
    typeSpeed = this.wait;
    this.isDeleting = true;
    this.count++;

  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;

  }
  
  
  
  setTimeout(() => this.type(), typeSpeed);


  
}




document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  new TypeWriter(txtElement, words, wait)
}