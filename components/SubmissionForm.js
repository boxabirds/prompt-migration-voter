// This is taking a "Light DOM" approach without a shadow DOM so that this component can easily access the global bootstrap styles. 
class SubmissionForm extends HTMLElement {
    constructor() {
        super();
        // Attach event listeners and possibly some inner structure directly without Shadow DOM
    }

    connectedCallback() {
        this.innerHTML = `
            <form id="submissionForm" class="mt-3">
                <div class="mb-3">
                    <label for="submissionTitle" class="form-label">Title</label>
                    <input type="text" class="form-control" id="submissionTitle" placeholder="Title">
                </div>
                <div class="mb-3">
                    <label for="submissionContent" class="form-label">Content</label>
                    <textarea class="form-control" id="submissionContent" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit for voting</button>
            </form>
        `;

        this.querySelector('#submissionForm').addEventListener('submit', (e) => this.submitForm(e));
    }

    submitForm(event) {
        event.preventDefault();
        const title = this.querySelector('#submissionTitle').value;
        const content = this.querySelector('#submissionContent').value;
        // Emit custom event with form data
        this.dispatchEvent(new CustomEvent('formsubmit', {
            detail: { title, content },
            bubbles: true
        }));
    }
}

window.customElements.define('submission-form', SubmissionForm);
