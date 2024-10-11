const form = document.querySelector("form");
const rightSection = document.getElementById("right-section");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const clearAllBtn = document.getElementById("clear-btn");
const displayDiv = document.querySelector(".display-data");


form.addEventListener("submit", (e)=>{
    // get input values by name attribute
    const name = e.target.uname.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    
    // set object for user details
    const userObject = {
        name : name,
        email : email,
        phone : phone
    };
    
    
    // initialize blank array to hols user objects
    let userData = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : [];
    
    let isDuplicate = false;
    for(let item of userData){
        if(item.email == email || item.phone == phone){
            isDuplicate = true;
            break;   //exit loop once found duplicate
        }
    }
    
    if(isDuplicate){
        
        alert("Duplicate email/phone");
    }else{
        userData.push(userObject); 
        // set userdata in local storage
        localStorage.setItem("userDetails", JSON.stringify(userData));
        form.reset();   //empty form
        displayData();  //display user on submit
    }
    
    e.preventDefault();
})


let displayData = ()=>{
    rightSection.innerHTML = '';
    let userData = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : [];
    if(userData.length >0){
        userData.forEach((element,i) => {
            rightSection.innerHTML += `
            <div class="display-data">
            <span onclick = removeData(${i})> ❎</span>      
            <p>${element.name}</p>
            <h3>email </h3>
            <p>${element.email}</p>
                <h3>Phone No</h3>
                <p>${element.phone}</p>
                </div>
                ` 
            });
    }       
    } 
    
    
    //  remove a user
    let removeData =(index)=>{
        let userData = localStorage.getItem("userDetails")
        ? JSON.parse(localStorage.getItem("userDetails"))
        : [];
        userData.splice(index, 1); //cut only selected data
        // reset local storage with rest data
        localStorage.setItem("userDetails", JSON.stringify(userData));
        displayData();   // update display with rest data
    }
    
    
    // clear all data on signle click
    clearAllBtn.addEventListener("click",()=>{
        rightSection.innerHTML = '';
        // reset local storage
        localStorage.removeItem("userDetails");
    })
    
    displayData(); //display user on page refresh