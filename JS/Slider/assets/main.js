
let currentActiveIndex = 0;

let interval = null;

const render =() => {
    const imgElements = document.querySelectorAll('.img');

    imgElements.forEach((element,index) => {
        if (index === currentActiveIndex){
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    })
}

render();

const prevButtonElement = document.querySelector('.btn-prev');
const nextButtonElement = document.querySelector('.btn-next');

prevButtonElement.onclick = () => {
    currentActiveIndex = currentActiveIndex === 0 ? 2 : currentActiveIndex + 1;
    render();
}

nextButtonElement.onclick = () => {
    currentActiveIndex = currentActiveIndex === 2 ? 0 : currentActiveIndex + 1;
    render();
}

const paginationItems = document.querySelectorAll('.btn-pagination');

paginationItems.forEach((item,index) => {
    item.onclick =() => {
        currentActiveIndex = index;
        render();
    }
})


setInterval(()=>{
    currentActiveIndex = currentActiveIndex === 2 ? 0 : currentActiveIndex + 1;
    render();
}, 3000)



