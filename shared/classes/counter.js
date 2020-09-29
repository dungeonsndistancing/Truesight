class Counter{
    constructor(name,max) {
        this.name = name
        this.max = max
        this.current = max
    }

    decrease() {
        if(this.current > 0)
            this.current -= 1
    }

    increase() {
        if(this.current < this.max)
        this.current +=1
    }
    
    reset() {
        this.current = this.max
    }

    static from(json) {
        return Object.assign(new Counter(), json)
    }

}

module.exports = Counter