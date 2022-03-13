window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    

    fetchPost(urlParams);
    deletePostEvent(urlParams);
    /**
     * Fetch here the specific pun that is about to be updated.
     * Prefill the textarea with the fetched pun content
     * 
     * 1. Begin with retrieving the punId from the queryString, check out window.location.search (google or console.log()) 
     * 2. Use the built-in JS Object 'URLSearchParams' to extract the queryString  => let urlParams = new URLSearchParams(window.location.search)
     * 3. Use urlParams to retrieve the punId like so => urlParams.get('id'); 
     * 4. Now you can fetch the specific pun by making a "GET" request to: https://puns-app.herokuapp.com/puns/<punId>, where <punId> is the value of urlParams.get('id')
     * 5. Use the fetched pun data to prefill the textarea#content
     */


    /**
     * Add here an eventlistener to update the pun, when the form is submitted
     * 
     * 1. Begin with selecting the form, and add an eventlistener on the form, that gets triggered with the 'submit'-event
     * 2. Make sure to use preventDefault(), to prevent the form from reloading the page
     * 3. Update the specific pun by making a "PATCH" request to: https://puns-app.herokuapp.com/puns/<punId>, where <punId> is the value of urlParams.get('id')
     * 4. Make sure the formdata is sent in to the body parameter, when making the request. See how its done with the create pun request in create-pun.js
     * 5. If the form was successfully submitted, then redirect to the index.html with the following code: window.location.replace('index.html');
     */
}



async function fetchPost(urlParams) {
    try {
        const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`)
        const post = await response.json();
        
        document.getElementById('title').value = post.title;
        document.getElementById('author').value = post.author;
        document.getElementById('content-textarea').innerText = post.content;
        
    } catch(error) {
        console.log(error)
    }
}

function deletePostEvent(urlParams) {
    const form = document.getElementById('delete-post-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(e.target) // e.target is the form, in this case
        console.log(formData);
        const JSONString = {
            title: formData.get('title'),
            author: formData.get('author'),
            content: formData.get('content'),
            tags: formData.get('tags')

        };
        console.log(JSON.stringify(JSONString));

        try {
            const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`, {
                method: 'DELETE', // GET/POST/PATCH/DELETE
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSONString),
            })

            if (!response.ok) {
                throw new Error('Something went wrong with the API')
            }

            window.location.replace('index.html') // redirects to index.html
        } catch(error) {
            console.log(error);
        }
    })
}


// let serializeForm = function (form) {
//     var obj = {};
//     var formData = new FormData(form);
//     // console.log(formData.getAll());

//     for (var key of formData.keys()) {
//         let inputData = formData.getAll(key);

//         if (inputData.length > 1) {
//             obj[key] = inputData;
//         } else {
//             obj[key] = inputData[0];    
//         }
//     }
    
//     // console.log(obj);
//     return obj;
// };