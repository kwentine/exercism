class EventDispatcher {

    constructor() {
        this._listeners = [];
        this._callbacks = new Map();
    }

    addCallback(callBack) {
        this._callbacks.set(callBack, () => callBack.update(this));
    }

    removeCallback(cb) {
        this._callbacks.delete(cb);
    }
    
    addListener(cell) {
        if (cell && typeof cell.update === 'function')
            this._listeners.push(cell);    
    }
    
}

export class InputCell extends EventDispatcher {

    constructor(value) {
        super();
        this.oldValue = undefined;
        this.value = value;
    }

    setValue(value) {
        if (value === this.value) return;
        this.value = value;
        const toUpdate = this._getCellsToUpdate();
        toUpdate.forEach(c => c.update());
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

export class ComputeCell extends EventDispatcher {

    constructor(inputs, formula) {
        super();
        this.id = ComputeCell.ID++;
        this.inputs = inputs;
        this.formula = formula;
        this.value = formula(inputs);
        inputs.forEach(c => c.addListener(this));
    }
    
    update() {
        const newValue = this.formula(this.inputs);
        if (newValue === this.value) return;
        this.value = newValue;
        for (let cb of this._callbacks.values()) {
            cb();
        }
    }
}
ComputeCell.ID = 0;

export class CallbackCell {

    constructor(cb) {
        this.cb = cb;
        this.values = [];
    }

    update(cell) {
        this.values.push(this.cb(cell));
    }
}
