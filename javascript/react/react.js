class Cell {

    constructor() {
        this.id = Cell.uid++;
        this.children = [];
    }
    
    addChild(cell) {
        if (cell && typeof cell.update === 'function')
            this.children.push(cell);
    }
    
    // Return this cell's descendants sorted in a topological order
    // (ie such that dependencies appear after all their inputs)
    get lineage() {
        
        // Cells to sort
        const todo = [this];
        
        // Map between cells and the set of their inputs that are still unsorted
        // Invariant: all nodes in the todo list have an entry in the input map
        const inputMap = new Map([[this, new Set()]]);

        const result = [];
        while (todo.length) {
            // Cycle through the cells until we find one with no unsorted input
            const next = todo.shift();
            if (inputMap.get(next).size) {
                todo.push(next);
                continue;
            }

            // console.log('Found one.');

            // This cell's inputs have already been sorted, so append
            // it to the result.
            result.push(next);

            
            for (let c of next.children) {
                // The child cell has not been encountered yet
                if (!inputMap.has(c)) {
                    inputMap.set(c, new Set(c.inputs));
                    todo.push(c);
                }

                // Update the input map 
                inputMap.get(c).delete(next);
            }
            // console.log('Remaining: ' + todo.length);
        }

        return result;
    }
}
Cell.uid = 0;

export class InputCell extends Cell {

    constructor(value) {
        super();
        this.value = value;
    }

    setValue(value) {
        if (value === this.value) return;
        this.value = value;
        const [, ...updateSequence] = this.lineage;
        updateSequence.forEach(c => c.update());
    }
}

export class ComputeCell extends Cell {

    constructor(inputs, formula) {
        super();
        this.callbacks = new Map();
        this.inputs = inputs;
        this.formula = formula;
        this.value = formula(inputs);
        inputs.forEach(c => c.addChild(this));
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
