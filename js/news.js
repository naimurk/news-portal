
const loadData = ()=> {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res=> res.json())
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

const loadAlertData = (name,id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayAlertData(data,name))
}

const  displayAlertData = (data, name)=> {
    //   console.log(name,data)
      document.getElementById('tab-count').innerText = data.data.length
      document.getElementById('tab-name').innerText = name
}