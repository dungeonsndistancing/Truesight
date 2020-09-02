class Counter{
    constructor(name,max) {
        this.name = name
        this.max = max
        this.current = max
    }

    decrease() {
        this.current -= 1
    }
    
    reset() {
        this.current = this.max
    }

}

module.exports = Counter