// const form = document.getElementById('registrationForm');


// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData.entries())
    
//     try{
// const response = await fetch('/register', {
//                 method: 'POST',
//             headers:{
//                 'Content-Type' : 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         const result = await response.json();
//         console.log(result);
//     } catch (error){
//         console.log(error);
//     }
// })
