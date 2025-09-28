const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');
const closeBtn = document.querySelector('#closeBtn');
const popupEl = document.querySelector('#popup');
const btns = document.getElementsByTagName('button');


// Get and show posts 
async function  showPosts() {
    try{
        const res = await fetch(`http://localhost:8000/api/posts/`);
        if(!res.ok) throw new Error('Failed to fetch posts');
    
        const posts = await res.json();
        output.innerHTML = '';
        popupEl.classList.remove('hidden');
    
        posts.forEach(post => {
            const postEl = document.createElement('p');
            postEl.textContent = post.title;
            output.appendChild(postEl);
        });
    } catch(err) {
        console.error('Error fetching posts: ', err);
    }
}

// Submit a new Post
async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title })
        });

        if(!res.ok) throw new Error('Failed to add a post');

        const newPost = await res.json();

        const postEl = document.createElement('div');
        postEl.textContent = newPost.title;
        output.appendChild(postEl);

        showPosts();
    } catch (err) {
        console.error('Error adding post: ', err)
    } 
};


// Event listeners
button.addEventListener('click', showPosts);
form.addEventListener('submit', addPost);

closeBtn.addEventListener("click", ()=> popupEl.classList.add("hidden"))
btns.addEventListener("click", ()=> popupEl.classList.remove("hidden"))