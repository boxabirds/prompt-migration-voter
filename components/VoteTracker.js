class VoteTracker extends HTMLElement {
    constructor() {
        super();
        this._hasVoted = false;
        this._voteCount = 0; // Initialize with 0, will be updated from the worker
    }

    connectedCallback() {
        // Ensure postId is retrieved from an attribute to allow dynamic assignment
        this.postId = this.getAttribute('post-id');
        // Generate unique IDs for the component and its internal elements
        this.id = `vote-tracker-${this.postId}`; // Unique ID for the vote tracker component itself
        const voteBtnId = `vote-btn-${this.postId}`; // Unique ID for the vote button
        const voteCountId = `vote-count-${this.postId}`; // Unique ID for the vote count span

        this.innerHTML = `
            <button id="${voteBtnId}" class="btn btn-success">Vote</button>
            <span id="${voteCountId}">(${this._voteCount})</span>
        `;
        this.addEventListener('updatevotes', (e) => {
            this.updateVoteCount(e.detail.votes);
        });


        this.querySelector(`#${voteBtnId}`).addEventListener('click', () => this.toggleVote());
    }

    render() {
        this.innerHTML = `
            <button id="${buttonId}" class="btn btn-success">Vote</button>
            <span id="voteCount">(${this._voteCount})</span>
        `;
    }

    updateVoteCount(newCount) {
        // Update the vote count and UI based on the new count
        this._voteCount = newCount;
        this.querySelector('#voteCount').textContent = `(${this._voteCount})`;
    }

    toggleVote() {
        // Toggle the hasVoted state
        this._hasVoted = !this._hasVoted;

        // Dispatch custom event to inform about the vote change
        const voteChangeEvent = new CustomEvent('votechange', {
            bubbles: true, // Allow the event to bubble up through the DOM
            detail: { id: this.postId, hasVoted: this._hasVoted }
        });
        this.dispatchEvent(voteChangeEvent);

        // The actual vote count update will be handled in response to the 'updatevotes' event from the worker
    }

    updateUI() {
        // Update the button text and vote count display based on the current state
        const voteBtn = this.querySelector('#voteBtn');
        voteBtn.textContent = this._hasVoted ? '✅ Voted' : 'Vote';
        this.querySelector('#voteCount').textContent = `(${this._voteCount})`;
    }
}

window.customElements.define('vote-tracker', VoteTracker);
