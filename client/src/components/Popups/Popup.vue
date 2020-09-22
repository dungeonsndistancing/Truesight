<template>
    <div class='outter' @mousedown.self='close()'>
        <slot class='popup'></slot>
    </div>

</template>

<script>
export default {
    data: function() {
        return {
            money:{
                pp:0,
                gp:0,
                sp:0,
                cp:0
            }
        }
    },
    methods: {
        add() {
            this.$emit('add',this.money)
        },
        cancel() {
            this.$emit('cancel')
        },
        close() {
            this.$emit('close')
        }

    }
}
</script>

<style lang='scss' scoped>
@import '../../scss/variables';
.outter{
    margin:0;
    padding:0;
    z-index:2;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow:hidden;
    background-color: #00000055;
}
.popup{
    border-radius:1em;
    padding-top:10px;
    position:fixed;
    top:calc(50% - 6em);
    left:calc(50% - 10em);
    width:20em;
    height:12em;
    background-color:white;
    font-size:1vw;
}
.short{
    top:calc(50% - 2.5em);
    height:5em;
}
.long{
    height:25em;
    top:calc(50% - 12.5em);
}
.superlong{
    height:40em;
    top:calc(50% - 20em)
}
@media only screen and (max-width:$medium-screen) {
    .short{
        height:7em;
    }
    .popup {
        // top:1em;
        font-size:1.5vw;
    }
    .outter{
        font-size:0.5vw;
    }
}
@media only screen and (max-width:$medium-screen) {
    .short{
        height:7em;
    }
    .popup {
        // top:1em;
        font-size:3vw;
    }
    .outter{
        font-size:1vw;
    }
}
</style>