import React, { useContext, useEffect, useState } from 'react'
import { ScrollContext } from '../contexts/ScrollContext';
import classNames from '../../styles/FirstPage.module.scss'
import Gallery from './Gallery';


let stringToParse = "By choosing 4 NFTs that you like the most. Click on the ones you liked and we'll show you people who have similar taste.";
stringToParse = stringToParse.split(" ");

const arrayToText = (arrOfWords, startIndex, endIndex) => {
	startIndex = Math.floor(startIndex);
	endIndex = Math.ceil(endIndex);
	let textFromArray = arrOfWords.slice(startIndex, endIndex);
	textFromArray = textFromArray.join(" ");

	return textFromArray;
}

const FirstPage = () => {
	let { animation_value, percentageScrolled, pageHeight, pageWidth } = useContext(ScrollContext);
	const [animationValues, setAnimationValues] = useState({
		subtitleText: '',
		subtitleSize: 15,
		titleSize: 10,
		spacerHeight: pageHeight / 4,
		containerPos: 'fixed',
		containerTop: 0,
	});

	useEffect(() => {
		console.log("Animation", animation_value);
	}, [animation_value]);

	useEffect(() => {
		console.log("percentagescrolled", percentageScrolled);
	}, [percentageScrolled]);

	useEffect(() => {
		console.log("pageheight", pageHeight);
	}, [pageHeight]);

	useEffect(() => {
		console.log("pagewidth", pageWidth);
	}, [pageWidth]);


	useEffect(() => {
		let newSubtitleText = animation_value(0, 0.5, percentageScrolled, 1, stringToParse.length);
		newSubtitleText = arrayToText(stringToParse, 0, newSubtitleText);
		let minSubtitleSize = 0; // If text gets big takes 85px as value and converts it to vw
		if (0.06 * pageWidth > 85) {
			minSubtitleSize = 85 * 100 / pageWidth;
		} else if (0.06 * pageWidth < 40)
			minSubtitleSize = 40 * 100 / pageWidth;
		else
			minSubtitleSize = 6;
		const newSubtitleSize = animation_value(0, 0.5, percentageScrolled, 15, minSubtitleSize);
		const newTitleSize = animation_value(0, 0.5, percentageScrolled, 10, 5);
		const newSpacerHeight = animation_value(0, 0.5, percentageScrolled, pageHeight / 4, 50);
		let newContainerTop = 0;
		let newContainerPos = 'fixed';
		if (percentageScrolled > 0.5) {
			newContainerPos = 'relative';
			newContainerTop = 25;
		}
		setAnimationValues({
			titleSize: newTitleSize,
			subtitleText: newSubtitleText,
			subtitleSize: newSubtitleSize,
			spacerHeight: newSpacerHeight,
			containerPos: newContainerPos,
			containerTop: newContainerTop,
		});
	}, [percentageScrolled, pageHeight, animation_value, pageWidth]);


	return (
		<div className={classNames.firstPageContainer} style={{ 
			"position": animationValues.containerPos,
			"top": `${animationValues.containerTop}%`, 
		}}>
			<div className={classNames.titleSpacer} style={{ "height": `${animationValues.spacerHeight}px` }}></div>
			<div className={classNames.titleContainer}>
				<h1 className={classNames.mainTitle} style={{
					"fontSize": `${animationValues.titleSize}vw`,
				}}>Make friends</h1>
				<p className={classNames.mainSubtitle} style={{ "fontSize": `${animationValues.subtitleSize}vw` }}>
					{animationValues.subtitleText}
				</p>
			</div>
			<Gallery />
		</div>
	)
}

export default FirstPage