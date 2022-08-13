import React, { useRef, useState, useEffect, useContext } from 'react'
import classNames from '../../styles/SearchBar.module.scss'
import { UserContext } from '../contexts/UserContext';


const SearchBar = () => {
    const textInput = useRef(null);
    const [sectionClass, setSectionClass] = useState('');
    const [inputValue, setInputValue] = useState('');
	let { userInfo, setUserInfo } = useContext(UserContext);


    const update_input_value = (event) => {
        setInputValue(event.target.value);
    }
    
    // If enter is pressed and there is an input,
    // the input value is searched
    const search_input_value = (event) => {
        if (event.keyCode === 13 && event.target.value === '') {
            setInputValue("");
            textInput.current.value = "";
            return;
        }

        if (event.keyCode === 13) { // Enter pressed
            const prevLinks = userInfo.imagesClicked;
            setUserInfo({ 
                email: `${textInput.current.value}`,
                emailSubmitted: 'true',
                imagesClicked: prevLinks,
            });
            textInput.current.blur();
            login();
        }
    }

    // Clears input field or search what's already there
    const input_clicked = (event) => {
        if (event.target.id === "searchBar__search") {
            if (textInput.current.value === "") return;
            const prevLinks = userInfo.imagesClicked;
            setUserInfo({ 
                email: `${textInput.current.value}`,
                emailSubmitted: 'true',
                imagesClicked: prevLinks,
            });
            login();
        } else if (event.target.id === "searchBar__clear") {
            textInput.current.focus();
            textInput.current.value = "";
            setInputValue("");
        } else {
            // setSearchBarBackgdColor('rgba(255, 255, 255, 0.4)');
        }
    }

    const login = () => {
        setSectionClass(classNames.loggedMenu);
    }


    return (
        <section className={`${classNames.menu}`}>
            <div className={`${classNames.menu__container} ${sectionClass}`}>
                <a href="#0" className={classNames.menu__logo}>
                    Friends-by
                    <span className={`${classNames.menu__logo_span}`}>_T0ken</span>
                </a>
                <div className={classNames.searchBar} onClick={input_clicked}>
                    <label className={classNames.searchBar__label} htmlFor="search-input">Your fake email</label>
                    <input
                        ref={textInput}
                        onChange={update_input_value}
                        onKeyUp={search_input_value}
                        type="email"
                        name="Search image"
                        placeholder="Type your fake email"
                        spellCheck="true"
                        id="search-input"
                        className={classNames.searchBar__input}
                        results="3"
                        required
                    />
                    <button id="searchBar__search" className={classNames.searchBar__search} type="submit"></button>
                    <button id="searchBar__clear" className={classNames.searchBar__clear} type="submit"></button>
                </div>
            </div>
        </section>
    )
}

export default SearchBar