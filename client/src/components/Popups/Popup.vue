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

<style scoped>
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
    padding-top:30px;
    position:absolute;
    top:calc(50% - 90px);
    left:calc(50% - 150px);
    width:300px;
    height:150px;
    background-color:white;
    font-size:10pt;
}
.long{
    height:300px;
    top:calc(50% - 165px);
}
</style>