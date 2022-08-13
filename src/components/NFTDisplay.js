import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollContext } from '../contexts/ScrollContext';
import classNames from '../../styles/NFTDisplay.module.scss';
import Image from 'next/image';
import { MouseMoveContext } from '../contexts/MouseMoveContext';



const NFTDisplay = ({ parentUrl, topPos, leftPos, classN }) => {
	let { animation_value, percentageScrolled, pageHeight, pageWidth } = useContext(ScrollContext);
	const { mouseInfo } = useContext(MouseMoveContext);
	const [animationValues, setAnimationValues] = useState({
		bgGradientLeft: `hsla(0, 73%, 39%, 1)`,
		bgGradientRight: `hsla(0, 73%, 39%, 1)`,
	});
	const [displayElement, setdisplayElement] = useState("none");


	useEffect(() => {
		const newBgGradientLeft = animation_value(0, 1, percentageScrolled, -150, 300);
		const newBgGradientRight = animation_value(0, 1, percentageScrolled, 50, 1000);

		setAnimationValues(prevValues => {
			prevValues.bgGradientLeft = `hsla(${newBgGradientLeft}, 73%, 39%, 1)`;
			prevValues.bgGradientRight = `hsla(${newBgGradientRight}, 73%, 39%, 1)`;
			return prevValues;
		});
	}, [percentageScrolled, animation_value]);

	useEffect(() => {
		if (mouseInfo.target === 'NFTimage') setdisplayElement("inline-block");
		else setdisplayElement("none");
	}, [mouseInfo]);



	return (
		<div className={`${classNames.NFTContainer} ${classN}`} style={{
			'width': `${pageWidth/5}px`, 
			'height': `${pageWidth/5}px`,
			'top': `${topPos}%`,
			'left': `${leftPos}%`,
		}}>
			<div id='NFTimage' className={`${classNames.imageBg} ${classNames.curved}`} style={{
				"backgroundImage": `linear-gradient(${animationValues.bgGradientRight}, ${animationValues.bgGradientLeft})`,
			}}>
				<div id='NFTimage' className={classNames.imageBgAbove}></div>
				<Image
					id='NFTimage'
					className={`${classNames.curved} ${classNames.NFTimage}`}
					src={parentUrl}
					alt="Picture of the author"
					width={pageWidth/5 - 10}
					height={pageWidth/5 - 10}
					layout="responsive"
				/>
			</div>
		</div>
	)
}

export default NFTDisplay