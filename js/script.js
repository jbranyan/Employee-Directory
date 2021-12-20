/* Treehouse FSJS Techdegree
 * Project 5 - Random User Generator
 * Script.js
 * Displays 12 random employees on the page with their information.
 * When an employee is selected, a pop-up modal displays with additional information.
 * */

    //API url that retrieves 12 results with only necessary fields for US, AU and NZ (due to phone number formatting)
    const url = 'https://randomuser.me/api/?results=12&inc=name,email,location,dob,picture,cell&nat=us,au,nz';
    const galleryList = document.getElementById('gallery');
    const card = document.getElementsByClassName('card');
    const body = document.querySelector('body');
    const searchContainer = document.querySelector('.search-container');
    const headerContainer = document.querySelector('.header-text-container');
    const companyEmployees = [];

    //SeearchBox display
    searchBox = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;

    searchContainer.insertAdjacentHTML('afterbegin', searchBox);

    /**
    *Fetch the data for the employees and pass it to the functions
    *
    */

   fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => {
            displaySearchContainer(true)
            generateEmployee(data.results)
            selectedModal(data.results)
            companyEmployees.push(...data.results)
        })
        .catch(error => {
            //change the header text and disply the error 
            headerContainer.innerHTML = `There was an error. Error message: ${error}`;
            //hide the search container if the there is an error
            displaySearchContainer(false);
        })

    /**
    *Function to determine if there is an error. If an error is received, catch the error message
    *
    */

    function checkStatus(response){
      return (response.ok ? Promise.resolve(response) : Promise.reject(new Error(response.statusText)));
    }


    /**
    *Function to generate the gallery list to be displayed on the page with the users photo, name,
    *email, city and state
    * @param data -Data fetched from api
    */

    function generateEmployee(data){
     data.map(person => {
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

    /**
    * Used to display the employee data in the pop-up modal
    * @param employee - employee data passed from the selectedModal function
    */

    function displayModal(employee){
        //Index number of the employee
        let employeeIndex = companyEmployees.indexOf(employee);

        //create the modal pop-up container
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
                <p class="modal-text">${formatPhone(employee.cell)}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city} ${employee.location.state} ${employee.location.postcode} </p>
                <p class="modal-text"> Birthday: ${formatDate(employee.dob.date)}</p>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`
        )

        //Variable for the close button
        const closeButton = document.getElementById('modal-close-btn');

        //Variable for the modal container
        const modal = document.querySelector('.modal-container');

        const previousButton = document.getElementById('modal-prev');
        const nextbutton = document.getElementById('modal-next');

        //If the employee indext is 0, hide the previous button from the modal view
        if(employeeIndex === 0){
            previousButton.style.display = 'none';
        }
        //If the employee index is 11, hide the next button from the modal view
        if(employeeIndex === 11){
            nextbutton.style.display = 'none';
        }

        document.getElementById('modal-next').addEventListener('click',() => {
            employeeIndex = employeeIndex + 1;
            modal.remove();
            displayModal(companyEmployees[employeeIndex]);
        })

        document.getElementById('modal-prev').addEventListener('click',() => {
                employeeIndex = employeeIndex - 1;
                modal.remove();
                displayModal(companyEmployees[employeeIndex]);
        })

        closeButton.addEventListener('click', () => {
            modal.remove()
        });
    }

    /**
    * Pass the data from the api in order to get the selected employee and pass the data
    * to by displayed to the displayModel function
    * @param data -Results of the data fetched from the api
    */

    function selectedModal(data){
        const employeeSelected = [...card];

        //For the employee selected by the user, pass their data to the displayModal function to be displayed
        for (let i = 0; i < data.length; i++) {
            employeeSelected[i].addEventListener('click',() => {
                //Get data for the employee selected
                let employee = data[i];
                displayModal(employee);
            })
        }
    }

    /**
    * Format the employee birthday to DD/MM/YYYY
    * @param (string) date - employee's phone number to format
    * @return The employee's formatted phone number
    */

    function formatDate(birthDate){
        //split out date and time
        const removeTime = birthDate.split('T');

        //split the date, month and year
        const splitDate = removeTime[0].split('-');

        //return the birthdate in the DD/MM/YYYY format
        return splitDate[1] + '/' + splitDate[2] + '/'+ splitDate[0];
    }

    /**
    * Format the employee's phone number to (XXX) XXX-XXXX
    * @param (string) phone - employee's phone number to format
    * @return The employee's formatted phone number
    */

    function formatPhone(phone){
        //Used as a reference: https://stackoverflow.com/questions/19442821/remove-and-and-white-spaces-from-phone-number-in-javascript
        //Used to remove all characters in order to have only the 10 digits of the number
        const removeCharacters = phone.replace(/[^+\d]+/g, '');

        //Used as a reference: https://stackoverflow.com/questions/6981487/insert-hyphens-in-javascript/6981793
        //Format the phone number to (XXX) XXX-XXXX
        const formattedPhone = removeCharacters.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

        //return formatted Phone number to be used in displayModal()
        return formattedPhone;
    }

    /**
    *Function for when a user searches for en employee that compares the searched 
    * named to the employees on the page then passes the employee(s) matched to the
    * displaySearchResults function
    * @param employeeName - Employee name being searched for
    * @param companyEmployees - Employees list stored from the api
    */

    function searchForEmployee(employeeName, companyEmployees){
        const searchResults = [];
        companyEmployees.forEach(employee => {
            const employeeNameLowercase = `${employee.name.first} ${employee.name.last}`.toLowerCase();
            employeeNameLowercase.includes(employeeName) && employeeName !== null ? searchResults.push(employee) : null
        });
        displaySearchResults(searchResults);
    }

    /**
    * Determine if the search results matched the employees. 
    * If no match is received, display a message
    * If a match is received display, the employee(s) matching
    * Otherwise, display all the employees received from the api with 
    * the correct header
    * @param searchResults - list of employees matching the search results
    */

    function displaySearchResults(searchResults){
        if(searchResults.length === 0){
            headerContainer.innerHTML = `<h1> No employees found with that name</h1>`;
            galleryList.innerHTML = '';

        } else if(searchResults.length > 0){
            headerContainer.innerHTML = `<h1>AWESOME STARTUP EMPLOYEE DIRECTORY<h1>`;
            galleryList.innerHTML = '';
            generateEmployee(searchResults);
            selectedModal(searchResults);
        }
        else{
            headerContainer.innerHTML = `<h1>AWESOME STARTUP EMPLOYEE DIRECTORY<h1>`;
            generateEmployee(companyEmployees);
            selectedModal(searchResults);
        }
    }

    /**
    *Fuction that determines whether the search container should display
    *The search container shouldn't display if there is an error
    */

    function displaySearchContainer(displaySearch){
        if(!displaySearch){
            searchContainer.style.display = 'none';
        } else{
            searchContainer.style.display = 'active';
        }
    }

    /**
    *Event listener on the search submit button to search for the employee name
    *entered
    */
    document.querySelector('#search-submit').addEventListener('click',() => {
        const employeeName = document.querySelector('#search-input').value.toLowerCase();
        searchForEmployee(employeeName, companyEmployees);
    })
    /**
    *Event listener on the search submit button to search for the employee name
    *while the user is typing the name into the search input box
    */
    document.querySelector('#search-input').addEventListener('keyup',() => {
        const employeeName = document.querySelector('#search-input').value.toLowerCase();
        searchForEmployee(employeeName, companyEmployees);
    })

