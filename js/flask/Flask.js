export class Flask {
    id = -1;
    content = [];
    cellRepository = null;

    constructor(id, cellRepository) {
        this.id = id;
        this.cellRepository = cellRepository;
    }

    getId() {
        return this.id;
    }

    getFreeValue() {
        return 4 - this.content.length;
    }

    getTopColor() {
        return (this.content.length) ? this.content[this.content.length - 1].getColor() : '';
    }

    addCell(cell) {
        this.content.push(cell);
    }

    extractCell() {
        return this.content.pop();
    }

    fulfill() {
        if (this.content.length) {
            throw new Error('Not empty flask!');
        }

        for (let i = 0; i < 4; i++) {
            this.content.push(this.cellRepository.create());
        }
    }

    toHtml() {
        let content = '';

        this.content.forEach(function(item) {
            content += item.toHtml();
        });

        return `<div class="flask" data-id="${this.getId()}" draggable="true">${content}</div>`;
    }
}