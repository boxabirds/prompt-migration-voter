// service-worker.js

// Initialize a map to hold the vote counts for each post ID
let votes = new Map();

self.onmessage = function(event) {
    const { type, id } = event.data;

    switch(type) {
        case 'newPost':
            // Initialize vote count for a new post with a random number between 10 and 50
            const initialVotes = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            votes.set(id, initialVotes);
            // Post the initial vote count back to the main thread
            self.postMessage({ type: 'votesChanged', id, votes: initialVotes });
            break;
        case 'upvote':
            // Increment vote count for the specified post ID
            updateVoteCount(id, 1);
            break;
        case 'downvote':
            // Decrement vote count for the specified post ID
            updateVoteCount(id, -1);
            break;
    }
};

function updateVoteCount(id, change) {
    // Retrieve the current vote count, apply the change, then store the new count
    let currentVotes = votes.get(id) || 0;
    currentVotes += change;
    votes.set(id, currentVotes);
    // Post the updated vote count back to the main thread
    self.postMessage({ type: 'votesChanged', id, votes: currentVotes });
}
