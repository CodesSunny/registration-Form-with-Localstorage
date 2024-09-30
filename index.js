
let form = document.querySelector("form");
const rightSection = document.getElementById("right-section");

form.addEventListener("submit", (e)=>{
    // get input values   
    let name = e.target.uname.value;
    let email = e.target.email.value;
    let phone = e.target.phone.value;
    let isDuplicate = 0; // keep track of duplicate status
    
    // if local storage has data parse it into array otherwise when empty initialize blank array
    let userData = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails")) 
     : [];
     
     
     //  define object sturcture to hols user data 
     let userObject =  {
         'name': name,
         'email': email,
         'phone': phone
        };
    
        // chech duplicate email/phone
        for(let item of userData){
            if(userObject.email == email || userObject.phone == phone){
                isDuplicate =1;
                break;  // stop loop once found duplicate email/phone
            }   
        }

        if(isDuplicate == 1){
            alert("duplicate email/phone")
        }else{
            // loop array and set input values in array items for new items only
            userData.push(userObject); 
        }
        
        // set localstorage structure
        localStorage.setItem("userDetails",JSON.stringify(userData));
        form.reset();  // empty form after data sent to local storage
        displayData();  // without page refresh display data for items sent to local storage 
        
        e.preventDefault();
    })

    function displayData(){
        let userData = JSON.parse(localStorage.getItem("userDetails"));
        userData.forEach((element,i) => {
            
         // set html of dsiplay data
        rightSection.innerHTML += `
                                    <div class="display-data">
                                    <span onclick= removeItem(${i})> ❎</span>
                                    <h3>Name </h3>
                                    <p>${element.name}</p>
                                    <h3>email </h3>
                                    <p>${element.email}</p>
                                    <h3>Phone No</h3>
                                    <p>${element.phone}</p>
                                    </div>
                                    `           
        });
        
    }

    let removeItem = (index)=>{
        let userData = JSON.parse(localStorage.getItem("userDetails")); // first get all items array
        userData.splice(index,1); //delete clicked item only
        console.log(userData);
        localStorage.setItem("userDetails",JSON.stringify(userData)); //update storage with rest data
        displayData(); //display rest data
    }
    
    displayData();  // this will display data on page refresh only

//  delete a data : delete indexed element from localstorage and update localstorage with remaining data


