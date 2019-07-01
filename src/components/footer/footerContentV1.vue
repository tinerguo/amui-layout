<template>
    <div :class="wrapClasses" :style="wrapStyles">
        <slot></slot>
    </div>
</template>


<script>
    export default {
        name: 'amFooter',
        props:{

        },
        data () {
            return {
            };
        },
        watch:{

        },
        computed: {
            wrapClasses () {
                return [
                    `am-footer-content`
                ];
            },
            wrapStyles(){
                return {
                    "background-image":""
                }
            }
        },
        methods:{

        },
        created(){
        },
        mounted(){
        }
    }
</script>

<style lang="scss">

</style>