/*
 * express-dumper
 * Copyright(c) 2020 Tatwerat ( Abdo Hamoud )
 * MIT Licensed
 */

'use strict'

const dumper = {
    forEach: function (collection, callback, scope) {
        let list = '';
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (var prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (var i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    },
    dump_array: function (array) {
        let list = '';
        let index_1 = 0;
        this.forEach(array, (value, key) => {
            if ((value instanceof Object || value instanceof Array) && value instanceof Date == false) {
                index_1++;
                list += `<li><input type="checkbox" hidden id="node-dumber-tree-${key}-${index_1}"> <label for="node-dumber-tree-${key}-${index_1}">${key}</label>`;
                list += `<ul>`;
                let index_2 = 0;
                this.forEach(value, (child_value, child_key) => {
                    index_2++;
                    if ((child_value instanceof Object || child_value instanceof Array) && child_value instanceof Date == false) {
                        list += `<li><input type="checkbox" hidden id="node-dumber-tree-${child_key}-${index_2}"> <label for="node-dumber-tree-${child_key}-${index_2}">${child_key}</label>`;
                        list += `<ul>`;
                        this.forEach(child_value, (sub_child_value, sub_child_key) => {
                            if ((sub_child_value instanceof Object || sub_child_value instanceof Array) && sub_child_value instanceof Date == false) {
                                list += this.dump_array(sub_child_value);
                            } else {
                                list += `<li><span style="color:#00B7FF;">${sub_child_key} => </span> <span style="color:#ff572f;">${sub_child_value}</span></li>`;
                            }
                        });
                        list += `</ul></li>`;
                    } else {
                        list += `<li><span>${child_key} => </span> <span style="color:#ff572f;">${child_value}</span></li>`;
                    }
                });
                list += `</ul></li>`;
            } else {
                list += `<li><span style="color:#00B7FF;">${key} => </span> <span style="color:#ff572f;">${value}</span></li>`;
            }
        });
        return list;
    },
    dump: function (array) {
        let style = '<style>\n' +
            '       ul.node-dumber {\n' +
            '       background: #fafafa;\n' +
            '       border: 1px solid #ddd;\n' +
            '       list-style-type: none;\n' +
            '       padding: 20px;\n' +
            '       margin: 0px 0px 15px 0px;\n' +
            '       text-indent: 10px;\n' +
            '       border-radius: 5px;\n' +
            '       overflow: auto;\n' +
            '       max-height: 600px;' +
            '        }\n' +
            '        ul.node-dumber ul{\n' +
            '            display:none;\n' +
            '            list-style-type:none;\n' +
            '        }\n' +
            '\n' +
            '        ul.node-dumber li{/*lets us position the label\'s ::before*/\n' +
            '            position:relative;\n' +
            '        }\n' +
            '\n' +
            '        ul.node-dumber label{\n' +
            '            cursor:pointer;\n' +
            '        }\n' +
            '        ul.node-dumber label:hover{\n' +
            '            box-shadow: 0 0 5px 0 rgba(128,155,200,0.5) inset;\n' +
            '        }\n' +
            '        ul.node-dumber label::before{\n' +
            '            content:"\\25B7";\n' +
            '            position:absolute;\n' +
            '            left:-1em;\n' +
            '            top:-2px;\n' +
            '        }\n' +
            '        ul.node-dumber input:checked + label::before{\n' +
            '            content:"\\25E2";\n' +
            '        }\n' +
            '\n' +
            '        ul.node-dumber input:checked + label + ul{\n' +
            '            display:block;\n' +
            '            padding-left: 30px;\n' +
            '        }\n' +
            '       </style>';
        return style + `<ul class="node-dumber">` + this.dump_array(array) + '</ul>';
    }
}

module.exports = dumper;
