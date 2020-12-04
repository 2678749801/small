import { POP, NEW, SELL } from "./const";
import BackTop from 'components/common/backtop/BackTop..vue'
export const backTopMixin = {
    components: {
        BackTop
    },
    data: function() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick: function() {
            this.$refs.scroll.scroll.scrollTo(0, 0, 300);
        },
        demo(position) {
            this.isShowBackTop = -(position.y) > 1000
        }
    }
}

export const tabControlMixin = {
    data: function() {
        return {
            currentType: POP
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = POP
                    break
                case 1:
                    this.currentType = NEW
                    break
                case 2:
                    this.currentType = SELL
                    break
            }
            console.log(this.currentType);
        }
    }
}