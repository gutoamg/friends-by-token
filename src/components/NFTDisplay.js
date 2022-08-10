import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollContext } from '../contexts/ScrollContext';
// import { MouseMoveContext } from '../contexts/MouseMoveContext';
import classNames from '../../styles/NFTDisplay.module.scss';
import Image from 'next/image';



const NFTDisplay = () => {
	let { animation_value, percentageScrolled } = useContext(ScrollContext);
	// let { mousePos } = useContext(MouseMoveContext);
	const [animationValues, setAnimationValues] = useState({
		cardNumber: 0
	});
	const [nftUrl, setNftUrl] = useState("");

	const imageURLs = [
		"https://ipfs.pixura.io/ipfs/QmU3Boe8JP6dFHhtgwNsHxcY2Wyo5nQUY4y9vGCnZaaD3t/the-last.jpg",
		"https://ipfs.pixura.io/ipfs/QmRZm3nbnXbwuxFmwBDnkxT5xqFQXTfqjbi6U252PhiZjW/the-physical-impossibility-of-eth-in-the-mind-of-someone-bidding.jpg",
		"https://ipfs.pixura.io/ipfs/QmNht7BAHBbjVY6JTi686BMACpWdPHPHcaPfAFY3nqSvwc/blue-muse-2022.jpg",
		"https://ipfs.pixura.io/ipfs/QmRacym94aEknZFbzaD2xkC4tYXb1B9UPHphoAhSEvHJ8s/eisen-d707xy.jpg",
		"https://ipfs.pixura.io/ipfs/QmU3Boe8JP6dFHhtgwNsHxcY2Wyo5nQUY4y9vGCnZaaD3t/the-last.jpg",
		"https://ipfs.pixura.io/ipfs/QmaQsMRUNu9BLfj7RtmNKVss6mgkq5gS9Eaet5GzQegmeP/time-to-reflect-ii.jpg",
		"https://ipfs.pixura.io/ipfs/QmZ5n9HKbvn2CNwUa6ZJ6GxWyGoTn8XXq2NtvZCYeEZquK/wise-old-tree.jpg",
		"https://ipfs.pixura.io/ipfs/QmZ4VHdp9NKrVCsTb1kCE3aesEX3oMYeWGkQJJ6FNMWCug/land-of-dreams-the-assembly-.jpg",
		"https://ipfs.pixura.io/ipfs/QmbzKthNqvfzgQnCsnMRrA8f2UnsVF1aFw64G9N9HdcJFf/unsolved-puzzle.jpg",
		"https://ipfs.pixura.io/ipfs/QmZNFr2njmpiC6gfh2tsd1QhGs1EREC4KCUUTVdCjdaiQ4/trials.png",
		"https://ipfs.pixura.io/ipfs/QmYzTnCRJRELDC7aUnBD1yxv8EZnhtmAzVBVNy91Fgcn8s/time-does-not-change-all.jpg",
		"https://ipfs.pixura.io/ipfs/QmRKvp3GYhPZnjTpAEwm5Py8VdtS19bd2RcTxHwddCgyfc/the-korova-the-third-wave.jpg"
	];
	// useEffect(() => {
	// 	console.log("NFT display");
	// 	const fetchedImages = [];
	// 	const preloadImages = () => {
	// 		for (let image = 0; image < imageURLs.length; image++) {// ------- CHANGE TO 147 images -------
	// 			fetchedImages[image] = new Image();
	// 			fetchedImages[image].src = imageURLs[image];
	// 		}
	// 	};
	// 	preloadImages();
	// }, []);

	useEffect(() => {
		// console.log(scrollPos);
		let newCardNumber = animation_value(0, 1, percentageScrolled, 0, 11);
		if (newCardNumber >= 10.5) newCardNumber = 11;
		else newCardNumber = Math.floor(newCardNumber);
		setAnimationValues(prevValues => {
			prevValues.cardNumber = newCardNumber;
			return prevValues;
		});
		setNftUrl(imageURLs[newCardNumber]);
	}, [percentageScrolled]);


	return (
		<div className={classNames.NFTContainer}>
			<Image
				src={nftUrl}
				alt="Picture of the author"
				width={300}
				height={300}
			/>
		</div>
	)
}

export default NFTDisplay