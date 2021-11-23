const url = 'https://randomuser.me/api/?results=12';
const galleryList = document.querySelector('#gallery');

fetch(url)
        .then(response => response.json())
        .then(data => {
            generateEmployee(data)
        })


    function generateEmployee(data){
     data.results.map( person => {
           galleryList.insertAdjacentHTML('beforeend',
                `<div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${person.picture.thumbnail}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                    </div>
                </div>`
            )
        })             
    }