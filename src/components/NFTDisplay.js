import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollContext } from '../contexts/ScrollContext';
import classNames from '../../styles/NFTDisplay.module.scss';
import Image from 'next/image';
import { MouseMoveContext } from '../contexts/MouseMoveContext';
import { UserContext } from '../contexts/UserContext';



const NFTDisplay = ({ parentUrl, topPos, leftPos, classN }) => {
	let { animation_value, percentageScrolled, pageWidth } = useContext(ScrollContext);
	let { userInfo, setUserInfo } = useContext(UserContext);
	const { mouseInfo } = useContext(MouseMoveContext);
	const [cardSize, setCardSize] = useState(pageWidth/5);

	const [animationValues, setAnimationValues] = useState({
		bgGradientLeft: `hsla(0, 73%, 39%, 1)`,
		bgGradientRight: `hsla(0, 73%, 39%, 1)`,
	});
	const [displayElement, setdisplayElement] = useState("none");

	const registerOnDatabase = (event) => {
		setCardSize(0);
		if (userInfo.imagesClicked.length === 0) {
			const email = userInfo.email;
			const submission = userInfo.emailSubmitted;
			const allImagesClicked = userInfo.imagesClicked;
			allImagesClicked.push(parentUrl);
			setUserInfo({
				email: email,
				emailSubmitted: submission,
				imagesClicked: allImagesClicked,
			});
		}
		for (let link = 0; link < userInfo.imagesClicked.length; link++) {
			const currentLink = userInfo.imagesClicked[link];
			if (currentLink === parentUrl) break;
			if ((currentLink !== parentUrl) && (link === userInfo.imagesClicked.length - 1)) {
				const email = userInfo.email;
				const submission = userInfo.emailSubmitted;
				const allImagesClicked = userInfo.imagesClicked;
				allImagesClicked.push(parentUrl);
				setUserInfo({
					email: email,
					emailSubmitted: submission,
					imagesClicked: allImagesClicked,
				});
			}
		}
	}


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

	useEffect(() => {
	  setCardSize(pageWidth/5);
	}, [pageWidth])
	


	return (
		<div className={`${classNames.NFTContainer} ${classN}`}
			style={{
				'width': `${cardSize}px`,
				'height': `${cardSize}px`,
				'top': `${topPos}%`,
				'left': `${leftPos}%`,
			}}
			onClick={registerOnDatabase}
			onTouchStart={registerOnDatabase}
		>
			<div id='NFTimage' className={`${classNames.imageBg} ${classNames.curved}`} style={{
				"backgroundImage": `linear-gradient(${animationValues.bgGradientRight}, ${animationValues.bgGradientLeft})`,
			}}>
				<div id='NFTimage' className={classNames.imageBgAbove}></div>
				<Image
					id='NFTimage'
					className={`${classNames.curved} ${classNames.NFTimage}`}
					src={parentUrl}
					alt="Picture of the author"
					width={pageWidth / 5 - 10}
					height={pageWidth / 5 - 10}
					layout="responsive"
				/>
			</div>
		</div>
	)
}

export default NFTDisplay