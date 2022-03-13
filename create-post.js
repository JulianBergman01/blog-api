window.onload = function() {
    const form = document.getElementById('create-post-form');
    form.addEventListener('submit', createPost)
}

async function createPost(e) {
    e.preventDefault();

    // We need to generate the following JSON string
    // {"content":"Never trust an atom, they make up everything!"}

    // Solution 1: Works for very simple forms
    // const JSONString = {
    //     content: document.getElementById('content-textarea').value
    // };

    // Solution 2: Working with form data. (Best practice)
    const formData = new FormData(e.target) // e.target is the form, in this case
    console.log(formData);
    const JSONString = {
        title: formData.get('title'),
        author: formData.get('author'),
        content: formData.get('content'),
        tags: formData.get('tags')
    };


    // Solution 3: Working with a predefined functions that uses form data. (Best Best practice)
    // const JSONString = serializeForm(e.target) // e.target is the form, in this case

    console.log(JSON.stringify(JSONString));

    try {
        const response = await fetch('http://localhost:5000/posts', {
            method: 'POST', // GET/POST/PATCH/DELETE
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
}



let serializeForm = function (form) {
    var obj = {};
    var formData = new FormData(form);
    // console.log(formData.getAll());

    for (var key of formData.keys()) {
        let inputData = formData.getAll(key);

        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];    
        }
    }
    
    // console.log(obj);
    return obj;
};
