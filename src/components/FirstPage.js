import React, { useContext, useEffect, useState } from 'react'
import { ScrollContext } from '../contexts/ScrollContext';
import classNames from '../../styles/FirstPage.module.scss'


let stringToParse = "Somthing I want to tell themm later despiute all the effrots to make it different than what we usually see in all our different sections.";
stringToParse = stringToParse.split(" ");
// console.log(stringToParse);

const arrayToText = (arrOfWords, startIndex, endIndex) => {
	startIndex = Math.floor(startIndex);
	endIndex = Math.ceil(endIndex);
	let textFromArray = arrOfWords.slice(startIndex, endIndex);
	textFromArray = textFromArray.join(" ");
	
	return textFromArray;
}

const FirstPage = () => {
	// console.log("Rendering Background component", stringToParse);
	let { animation_value, percentageScrolled } = useContext(ScrollContext);
	const [animationValues, setAnimationValues] = useState({
		backgroundTextTop: 0,
		text: ''
	});

	

	useEffect(() => {
		// console.log(scrollPos);
		const newTextPos = animation_value(0, 1, percentageScrolled, 0, 100);
		let newText = animation_value(0, 1, percentageScrolled, 1, stringToParse.length);
		newText = arrayToText(stringToParse, 0, newText);
		setAnimationValues({
			backgroundTextTop: newTextPos,
			text: newText
		});
	}, [percentageScrolled]);

	// style={{ top: `${animationValues.backgroundTextTop}%` }}
	return (
		<div className={classNames.backgroundText}>
			<p>
				{animationValues.text}
			</p>
		</div>
	)
}

export default FirstPage