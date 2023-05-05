'use strict';

class DaySum {
    constructor(oldDaySum){
        this.items = oldDaySum.items || {};
    }
    add(bankbook){
        let id = bankbook.id;
        let DaySumItem = this.items[id];
        if (!DaySumItem){
            this.items[id] = {bankbook };
            DaySumItem = this.items[id];
        }
        return DaySumItem;
    }

}
module.exports = DaySum;