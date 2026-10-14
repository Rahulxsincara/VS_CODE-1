const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");

const counter = document.getElementById("lightboxCounter");

let currentIndex = 0;


// Images को array में रखना
const images = [];

galleryItems.forEach((item) => {

    const img = item.querySelector("img");

    images.push(img.src);

});

console.log(images);



// Image पर click
galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentIndex = index;

        lightboxImage.src = images[currentIndex];

        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;

        lightbox.classList.add("active");

    });

});


// Close
closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


// Previous
prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    lightboxImage.src = images[currentIndex];

    counter.textContent =
        `${currentIndex + 1} / ${images.length}`;

});


// Next
nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    lightboxImage.src = images[currentIndex];

    counter.textContent =
        `${currentIndex + 1} / ${images.length}`;

});


// Background पर click → Close
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }

});