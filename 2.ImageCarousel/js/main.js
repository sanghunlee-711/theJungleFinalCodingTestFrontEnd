const carouselUl = document.querySelector(".carousel__list");
let items = document.querySelectorAll(".carousel__item");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

function moveNext(){
    items = document.querySelectorAll(".carousel__item");
    let currentItem = document.querySelector(".now");
    let next = currentItem.nextElementSibling;

    carouselUl.appendChild(currentItem);
    currentItem.classList.remove('now');
    next.classList.add('now');

    changeTransform();
}

function movePrev(){
    items = document.querySelectorAll(".carousel__item");
    let currentItem = document.querySelector(".now");
    let lastItem = items[items.length - 1];
    let prev;

    for(let i = 0; i < items.length; i++){
        if(items[i].classList.contains("now")){
            prev = items[i-1];
        }
    }

    if(currentItem){
        if(prev){
            carouselUl.prepend(prev);
            currentItem.classList.remove("now");
            prev.classList.add('now');
        } else {
            carouselUl.prepend(lastItem);
            currentItem.classList.remove("now");
            lastItem.classList.add('now');
        }
    } else {
        lastItem.classList.add('now');
    }

    changeTransform();
}

nextButton.addEventListener("click", moveNext);
prevButton.addEventListener("click", movePrev);

function changeTransform(){
    items = document.querySelectorAll(".carousel__item");

    items.forEach((e, i) => {
        let degree = 360/items.length;
        if(items.length > 1) {
            if(i == 0) {
                e.style.transform = "rotateY(0deg) translateZ(250px)";
            } else {
                e.style.transform = `rotateY(${degree*i}deg) translateZ(250px) rotateY(-${degree*i}deg)`;
            }
        }
        if(items.length >= 5) {
            if(i == 0) {
                e.style.transform = "rotateY(0deg) translateZ(250px)";
            } else if(i == 2) {
                e.style.transform = `rotateY(${degree*i}deg) translateZ(250px) rotateY(-${degree*i}deg) translateX(${2000/items.length}px)`;
            } else if(i == items.length-2) {
                e.style.transform = `rotateY(${degree*i}deg) translateZ(250px) rotateY(-${degree*i}deg) translateX(-${2000/items.length}px)`;
            } else {
                e.style.transform = `rotateY(${degree*i}deg) translateZ(250px) rotateY(-${degree*i}deg)`;
            }
        }
    });
}

// 이미지 로드 후 삽입
function createTag(url) {
    let list = document.createElement("li");
    let img = document.createElement("img");
    list.setAttribute("class", "carousel__item");
    img.src = url;
    list.appendChild(img);
    items = document.querySelectorAll(".carousel__item");

    if(items.length < 1) {
        list.classList.add("now");
    }

    return list;
}

function uploadImg(value) {
    if(value.files && value.files[0]) {
        let reader = new FileReader();

        reader.onload = e => {
            let imgUrl = e.target.result;
            carouselUl.appendChild(createTag(imgUrl));
            changeTransform();
        };
        reader.readAsDataURL(value.files[0]);
    }
}

const imageInput = document.querySelector("#image-upload__input");

imageInput.addEventListener("change", e => {
    let fileValue = imageInput.value;
    uploadImg(e.target);
});