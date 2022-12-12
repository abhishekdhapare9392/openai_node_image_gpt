function onSubmit(e) { 
    e.preventDefault();
    
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';


    const prompt = document.querySelector("#prompt").value
    const size = document.querySelector("#size").value

    if (prompt === '')
    { 
        let div = document.createElement("div");
        div.className = 'alert alert-danger';
        div.innerText = "Please add some text."
        document.querySelector("#alertMessage").append(div);

        setTimeout(() => {
            let divs = document.querySelectorAll(".alert")
            divs.forEach(div => {
                div.remove();
            });
        }, 5000);
    }

    generateImageRequst(prompt, size);

}

async function generateImageRequst(prompt, size) { 
    // console.log('coming here')
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        })

        if (!response.ok)
        { 
            removeSpinner();
            throw new Error('That image could not be generated');
        }

        const data = await response.json();
        // console.log(data);

        const imageUrl = data.data;

        document.querySelector("#image").src = imageUrl;

        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }

}


function showSpinner() { 
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() { 
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);