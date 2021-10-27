const count = 10;
const apiKey = ''
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let images = [];
let ready = false;
let imageCount = 0;
let totalImagesCount = 0
const fetchImages = async () => {
    loader.hidden = false;
    try{
        const response = await fetch('images.json');
        images = await response.json();
        renderView();
    } catch(error) {
        console.log(error);
    }
}
const imageLoaded = () => {
    imageCount++;
    if(imageCount === totalImagesCount) {
        ready = true;
        loader.hidden = true;
    }
}
const setAttributeOnTag = (tag, properties) => {
    for(let key in properties) {
        tag.setAttribute(key, properties[key])
    }
}
const renderView = () => {
    totalImagesCount = images.length;
    images.forEach((imgEle) => {
        const link = document.createElement('a');
        setAttributeOnTag(link, {
            href: imgEle.url,
            target: '_blank',
            id: imgEle.id,
        })
        const img = document.createElement('img');
        setAttributeOnTag(img, {
            src: imgEle.url,
            alt: imgEle.alt,
            title: imgEle.title
        })
        link.appendChild(img);
        img.addEventListener('load', imageLoaded);
        imageContainer.appendChild(link);
    });
}
//scroll near the bottom

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        imageCount = 0;
        fetchImages();
    }
});

fetchImages();