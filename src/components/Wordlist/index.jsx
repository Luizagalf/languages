import styles from "./wordlist.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

import jsonWords from '../../jsonWords';
import Wordlistitem from '../Wordlistitem/index';
import Wordlistnewitem from '../Wordlistnewitem/index';

const Wordlist = ({ removeWord, addWord, editWord, words }) => {
    return (
        <div className={styles.list}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td colspan="3" className={styles.title}>Word list</td>
                    </tr>
                    <tr>
                        <th>English</th>
                        <th>Russian</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    words.map((word) =>
                        <Wordlistitem removeWord={removeWord} editWord={editWord} key={word.id} id={word.id} english={word.english} russian={word.russian}></Wordlistitem>
                    )
                }
                <Wordlistnewitem addWord={addWord} />
            </table>
        </div>
    );
}

export default Wordlist;