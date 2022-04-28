const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photoArray = [];
// Unsplash API
const count = 10;
const apiKey = "MKw7bDmwmboblrqLe50EobZSMwbpwVGYFNgwDcA75xo";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// check if all images were loaded
function imageLoaded() {
  // ready = true;

  imagesLoaded++;
  console.log("imageloaged: ", imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    // loader.hidden = true;
    console.log("ready = ", ready);
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  // image길이 확인후 새로생성할지말지 정함
  totalImages = photoArray.length;
  console.log("total images: ", totalImages);

  // Run function for each object in photoArray
  photoArray.forEach((photo) => {
    //   Create <a></a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_black");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listenr,check when each is finished loading -> 이게없으면 제대로 스크롤안됐음에도 새로운 이미지들이 생성됨
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a></a> , then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
    // console.log(imageContainer);
  });
}

// Get photos from Unsplash Api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    // console.log("response: ", response);
    photoArray = await response.json();
    // console.log("photos: ", photoArray);
    displayPhotos();
  } catch {
    //   Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log("window.innerHeight: ", window.innerHeight());
    // console.log("window.scrollY: ", window.scrollY);
    // console.log(
    //   "window.innerHeight + scrollY: ",
    //   window.scollY + window.innerHeight
    // );
    // console.log(
    //   "document.body.offsetHeight - 1000: ",
    //   document.body.offsetHeight - 1000
    // );
    // console.log("more");
  }
});

// On Load
getPhotos();
