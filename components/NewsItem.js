class NewsItem extends HTMLElement {
    set news(value) {
        this.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${value.title}</h5>
                    <p class="card-text">${value.content}</p>
                    <vote-tracker post-id="${value.id}"></vote-tracker>
                </div>
            </div>
        `;
    }
}
