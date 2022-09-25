export default class StateLoader {
    constructor(key, initialState) {
        this.key = key, 
        this.initialState = initialState
    }
    loadState() {
        try {
            let serializedState = localStorage.getItem(this.key);

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            throw new Error(err); 
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem(this.key, serializedState);
        }
        catch (err) {
            throw new Error(err); 
        }
    }
    initializeState(){
        try {
            let serializedState = JSON.stringify(this.initialState);
            localStorage.setItem(this.key, serializedState);
            return this.initialState; 
        }
        catch (err) {
            throw new Error(err); 
        }
    }

}
