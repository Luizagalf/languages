import Wordcard from "../Wordcard/index";
import LoadedComponent from "../LoadedComponent/index";
import styles from "./wordcards.module.scss";
import React, { useEffect, useState } from "react";
import { setWordsAction } from "../../stores/actions";
import { connect } from "react-redux";

const Wordcards = (props) => {
    useEffect(() => {
        props.setWordsAction();
        window.scrollTo(0, window.offsetTop);
    }, []);

    const words = props.allWordsData;
    const isLoading = props.isLoading;
    const error = props.error;
    const change = true;

    const nameList = [];
    const [allWords, setAllWords] = useState(false);
    const [isSelected, toggleSelected] = useState(false);
    const [tag, setTag] = useState(false);

    for (let i = 0; i < words.length; i++) {
        if (
            !nameList.includes(words[i].tags) &&
            !words[i].tags === false &&
            words[i].tags !== undefined &&
            words[i].tags !== null &&
            words[i].tags !== "Array" &&
            words[i].tags !== "test"
        ) {
            nameList.push(words[i].tags);
        }
    }
    nameList.sort();

    const selectedTag = (e) => {
        setTag(e);
        setAllWords(true);
        toggleSelected(true);
    };

    return (
        <LoadedComponent isLoading={isLoading} error={error}>
            <div className={styles.rowtags}>
                <div
                    className={styles.tag}
                    onClick={() => {
                        setAllWords(false);
                    }}
                >
                    Allwords
                </div>
                {nameList.map((tag) => (
                    <p
                        className={styles.tag}
                        key={tag}
                        onClick={() => {
                            selectedTag(tag);
                        }}
                    >
                        {tag}
                    </p>
                ))}
            </div>

            {allWords ? (
                <>
                    {isSelected && (
                        <div className={styles.row}>
                            {words
                                .filter((word) => word.tags === tag)
                                .map((filteredWord) => (
                                    <div
                                        className={styles.col}
                                        key={filteredWord.id}
                                    >
                                        <Wordcard
                                            change={change}
                                            english={filteredWord.english}
                                            url={filteredWord.url}
                                            transcription={
                                                filteredWord.transcription
                                            }
                                            russian={filteredWord.russian}
                                            tags={filteredWord.tags}
                                        ></Wordcard>
                                    </div>
                                ))}
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.row}>
                    {words &&
                        words.map((word) => (
                            <div className={styles.col} key={word.id}>
                                <Wordcard
                                    change={change}
                                    english={word.english}
                                    url={word.url}
                                    transcription={word.transcription}
                                    russian={word.russian}
                                    tags={word.tags}
                                ></Wordcard>
                            </div>
                        ))}
                </div>
            )}
        </LoadedComponent>
    );
};

const mapStateToProps = (state) => {
    return {
        allWordsData: state.words,
        isLoading: state.isLoading,
        error: state.error,
    };
};

const mapDispatchToprops = {
    setWordsAction,
};

export default connect(mapStateToProps, mapDispatchToprops)(Wordcards);
