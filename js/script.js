const url = 'https://randomuser.me/api/?results=12';
const galleryList = document.getElementById('gallery');
const card = document.getElementsByClassName('card');
const body = document.querySelector('body');


fetch(url)
        .then(response => response.json())
        .then(data => {
            generateEmployee(data)
            console.log(data.results)
            selectedModal(data.results)
        })


    function generateEmployee(data){
     data.results.map( person => {
           galleryList.insertAdjacentHTML('beforeend',
                `<div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${person.picture.medium}" alt="profile picture">
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

    function displayModal(employee){
        body.insertAdjacentHTML('beforeend', 
        `<div class="modal-container">
            <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city} ${employee.location.state} ${employee.location.postcode} </p>
                <p class="modal-text"> Birthday: ${formatDate(employee.dob.date)}</p>
            </div>
        </div>`
        )
        const closeButton = document.getElementById('modal-close-btn');
        const modal = document.querySelector('.modal-container');

        closeButton.addEventListener('click', () => {
            modal.remove()
        });
    }

    function selectedModal(data){
        let employeeSelected = [...card];
        console.log(employeeSelected);

        for (let i = 0; i < data.length; i++) {
            employeeSelected[i].addEventListener('click',() => {
                let employee = data[i];
                console.log(employee);
                displayModal(employee);
            })
        }
    }

    //Format the employee birthday in DD/MM/YYYY format
    function formatDate(date){
        //rsplit out date and time
        const removeTime = date.split('T');

        //split out date, month and year
        const splitDate = removeTime[0].split('-');
        //return the birthdate in the DD/MM/YYYY format
        return splitDate[1] + '/' + splitDate[2] + '/'+ splitDate[0];
    }

    //TODO: format the employee phone number in (XXX) XXX-XXXX

