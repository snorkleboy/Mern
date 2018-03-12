import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/table.css';
import prettify from '../../util/prettify'


String.prototype.precTrim = function (num) {
    const ind = this.indexOf('.')
    if (ind !== -1) {
        return this.slice(0, ind + num + 1);
    }
    return this
}


export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    //makes headers as top row
    //makes entry[header] for all other rows by iterating through entries and pulling out data by header
    tableMaker(headers = this.props.data.headers || [], entry = this.props.data.entries || []) {
        const columns = columnizer(headers, entry);
        return (
            <section className='table'>
                {
                    columns.map((item,i)=>{
                        return (
                        <article id={i+i} className='item'>
                                <span id={item.header + i.toString()}>{item.header}</span>
                                <span id={item.entry + i.toString()}>{item.entry}</span>
                        </article>
                        )
                    })
                }
            </section>
        );
    }
    render() {
        return (
            <main>
                {this.tableMaker()}
            </main>
        );
    }
}
function item(header, entry) {
    this.header = header;
    this.entry = entry;
}

function columnizer(headers, entry) {
    const columns = [];
    headers.forEach((header) => {
        columns.push(new item(header, prettify(entry[header])))
    })
    return columns;
}

