import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollContext } from '../contexts/ScrollContext';
import { MouseMoveContext } from '../contexts/MouseMoveContext';
import classNames from '../../styles/Background.module.scss'


const Background = () => {
	// console.log("Rendering Background component", stringToParse);
	const mouseFollowerRef = useRef(null);
	let { animation_value, percentageScrolled } = useContext(ScrollContext);
	let { mouseInfo } = useContext(MouseMoveContext);
	const [animationValues, setAnimationValues] = useState({
		leftBallColor: `hsl(0, 73%, 39%)`,
		rightBallColor: `hsl(150, 73%, 39%)`,
		bgGradientLeft: `hsl(-150, 73%, 39%)`,
		bgGradientRight: `hsl(50, 73%, 39%)`,
		visCursorWidth: `200px`,
		visCursorHeight: `200px`,
		bgGradientPosLeft: 0,
		bgGradientPosTop: 0,
	});



	useEffect(() => {
		// Previous values
		const prevVisWidth = animationValues.visCursorWidth;
		const prevVisHeight = animationValues.visCursorHeight;
		const prevBgGdPosLeft = animationValues.bgGradientPosLeft;
		const prevBgGdPosTop = animationValues.bgGradientPosTop;
		// New values
		const newLeftBallColor = animation_value(0, 1, percentageScrolled, 0, 309);
		const newRightBallColor = animation_value(0, 1, percentageScrolled, 150, 360);
		const newBgGradientLeft = animation_value(0, 1, percentageScrolled, -150, 300);
		const newBgGradientRight = animation_value(0, 1, percentageScrolled, 50, 1000);
		setAnimationValues({
			leftBallColor: `hsla(${newLeftBallColor}, 73%, 39%, 1)`,
			rightBallColor: `hsla(${newRightBallColor}, 73%, 39%, 0.8)`,
			bgGradientLeft: `hsla(${newBgGradientLeft}, 73%, 39%, 1)`,
			bgGradientRight: `hsla(${newBgGradientRight}, 73%, 39%, 1)`,
			bgGradientPosLeft: prevBgGdPosLeft,
			bgGradientPosTop: prevBgGdPosTop,
			visCursorWidth: prevVisWidth,
			visCursorHeight: prevVisHeight,
		});
	}, [percentageScrolled]);

	useEffect(() => {
		// Prev values
		const newLeftBallColor = animationValues.leftBallColor;
		const newRightBallColor = animationValues.rightBallColor;
		const newBgGradientLeft = animationValues.bgGradientLeft;
		const newBgGradientRight = animationValues.bgGradientRight;
		// New values
		const newLeftPos = (mouseInfo.mouseX);
		const newTopPos = (mouseInfo.mouseY);
		let newVisCursorW = 0;
		let newVisCursorH = 0;
		if (mouseInfo.target === 'NFTimage') {
			newVisCursorW = 0;
			newVisCursorH = 0;
		} else {
			newVisCursorW = 100;
			newVisCursorH = 100;
		}
		setAnimationValues({
			leftBallColor: newLeftBallColor,
			rightBallColor: newRightBallColor,
			bgGradientLeft: newBgGradientLeft,
			bgGradientRight: newBgGradientRight,
			bgGradientPosLeft: `${newLeftPos}px`,
			bgGradientPosTop: `${newTopPos}px`,
			visCursorWidth: `${newVisCursorW}px`,
			visCursorHeight: `${newVisCursorH}px`,
		});
	}, [mouseInfo]);


	return (
		<div className={classNames.backgroundContainer}>
			<div className={classNames.blurredLayer}></div>
			<div
				className={classNames.leftBall}
				style={{
					"backgroundColor": animationValues.leftBallColor,
				}}
			></div>
			<div
				className={classNames.rightBall}
				style={{
					"backgroundColor": animationValues.rightBallColor
				}}
			></div>
			<div
				className={classNames.bgGradient}
				style={{
					"backgroundImage": `linear-gradient(${animationValues.bgGradientLeft}, ${animationValues.bgGradientRight})`,
				}}
			></div>
			<div
				ref={mouseFollowerRef}
				className={classNames.cursorFollower}
				style={{
					"backgroundImage": `linear-gradient(${animationValues.bgGradientRight}, ${animationValues.bgGradientLeft})`,
					"left": animationValues.bgGradientPosLeft,
					"top": animationValues.bgGradientPosTop,
				}}
			></div>
			<div className={classNames.visibleCursorFollower}
				style={{
					"backgroundImage": `radial-gradient(${animationValues.bgGradientRight}, ${animationValues.bgGradientLeft})`,
					"left": animationValues.bgGradientPosLeft,
					"top": animationValues.bgGradientPosTop,
					"width": animationValues.visCursorWidth,
					"height": animationValues.visCursorHeight,
				}}
			></div>
		</div>
	)
}

export default Background