import React, { useContext, useEffect, useState } from 'react'
import { ScrollContext } from '../contexts/ScrollContext';
import classNames from '../../styles/FirstPage.module.scss'


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
		spacerHeight: pageHeight/4
	});



	useEffect(() => {
		let newSubtitleText = animation_value(0, 1, percentageScrolled, 1, stringToParse.length);
		newSubtitleText = arrayToText(stringToParse, 0, newSubtitleText);
		const minSubtitleSize = (0.06 * pageWidth > 85) ? (85 * 100 / pageWidth) : 6 // If text gets big takes 85px as value and converts it to vw
		const newSubtitleSize = animation_value(0, 1, percentageScrolled, 15, minSubtitleSize);
		// const newTitleMarginTop = animation_value(0, 1, percentageScrolled, 40, 16);
		const newTitleSize = animation_value(0, 1, percentageScrolled, 10, 5);
		// const newTitleLetterSp = animation_value(0, 1, percentageScrolled, -5, -2);
		const newSpacerHeight = animation_value(0, 1, percentageScrolled, pageHeight/4, pageHeight/6);
		setAnimationValues({
			// titleMarginTop: newTitleMarginTop,
			titleSize: newTitleSize,
			// titleLetterSp: newTitleLetterSp,
			subtitleText: newSubtitleText,
			subtitleSize: newSubtitleSize,
			spacerHeight: newSpacerHeight,
		});
	}, [percentageScrolled, pageHeight]);


	return (
		<div className={classNames.firstPageContainer}>
			<div className={classNames.titleSpacer} style={{"height": `${animationValues.spacerHeight}px`}}></div>
			<div className={classNames.titleContainer}>
				<h1 className={classNames.mainTitle} style={{
					// "marginTop": `${animationValues.titleMarginTop}%`,
					"fontSize": `${animationValues.titleSize}vw`,
					// "letterSpacing": `${animationValues.titleLetterSp}px`
				}}>Make friends</h1>
				<p className={classNames.mainSubtitle} style={{ "fontSize": `${animationValues.subtitleSize}vw` }}>
					{animationValues.subtitleText}
				</p>
			</div>
			<div className={classNames.gallery}>

			</div>
		</div>
	)
}

export default FirstPage