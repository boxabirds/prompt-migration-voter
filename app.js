// Instantiate the worker
const worker = new Worker('components/service-worker.js');


function addNewsItem(postData, id) {
    const newsItem = document.createElement('news-item');
    newsItem.setAttribute('post-id', id);
    // Assuming that NewsItem components can receive an object with post details
    newsItem.news = postData;
    document.getElementById('newsStream').appendChild(newsItem);
    console.log("added news item id "+ id);
}


// Function to generate a unique ID for a new post
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

document.querySelector('submission-form').addEventListener('submit', (e) => {
    const id = generateId();
    // Assuming the submission event includes detail with the post data
    const postData = e.detail;
    addNewsItem(postData, id);
    worker.postMessage({ type: 'newPost', id, postData });
});

// Event listener for vote changes
document.querySelectorAll('vote-tracker').forEach((tracker) => {
    tracker.addEventListener('votechange', ({ detail }) => {
        const { id, hasVoted } = detail;
        const type = hasVoted ? 'upvote' : 'downvote';
        worker.postMessage({ type, id });
    });
});

// Event listener for vote count updates
worker.onmessage = function(event) {
    const { id, votes } = event.data;
    console.log("id = " + id)
    const tracker = document.querySelector(`vote-tracker[post-id="${id}"]`);

    tracker.dispatchEvent(new CustomEvent('updatevotes', { detail: { votes } }));
};
