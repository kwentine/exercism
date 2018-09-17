class Cell {

    constructor() {
        this.id = Cell.ID++;
        this.children = [];
    }
    
    addChild(cell) {
        if (cell && typeof cell.update === 'function')
            this.children.push(cell);
    }
    
    get descendants() {
        // Return the Set of this cell's descendants
        const todo = [this];
        const descendants = new Set();
        while (todo.length) {
            let next = todo.shift();
            for (let c of next.children) {
                descendants.add(c);
                if (todo.indexOf(c) === -1)
                    todo.push(c);
            }
        }
        return descendants;
    }

    sortedDescendants() {
        const incomingEdges = new Map([this, new Set()]);
        const todo = [this];
        const result = [];
        while (todo.length) {
            const next = todo.shift();
            if (!incomingEdges.get(next).size) {
                todo.push(next);
                continue;
            }
            result.push(next);
            for (let c of next.children) {
                let incoming = incomingEdges.get(c) || new Set(c.inputs);
                incoming.delete(this);
                if (!incomingEdges.has(c))
                    incomingEdges[c] = incoming;
                todo.push(c);
            }
        }
        return result;
    }

    toString() {
        return `${this.constructor.name}:${this.id}`;
    }

    static compare(c1, c2) {
        // Compare function to use for sorting by increasing topological order:
        // a parent always appears before all of its descendants
        if (c1 === c2) return 0;
        if (c1.descendants.has(c2)) return -1;
        if (c2.descendants.has(c1)) return 1;
        return 0;
    }
}
Cell.ID = 0;

export class InputCell extends Cell {

    constructor(value) {
        super();
        this.value = value;
    }

    setValue(value) {
        if (value === this.value) return;
        this.value = value;
<<<<<<< HEAD
        const toUpdate = this._getCellsToUpdate();
        toUpdate.forEach(c => c.update());
=======
        const updateOrder = [...this.descendants].sort(Cell.compare);
        updateOrder.forEach(c => c.update());
>>>>>>> 21fbb885677c3b8f2241b48215c607550bc62065
    }

    _getCellsToUpdate() {
        // Return an array of this cell's descendants, ordered such
        // that a cell allways appears before all its children.
        const todo = [this];
        const toUpdate = new Set();
        while (todo.length) {
            let next = todo.shift();
            for (let c of next._listeners) {
                toUpdate.add(c);
                if (todo.indexOf(c) === -1)
                    todo.push(c);
            }
        }
        
        // Cell identifiers are increasing, a new cell can only depend
        // on previously existing ones. So sorting cells by id
        // guarantees that if they update in this order, each will
        // update exaclty once from up-to-date inputs.
        return [...toUpdate].sort((a, b) => a.id - b.id);
    }
}

export class ComputeCell extends Cell {

    constructor(inputs, formula) {
        super();
        this.callbacks = new Map();
        this.inputs = inputs;
        this.formula = formula;
        this.value = formula(inputs);
<<<<<<< HEAD
        inputs.forEach(c => c.addListener(this));
=======
        // Listen to changes to input cells
        inputs.forEach(c => c.addChild(this));
>>>>>>> 21fbb885677c3b8f2241b48215c607550bc62065
    }
    
    update() {
        const newValue = this.formula(this.inputs);
        if (newValue === this.value) return;
        this.value = newValue;
        for (let cb of this.callbacks.values()) {
            cb();
        }
    }

    addCallback(callBack) {
        this.callbacks.set(callBack, () => callBack.update(this));
    }

    removeCallback(cb) {
        this.callbacks.delete(cb);
    }
}

export class CallbackCell {

    constructor(cb) {
        this.cb = cb;
        this.values = [];
    }

    update(cell) {
        this.values.push(this.cb(cell));
    }
}
