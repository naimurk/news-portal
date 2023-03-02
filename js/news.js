
const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoadData(data.data.news_category))
}

const displayLoadData = (data) => {
    // console.log(data)
    const TabContainer = document.getElementById('tab-container')
    data.forEach(element => {
        // console.log(element)
        const pTag = document.createElement('p')
        pTag.innerHTML = `
        <a href="#" onclick= "loadAlertData('${element.category_name}','${element.category_id}')"  class = "text-sm btn ">${element.category_name}</a>
        `;
        TabContainer.appendChild(pTag)
    });
}

const loadAlertData = (name, id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayAlertData(data, name))
}

const displayAlertData = (data, name) => {
    //   console.log(name,data)
    document.getElementById('tab-count').innerText = data.data.length
    document.getElementById('tab-name').innerText = name
    const newsContainer = document.getElementById('news-card-container')
    newsContainer.innerHTML = '';
    data.data.forEach(element => {
        // console.log(element)
        const { title, _id, details,author,image_url,total_view} = element
         
        const div = document.createElement('div')
        div.classList.add('my-12')
        div.innerHTML = `
        <div class="w-full flex p-8 bg-base-100 flex shadow-2xl">

        <figure class="m-5 "><img class="w-[600px] h-full rounded-md" src="${image_url}"
                alt="Shoes" /></figure>
        <div class=" m-5 flex flex-col justify-between">
            <div>
                <h1 class="card-title text-3xl">${title}</h1>
                <p class= "mt-3">${details.slice(0,400)}...</p>
            </div>
            <div class="mt-8">
                <p>${details.slice(6,700)}</p>
                <div class="mt-5 flex items-center justify-between">

                    <div class="flex">
                        <img class = "w-10 rounded-full" src="${author.img}" alt="">
                        <div class="ml-3">
                            <p>${author.name}</p>
                            <p>${author.published_date}</p>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <i class="fa-regular fa-eye"></i>
                        <p>${total_view ? total_view : 'no views'}K</p>
                    </div>
                    <div class="flex items-center">
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div>
                        
                        <button onclick = "modalData('${_id}')" class = "btn"><i  class=" fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>

    </div>
        `;
    newsContainer.appendChild(div)

    });
};

const modalData = (id) => {

    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(data=>displayModalData(data.data[0]))
}

const displayModalData = (data) => {
    document.getElementById('modal').classList.toggle('hidden')
    const {title, _id, details,author,image_url,total_view} = data
    document.getElementById("modal-container").innerHTML= `
    <div class="w-full  p-8 bg-base-100 flex flex-col shadow-2xl">

    <figure class="m-5 "><img class="w-[600px] h-full rounded-md" src="${image_url}"
            alt="Shoes" /></figure>
    <div class=" m-5 flex flex-col justify-between">
        <div>
            <h1 class="card-title text-3xl">${title}</h1>
            <p class= "mt-3">${details}</p>
        </div>
        <div class="mt-8">
            <p>${details.slice(6,700)}</p>
            <div class="mt-5 flex items-center justify-between">

                <div class="flex">
                    <img class = "w-10 rounded-full" src="${author.img}" alt="">
                    <div class="ml-3">
                        <p>${author.name}</p>
                        <p>${author.published_date}</p>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <i class="fa-regular fa-eye"></i>
                    <p>${total_view ? total_view : 'no views'}K</p>
                </div>
                <div class="flex items-center">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div>
                    
                    <button onclick = "modalData('${_id}')" class = "btn"><i  class=" fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    </div>

</div>
    `

}